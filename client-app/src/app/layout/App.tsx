import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container  } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  //the workings of usestate
  //when initalzed it gave you a var that has a state
  //and a function that can be used to change the value of var
  //when the function changes the var every comp that uses it get rebuilt
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);

  //this is type of a boolean state that can be used in our application to perfrom varioius task
  // we dont need to specifc the type in this case as it already know it will be boolean
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    //in get we are specificing that we will get an arry of activity in response
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
      setActivities(response.data);
    })
  }, [])

  //this function will be called by our other comp 
  // to change the selected activity
  function handleSelectActivity(id: string){
      setSelectedActivity(activities.find(x => x.id === id))
  }

  //this funtion will be called by our other comp to reset the selected activity
  function handleCancelSelectActivity(){
    setSelectedActivity(undefined);
  }

  // this function will open the form in the UI
  //this id? means optional params
  function handleFormOpen(id?: string){
    // passing id in the function will get the correspoding activity of the id to be set in the state
    // not passing will make the state activity null
    //also the corspoding ui functionality will be perfrom as well
    //meaning if ID passed then the activity detail comp is showing
    //if not passed then the detail comp is closed
    id? handleSelectActivity(id) : handleCancelSelectActivity();
    //if the from is opened then we need to change the edit mode to true
    setEditMode(true);
  }

  // this function is used to close the form in the UI
  function handleFormClose(){
    setEditMode(false);
  }

  //this function is called to set the activity id using UUID and then set it in the setactivitis
  function addingActivity(activity: Activity){
    activity.id = uuid();
    return activity;
  }

  //this function will be used to handle if the activity needs to be created or updated
  function handleCreateOrEditActivity(activity: Activity){
    
    // check if the passed activity has a id 
    //if ID exist the activity needs to be updated
    // if ID does not exist then activity needs to be create
    // we are using setActivities to update the activities of the whole list (and the whole app eventually)
    // the ... will deconstruce all the activity inside the activities
    //but before we deconstruct we use the filter to all deconstrue the activities who id dont match with the passed
    // activity and then we andd our passed activity in the end 
    //because its an arry with all the indivddual activities like  [a1, a2, a3, youractivity]
    activity.id 
    ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
    //added a new activity and using uuid to gerate an id for the new activitty
    : setActivities([...activities, addingActivity(activity)]);
    //closing the edit mode
    setEditMode(false);
    // then we are showing the details of the activity that as just created or edit
    setSelectedActivity(activity);
  }

  //this function deletes an activity in the activities
  function handleDeleteActivity(id: string){
      setActivities([...activities.filter(x => x.id !== id)]);
  }

  return (
    // we need to return 1 tag or element because we are not allowed to 
    //retrun multi tag thats why we use fragment
    // this <> also means fragment tag
    <>
      <NavBar openForm={handleFormOpen}/>
      <Container style = {{marginTop: '7em'}}>
        {/* this is the way you pass data from one components to another */}
        <ActivityDashboard 
              activities = {activities}
              selectedActivity={selectedActivity}
              selectActivity={handleSelectActivity}
              cancelSelectActivity={handleCancelSelectActivity}
              editMode={editMode}
              openForm={handleFormOpen}
              closeForm={handleFormClose}
              createOrEdit={handleCreateOrEditActivity}
              deleteActivity={handleDeleteActivity}
              />
      </Container>
    </>
  );
}

export default App;
function uuidv4(): string {
  throw new Error('Function not implemented.');
}

