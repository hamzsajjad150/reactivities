import React from 'react';
import { Grid } from 'semantic-ui-react';
import ActivityDetails from '../../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';


// to accept the props from parent class we need to accpet that type in our function
// we need to specific that data type we can accept
//two ways to do that:
// props : Props (we would need to then use it as props.activities in the comp)
// {activities}: Props (we use it as activities only)

// making it a observer
export default observer(function ActivityDashboard(){

    const {activityStore} = useStore();

    // deconstructing the properties we need from activitystore
    const {selectedActivity, editMode} = activityStore;

    return (
        <Grid> 
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                {/* in the below code we are making sure there is an activity avlabile 
                is like an if statement but also there other condition is actually our comp tag */}
                {selectedActivity && !editMode &&
                <ActivityDetails/>}
                {editMode && 
                <ActivityForm  />}
            </Grid.Column>
        </Grid>
    )
})