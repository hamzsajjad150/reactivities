import { useField } from 'formik';
import React from 'react';
import { Form, Label } from 'semantic-ui-react';

interface Props{
    placeholder: string;
    name: string;
    rows: number;
    label?: string;
}

export default function MyTextArea(props: Props){
    //using usefield to automatically hook up input to formic
    //we are passing text input because it will hook it to the input matching field name
    const [field, meta] = useField(props.name);

    //the meta property gives up options like error value changed etc
    // checking if the field has been touched and is there an error
    //!! makes the object bool
    return (
                        //enabling the field to show error message depending if there is an error
                        // errors will be shown in the Label tag
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            {/* spreading the field and the props in input */}
            <textarea {...field} {...props} />
            {/* checking if we have an error */}
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ): null}
        </Form.Field>
    )
}