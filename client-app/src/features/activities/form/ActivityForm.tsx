import React, { ChangeEvent, useState } from 'react';
import { Button, Form,  Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props{
    activity: Activity | undefined;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    submitting: boolean;
}

// to change the name of a var and give it a alise we can use :
export default function ActivityForm({activity: selectedActivity, closeForm, createOrEdit, submitting}: Props){

    // setting this var depends on if we have a activity already if not then we set
    // a new activity porperties in this var
    const initisalSate = selectedActivity ?? {
        id: '',
        title: '',
        description: '',
        date: '',
        city: '',
        venue: '',
    }

    // storing the above var into the component state
    const [activity, setActivity] = useState(initisalSate);

    //this function will handle the from submission
    function handleSubmit(){
        createOrEdit(activity);
    }

    //this functions tracks the change in the form input field
    //in the <> we have give it a uninon type to accept textarea and text input from the Form
    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        //this is how you destructute an event obj 
        //the name and the value correspond with the name and the value in the input form
        const {name, value} = event.target;
        //updating our activity state of this form only
        // we are diconstructing the existing properties in the activity obj
        //and then we are replacing the property with the name that matches name inside the [] brackets
        // and then we are setting the value of that property by : and then the value
        setActivity({...activity, [name]: value})
    }

    return (
        // clearing clears any perivous floats inside in our HTML
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange}/>
                <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange}/>
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange}/>
                <Button loading={submitting} floated='right' positive type='submit' content='Submit'/>
                <Button onClick={closeForm} floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
}