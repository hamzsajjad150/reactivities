import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

interface Props{
    //this property can be used to invert the background of the loading screen
    inverted?: boolean;
    //string that we can set below the loading spinner
    content?: string;

}
//setting default values
export default function LoadingComponent({inverted = true, content='loading...'}: Props){
    // returning jsx
    return (
        <Dimmer active={true} inverted={inverted}>
            <Loader content= {content}/>
        </Dimmer>
    )
}