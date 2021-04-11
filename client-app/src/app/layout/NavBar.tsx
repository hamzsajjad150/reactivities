// all react components need to import react from react in order 
//to return jsx

// react components are just functions that jsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';

export default function NavBar(){

    return (
        <Menu inverted fixed='top'>
            {/* container will give menu items a padding  */}
            <Container>
                {/* using react Route to set NavLink */}
                <Menu.Item as={NavLink}  to='/' exact header>
                    {/* in react we use inline style like passing object in js */}
                    <img src="/assets/logo.png" alt="logo" style= {{marginRight: '10px'}}/>
                    Reactivties
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities' name= 'Activities'/>
                <Menu.Item as={NavLink} to='/errors' name= 'Errors'/>
                <Menu.Item>
                    <Button as={NavLink} to='/createActivity' positive content='Create Activity' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}