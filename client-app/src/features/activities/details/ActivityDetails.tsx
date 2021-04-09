import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedSidBar from "./ActivityDetailedSideBar";
import ActivityDetailedHeader from "./ActivityDetialedHeader";


export default observer(function ActivityDetails() {

  const {activityStore} = useStore();

  const {selectedActivity: activity, loadingActivity, loadingInitial} = activityStore;

  //getting the id from the route parameter
  //(simlar to j2ee useAtrribute)
  const {id} = useParams<{id: string}>();

  // using the useEffect hook
  //the dependance of useeffect is the porperties that will be used inside it
  useEffect(() => {
    if (id) loadingActivity(id);
  }, [id, loadingActivity])

  //returing if we have a undefined activity (this is for typescript only)
  //this comp will never run if activity is
  if(loadingInitial || !activity) return <LoadingComponent />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailedHeader activity={activity}/>
        <ActivityDetailedInfo activity={activity}/>
        <ActivityDetailedChat/>
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailedSidBar />
      </Grid.Column>
    </Grid>
  );
})
