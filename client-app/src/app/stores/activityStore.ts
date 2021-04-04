import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import {v4 as uuid} from 'uuid';

export default class ActivityStore {
  // creating key value pair
  activityRegistry = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

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
                                                Date.parse(a.date) - Date.parse(b.date));
  }

  //this function sets the activities by fetching it from our api
  loadActivities = async () => {
    try {
      //getting the activities from our agent
      // anything after await is basaically another change in observable state
      //to make is part of the same state change we can use runInAction function
      const activities = await agent.Activities.list();

      activities.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        // pushing each activities inside the local activities var to our observable activitiets
        // mutating a state here (mutate means changeable in programing)
        // in mobx we can and should mutate our obj
        // this.activities.push(activity);
        this.activityRegistry.set(activity.id, activity);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  //create an action for ladingIntial observer
  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  //this function manages the slection of 1 activity
  selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
  };

  //this function cancel the selected activity (sets it back to undefind)
  cancelSelectedActivity = () => {
      this.selectedActivity = undefined;
  }

  // the functions opens the from
  openForm = (id?: string) => {
      id ? this.selectActivity(id) : this.cancelSelectedActivity();
      this.editMode = true;
  }

  //this function close the from
  closeForm = () => {
      this.editMode = false;
  }

  //this functions create the activity
  createActivity = async (activity: Activity) => {
    this.loading = true;
    activity.id = uuid();
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
        //?.id is accessing the id of the activity obj means if it has any
        if(this.selectedActivity?.id === id) this.cancelSelectedActivity();
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
