import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";


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
    //   fluid means our card takes the full avilable width
    <Card fluid>
      <Image src='../../../public/assets/placeholder.png' />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>
        {activity.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths='2'>
            <Button as={Link} to={`/manage/${activity.id}`} basic color='blue' content='Edit' />
            <Button as={Link} to='/activities' basic color='grey' content='Cancel' />
        </Button.Group>
      </Card.Content>
    </Card>
  );
})
