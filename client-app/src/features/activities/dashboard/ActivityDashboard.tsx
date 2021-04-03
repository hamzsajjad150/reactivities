import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityDetails from '../../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';
import {v4 as uuid} from 'uuid';


// to accept data coming from the parent componets we need a interface in our componet
interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    // this is how you spefic that a function is getting passed into this comp
    // you need to tell the params and also the return type
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode:boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (Activity: Activity) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

// to accept the props from parent class we need to accpet that type in our function
// we need to specific that data type we can accept
//two ways to do that:
// props : Props (we would need to then use it as props.activities in the comp)
// {activities}: Props (we use it as activities only)
export default function ActivityDashboard({activities, selectedActivity, 
                                        selectActivity, cancelSelectActivity, 
                                        editMode, openForm, closeForm,
                                        createOrEdit, deleteActivity, submitting}: Props){
    return (
        <Grid> 
            <Grid.Column width='10'>
                <ActivityList activities={activities} 
                              selectActivity={selectActivity} 
                              deleteActivity={deleteActivity}
                              submitting={submitting} />
            </Grid.Column>
            <Grid.Column width='6'>
                {/* in the below code we are making sure there is an activity avlabile 
                is like an if statement but also there other condition is actually our comp tag */}
                {selectedActivity && !editMode &&
                <ActivityDetails  activity={selectedActivity} 
                                    cancelSelectActivity={cancelSelectActivity}
                                    openForm={openForm}/>}
                {editMode && 
                <ActivityForm 
                            closeForm={closeForm}
                            activity={selectedActivity}
                            createOrEdit={createOrEdit}
                            submitting={submitting} />}
            </Grid.Column>
        </Grid>
    )
}