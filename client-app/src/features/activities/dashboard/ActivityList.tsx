import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react';
import { Header } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityListItem from './ActivityListItem';


export default observer(function ActivityList() {

    //accesing the state
    const { activityStore } = useStore();

    const { groupedActivities } = activityStore;

    return (
        // explainiation
        //we looop over the array that has a map of date : array of activities that matches that date
        //we set a fragment for each date and give that fragment key also the date
        //the header of that fragment is the date
        // we then loop over each array of the dates
        //and then we loop over activity in the activities of the date
        // we then use map to genrate all the comp for each activity of the array
        <>
            {groupedActivities.map(([dateGroup, activities]) => {
               return <Fragment key={dateGroup}>
                    <Header sub color="teal">
                        {dateGroup}
                    </Header>
                    {/* // using segment of sementic ui to give our activity a pop */}
                            {activities.map((activity) => {
                                return (
                                    <ActivityListItem
                                        key={activity.id}
                                        activity={activity}
                                    />
                                );
                            })}
                </Fragment>
            })}
        </>

    )
}
)