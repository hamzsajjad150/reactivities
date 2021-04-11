import React from 'react';
import { Message } from 'semantic-ui-react';

interface Props {
    errors: string[] | null,
}

export default function ValidationErrors({errors}: Props){
    return (
        <Message error>
            {/* checking if we have an error list */}
            {errors && (
                <Message.List>
                    {/* looping over the errors and creating a message item for each */}
                    {/* we can also access the index of the arry using I */}
                    {errors.map((err: any, i) => (
                        <Message.Item key={i}>{err}</Message.Item>
                    ))}
                </Message.List>
            )}
        </Message>
    )
}