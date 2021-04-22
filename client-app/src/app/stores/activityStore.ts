import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import { format } from 'date-fns';


export default class ActivityStore {
  // creating key value pair
  activityRegistry = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  //constructor for our class
  constructor() {
    // // making this class observable
    // makeObservable(this, {
    //     // making the tile observable
    //     title: observable,
    //     // declaring an action
    //     // setTitle is using the this keyword so we need to bind this property (or action)
    //     //with our class
    //     //we need to using action with .bound to bind it with our class
    //     //when a function is bound to a class we can make sure of the properties of
    //     //that class by using the this keyword
    //     setTitle: action
    // })
    //auto way to create observable
    makeAutoObservable(this);
  }

  //creating computer property
  //this will return activities with there date sort
  get activitiesByDate(){
    //creating a new array from the map and then sorting it with there date
    return Array.from(this.activityRegistry.values()).sort((a, b) => 
                                                a.date!.getTime() - b.date!.getTime());
  }

  //this functions create an obj array of activities will grouping them together 
  // by date
  get groupedActivities() {
    return Object.entries(
      //grouping activities by date
      //we excute the reduce function on each element of the activities
      this.activitiesByDate.reduce((activities, activity) => {
        const date = format(activity.date!, 'dd MMM yyyy');
        //we will get the properties insde the activities that matches that date
        //we are checking if the activity of that date matches
        // explaination:
          //if there are activities on that date we desconstruct all the activities on that date
          //and add a new activity the one on the current iteration 
          //and then set that to the acitivites of that date 
          //else we create a new array of that activity 
        activities[date] = activities[date] ? [...activities[date], activity] : [activity];
        return activities;
        //we also need to pass the reduce function how we need to reduce it
        // in this case its key with array of activiies
      }, {} as {[key: string]: Activity[]})
    )
  }


  //this function sets the activities by fetching it from our api
  loadActivities = async () => {
    this.loadingInitial = true;
    try {
      //getting the activities from our agent
      // anything after await is basaically another change in observable state
      //to make is part of the same state change we can use runInAction function
      const activities = await agent.Activities.list();

      activities.forEach((activity) => {
       this.setActivity(activity);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  //the function will load individual activity 
  // it will find if the activity already is avaliable in the map obj
  // if it is we set the selectedActivity of the whole app
  // else we set the loading initial and get it from our API using the id
  loadingActivity = async (id: string) => {
    //if statement is if the activity exists in the map obj
    let activity = this.getActivity(id);
    if (activity) {
      this.selectedActivity = activity;
      return activity;
    } else {
      this.loadingInitial = true;
      try {
        activity = await agent.Activities.details(id);
        this.setActivity(activity);
        runInAction(() => {
          this.selectedActivity = activity;
        })
        this.setLoadingInitial(false);
        return activity;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  }

  //this is a helper method to add an activity into the activities map obj
  private setActivity = (activity: Activity) => {
     activity.date = new Date(activity.date!);
        // pushing each activities inside the local activities var to our observable activitiets
        // mutating a state here (mutate means changeable in programing)
        // in mobx we can and should mutate our obj
        // this.activities.push(activity);
        this.activityRegistry.set(activity.id, activity);
  }

  //this is a helper function to find if an activity exists
  private getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  }

  //create an action for ladingIntial observer
  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };


  //this functions create the activity
  createActivity = async (activity: Activity) => {
    this.loading = true;
    try {
      await agent.Activities.create(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      })
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      })
    }
  }

  //this function updatees the activity
  updateActivity = async (activity: Activity) =>{
    this.loading = true;
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      })
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      })
    }
  }

  //this is the function to delete an activity
  deleteActivity = async (id: string) => {
    this.loading = true;
    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        this.activityRegistry.delete(id);
        //checking if the activity that is deleted was seleted
        // //?.id is accessing the id of the activity obj means if it has any
        // if(this.selectedActivity?.id === id) this.cancelSelectedActivity();
        this.loading = false;
      })
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      })
    }
  }

  //creating an action
  // the alternative to action.bound is to use the arrow functions () =>
  //using arrow functions will automatically bound the function the the class
  // setTitle = () => {
  //     this.title = this.title + '!';
  // }
}
