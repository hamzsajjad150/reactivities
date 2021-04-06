import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';


// to accept the props from parent class we need to accpet that type in our function
// we need to specific that data type we can accept
//two ways to do that:
// props : Props (we would need to then use it as props.activities in the comp)
// {activities}: Props (we use it as activities only)

// making it a observer
export default observer(function ActivityDashboard(){

    //here we are using the useStore hook insde the store ts file
  //which returns our store context
  //which contains an obj with an activity store inside
  // we are desturcturing that obj (getting activityStore from inside the store obj)
  const {activityStore} = useStore();

  const {loadActivities, activityRegistry} = activityStore;

  // deconstructing the properties<Route exact path='/' component={HomePage} /> we need from activitystore
//   const {selectedActivity, editMode} = activityStore;

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
    if(activityRegistry.size <= 1) loadActivities();
    //passing activitystore also as dependance to useEffect
  }, [activityRegistry.size, loadActivities])

  

  

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
        <Grid> 
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                {/* in the below code we are making sure there is an activity avlabile 
                is like an if statement but also there other condition is actually our comp tag */}
                {/* {selectedActivity && !editMode &&
                <ActivityDetails/>}
                {editMode && 
                <ActivityForm  />} */}
                <h2>Activity Filters</h2>
            </Grid.Column>
        </Grid>
    )
})