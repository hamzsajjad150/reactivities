import React, { useEffect } from 'react';
import {  Container  } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  //here we are using the useStore hook insde the store ts file
  //which returns our store context
  //which contains an obj with an activity store inside
  // we are desturcturing that obj (getting activityStore from inside the store obj)
  const {activityStore} = useStore();

  // const [activities, setActivities] = useState<Activity[]>([]);
  // //the workings of usestate
  // //when initalzed it gave you a var that has a state
  // //and a function that can be used to change the value of var
  // //when the function changes the var every comp that uses it get rebuilt
  // // const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);

  // //this is type of a boolean state that can be used in our application to perfrom varioius task
  // // we dont need to specifc the type in this case as it already know it will be boolean
  // // const [editMode, setEditMode] = useState(false);

  // //this is the that will manage if we are submitting data to api
  // const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // //in get we are specificing that we will get an arry of activity in response
    // agent.Activities.list().then(response => {
    //   // this is the solution to extract just the date and not the time from each date of an
    //   // activity
    //   let activities: Activity[] = [];
    //   response.forEach(activity => {
    //     activity.date = activity.date.split('T')[0];
    //     activities.push(activity);
    //   })
    //   setActivities(response);
    //   //we turn the loading off after getting the api response
    //   setLoading(false);
    // })
    activityStore.loadActivities();
    //passing activitystore also as dependance to useEffect
  }, [activityStore])

  

  

  // //this function will be used to handle if the activity needs to be created or updated
  // function handleCreateOrEditActivity(activity: Activity){
  //   setSubmitting(true);
  //   if (activity.id) {
  //     agent.Activities.update(activity).then(()=> {
  //       setActivities([...activities.filter(x => x.id !== activity.id), activity]);
  //       setSelectedActivity(activity);
  //       setEditMode(false);
  //       setSubmitting(false);
  //     })
  //   } else {
  //     //setting the unqiue Id for the activity
  //     activity.id = uuid();
  //     agent.Activities.create(activity).then(() => {
  //       setActivities([...activities, activity]);
  //       setSelectedActivity(activity);
  //       setEditMode(false);
  //       setSubmitting(false);
  //     })
  //   }
  //   // check if the passed activity has a id 
  //   //if ID exist the activity needs to be updated
  //   // if ID does not exist then activity needs to be create
  //   // we are using setActivities to update the activities of the whole list (and the whole app eventually)
  //   // the ... will deconstruce all the activity inside the activities
  //   //but before we deconstruct we use the filter to all deconstrue the activities who id dont match with the passed
  //   // activity and then we andd our passed activity in the end 
  //   //because its an arry with all the indivddual activities like  [a1, a2, a3, youractivity]
  //   // activity.id 
  //   // ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
  //   // //added a new activity and using uuid to gerate an id for the new activitty
  //   // : setActivities([...activities, addingActivity(activity)]);
  //   // //closing the edit mode
  //   // setEditMode(false);
  //   // // then we are showing the details of the activity that as just created or edit
  //   // setSelectedActivity(activity);
  // }

  // //this function deletes an activity in the activities
  // function handleDeleteActivity(id: string){
  //   // to show the loading in the button we set the submitting
    
  //   //send the delete request using our API
  //   agent.Activities.delete(id).then(() => {
  //     setActivities([...activities.filter(x => x.id !== id)]);
  //     setSubmitting(true);
  //   })
      
  // }

  //we return loading if the loading is true
  if (activityStore.loadingInitial) return <LoadingComponent content='Loading app' />

  return (
    // we need to return 1 tag or element because we are not allowed to 
    //retrun multi tag thats why we use fragment
    // this <> also means fragment tag
    <>
      <NavBar />
      <Container style = {{marginTop: '7em'}}>
        {/* this is the way you pass data from one components to another */}
        <ActivityDashboard />
      </Container>
    </>
  );
}

//for your comp to observe the state changes (or the changes) in your obserable (store)
// we need to make then observer
// we use the function observer provided by mobx react lite
// the observer function will return our app comp with some additional power
//that will allow it to observe our store in our app comp
export default observer(App);


