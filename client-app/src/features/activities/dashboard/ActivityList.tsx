import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';


export default observer(function ActivityList(){
    
    const [target, setTarget] = useState('');

    //accesing the state
    const {activityStore} = useStore();

    const {deleteActivity, activitiesByDate, loading} = activityStore;

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
                {activitiesByDate.map(activity =>{
                   return <Item key = {activity.id}>
                        <Item.Content>
                            <Item.Header as ='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                {/* react route link is used instead of navlink because navlink adds style */}
                                <Button as={Link} to={`/activities/${activity.id}`} floated='right' content='view' color='blue'/>
                                <Button 
                                // giving the name property to a button will make sure that
                                // only this button gets the loading indicator
                                name={activity.id}
                                //checking if the target and the button name is the same
                                    loading={loading && target === activity.id}
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
)