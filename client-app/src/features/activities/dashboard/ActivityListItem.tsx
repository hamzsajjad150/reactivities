import { format } from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';


//we are using props not oberver because this component will be used in a loop
//and it will render the data it gets in each loop 

interface Props {
    activity: Activity;
}

export default function ActivityListItem({ activity }: Props) {

    // const [target, setTarget] = useState('');

    //accesing the state
    // const { activityStore } = useStore();


    //this function takes 2 pars one is the event and other is the activity id
    //syntheticEvent is where all the other events extend from
    // this is the function to check one a button is clicked 
    // we check if the button name and the event coming from has the same name
    //hence telling us its the same button that triggered the event
    // function handleActivityDelete(eveent: SyntheticEvent<HTMLButtonElement>, id: string) {
    //     setTarget(eveent.currentTarget.name);
    //     deleteActivity(id);
    // }

    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`}>
                                {activity.title}
                            </Item.Header>
                        </Item.Content>
                        <Item.Description>
                            Hosted By Bob
                        </Item.Description>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock'/> {format(activity.date!, 'dd MMM yyyy h:mm aa')}
                    <Icon name='marker'/> {activity.venue}
                </span>
            </Segment>
            <Segment secondary> 
               Attendees go here 
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button as={Link}
                        to={`/activities/${activity.id}`}
                        color='teal'
                        floated='right'
                        content='view'
                 />
            </Segment>
        </Segment.Group>
    )
}