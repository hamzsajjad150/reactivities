import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";


export default function ActivityDetails() {

  const {activityStore} = useStore();

  const {selectedActivity: activity, openForm, cancelSelectedActivity} = activityStore;

  //returing if we have a undefined activity (this is for typescript only)
  //this comp will never run if activity is
  if(!activity) return <div />;

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
            <Button onClick={() => openForm(activity.id)} basic color='blue' content='Edit' />
            <Button onClick={cancelSelectedActivity} basic color='grey' content='Cancel' />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
