import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Button,  Header,  Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Activity } from "../../../app/models/activity";

// to change the name of a var and give it a alise we can use :
export default observer(function ActivityForm() {
  //getting the history obj from the route
  const history = useHistory();

  //accessing the state
  const { activityStore } = useStore();
  const {
    createActivity,
    updateActivity,
    loading,
    loadingActivity,
    loadingInitial,
  } = activityStore;

  const { id } = useParams<{ id: string }>();

  // storing the above var into the component state
  const [activity, setActivity] = useState<Activity>({
    id: "",
    title: "",
    description: "",
    date: null,
    city: "",
    venue: "",
  });

  //creating a validationschema for our form through yup
  //yup.object() takes properties from our obj that we want to run the validation agianst
  const validationSchema = yup.object({
    title: yup.string().required('the activity title is required'),
    description: yup.string().required('the activity description is required'),
    category: yup.string().required(),
    date: yup.string().required('Date is required').nullable(),
    venue: yup.string().required(),
    city: yup.string().required(),
  })

  //if the id exist that means we are editing an acttivity
  //  so we get the activity from our api and then set the setstate of the comp
  // activity
  useEffect(() => {
    if (id) loadingActivity(id).then((activity) => setActivity(activity!));
  }, [id, loadingActivity]);

  //this function will handle the from submission
  //passing our activity as a params
  function handleFormSubmit(activity: Activity) {
    if (activity.id.length === 0) {
      //creating a new activity if the length is 0
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      // after the activity has been create we push it to a new location
      //redirecting the use to a new area using history
      createActivity(newActivity).then(() =>
        history.push(`/activities/${newActivity.id}`)
      );
    } else {
      updateActivity(activity).then(() =>
        history.push(`/activities/${activity.id}`)
      );
    }
  }


  if (loadingInitial)
    return <LoadingComponent content="loading activity...." />;

  return (
    // clearing clears any perivous floats inside in our HTML
    <Segment clearing>
      <Header content='Activity Details' sub color='teal' />
      <Formik 
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={activity}
            onSubmit={values => handleFormSubmit(values)}>
        {/* deconstructing the properties we are interested in getting from fromik */}
        {/* these deconstructed values gets passed down to the form */}
        {/* we get values, handlechange and handlesubmit from f */}
        {/* we are rendering form as child component of formik */}
        {/* using activity as an alias of values */}
        {/* Field automatically wire values and handlechange function to our form */}
        {/* no need to explictly write it */}
        {/* isvalid gives us info if the data that is about to be submitted is valid or not */}
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className='ui form' onSubmit={handleSubmit} autoComplete="off">
            
            <MyTextInput name='title' placeholder='Title' />
            
            <MyTextArea
              placeholder="Description"
              rows={3}
              name="description"
            />
            <MySelectInput
              options={categoryOptions}
              placeholder="Category"
              name="category"
            />
            <MyDateInput
              dateFormat='MMMM d, yyyy h:mm aa'
              timeCaption='time'
              showTimeSelect
              placeholderText="Date"
              name="date"
            />
            <Header content='Location Details' sub color='teal' />
            <MyTextInput
              placeholder="City"
              name="city"
            />
            <MyTextInput
              placeholder="Venue"
              name="venue"
            />
            <Button
              disabled ={isSubmitting || !dirty || !isValid}
              loading={loading}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button as={Link} to='/activities' floated="right" type="button" content="Cancel" />
          </Form>
        )}
      </Formik>


    </Segment>
  );
});
