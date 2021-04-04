// all react components need to import react from react in order 
//to return jsx

// react components are just functions that jsx

import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';

export default function NavBar(){

    const {activityStore} = useStore();

    return (
        <Menu inverted fixed='top'>
            {/* container will give menu items a padding  */}
            <Container>
                <Menu.Item>
                    {/* in react we use inline style like passing object in js */}
                    <img src="/assets/logo.png" alt="logo" style= {{marginRight: '10px'}}/>
                    Reactivties
                </Menu.Item>
                <Menu.Item name= 'Activities'/>
                <Menu.Item>
                    <Button onClick={() => activityStore.openForm()} positive content='Create Activity' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}