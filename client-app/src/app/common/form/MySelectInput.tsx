import { useField } from 'formik';
import React from 'react';
import { Form, Label, Select } from 'semantic-ui-react';

interface Props{
    placeholder: string;
    name: string;
    options: any;
    label?: string;
}

export default function MySelectInput(props: Props){
    //using usefield to automatically hook up input to formic
    //we are passing text input because it will hook it to the input matching field name
    //for a dropdown we also need helper porperty from usefield
    // helpers: it allows us to manually set a value and manually the touched status of our input component
    // by passing the field name into usefield we are hooking doing a data binding to that input with the same name
    const [field, meta, helpers] = useField(props.name);

    //the meta property gives up options like error value changed etc
    // checking if the field has been touched and is there an error
    //!! makes the object bool
    return (
                        //enabling the field to show error message depending if there is an error
                        // errors will be shown in the Label tag
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            {/* clearable makes the dropdown clearable */}
            {/* options are dropdown options */}
            {/* the value of this select will be form field or null */}
            <Select 
                clearable
                options={props.options}
                value={field.value || null}
                // e is for event and d for data
                // we are manually setting the value of the field 
                // by using the onchange event that gives the event and the data that has the value
                onChange={(e, d) => {helpers.setValue(d.value)}}
                // configring onblur is because we need to know if the field is being touched
                // in onblur we set the field is touched manually
                onBlur={() => helpers.setTouched(true)}
                placeholder={props.placeholder}
            />
            {/* checking if we have an error */}
            {meta.touched && !!meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ): null}
        </Form.Field>
    )
}