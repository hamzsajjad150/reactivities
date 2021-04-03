import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';


interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

export default function ActivityList({activities, selectActivity, deleteActivity, submitting}: Props){
    
    const [target, setTarget] = useState('');

    //this function takes 2 pars one is the event and other is the activity id
    //syntheticEvent is where all the other events extend from
    // this is the function to check one a button is clicked 
    // we check if the button name and the event coming from has the same name
    //hence telling us its the same button that triggered the event
    function handleActivityDelete(eveent: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(eveent.currentTarget.name);
        deleteActivity(id);
    }

    return (
        // using segment of sementic ui to give our activity a pop
        <Segment>
            <Item.Group divided>
                {activities.map(activity =>{
                   return <Item key = {activity.id}>
                        <Item.Content>
                            <Item.Header as ='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectActivity(activity.id)} floated='right' content='view' color='blue'/>
                                <Button 
                                // giving the name property to a button will make sure that
                                // only this button gets the loading indicator
                                name={activity.id}
                                //checking if the target and the button name is the same
                                    loading={submitting && target === activity.id}
                                    onClick={(e) => handleActivityDelete(e, activity.id)}
                                    floated='right'
                                    content='delete'
                                    color='red'/>
                                <Label basic content='Catagory' />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                })}
            </Item.Group>
        </Segment>
    )
}