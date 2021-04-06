import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";

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
  const [activity, setActivity] = useState({
    id: "",
    title: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  });

  //if the id exist that means we are editing an acttivity
  //  so we get the activity from our api and then set the setstate of the comp
  // activity
  useEffect(() => {
    if (id) loadingActivity(id).then((activity) => setActivity(activity!));
  }, [id, loadingActivity]);

  //this function will handle the from submission
  function handleSubmit() {
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

  //this functions tracks the change in the form input field
  //in the <> we have give it a uninon type to accept textarea and text input from the Form
  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    //this is how you destructute an event obj
    //the name and the value correspond with the name and the value in the input form
    const { name, value } = event.target;
    //updating our activity state of this form only
    // we are diconstructing the existing properties in the activity obj
    //and then we are replacing the property with the name that matches name inside the [] brackets
    // and then we are setting the value of that property by : and then the value
    setActivity({ ...activity, [name]: value });
  }

  if (loadingInitial)
    return <LoadingComponent content="loading activity...." />;

  return (
    // clearing clears any perivous floats inside in our HTML
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          value={activity.title}
          name="title"
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder="Description"
          value={activity.description}
          name="description"
          onChange={handleInputChange}
        />
        <Form.Input
          type="date"
          placeholder="Date"
          value={activity.date}
          name="date"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="City"
          value={activity.city}
          name="city"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Venue"
          value={activity.venue}
          name="venue"
          onChange={handleInputChange}
        />
        <Button
          loading={loading}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button as={Link} to='/activities' floated="right" type="button" content="Cancel" />
      </Form>
    </Segment>
  );
});
