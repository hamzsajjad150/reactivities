import { useField } from 'formik';
import React from 'react';
import { Form, Label } from 'semantic-ui-react';
import DatePicker, {ReactDatePickerProps} from 'react-datepicker';

//Partial makes every property of the prop option
export default function MyDateInput(props: Partial<ReactDatePickerProps>){
    //using usefield to automatically hook up input to formic
    //we are passing text input because it will hook it to the input matching field name
    const [field, meta, helpers] = useField(props.name!);

    //the meta property gives up options like error value changed etc
    // checking if the field has been touched and is there an error
    //!! makes the object bool
    return (
                        //enabling the field to show error message depending if there is an error
                        // errors will be shown in the Label tag
        <Form.Field error={meta.touched && !!meta.error}>
            <DatePicker 
              {...field}
              {...props}
            //   if a property already exist in props and we spread it using  {...}
            //  and then we expliclty mention that property for example below then we are 
            //  overwritting it
            // && that if we have something in the field value tehn were going to specify new dates
            // if there is a field value then we convert it into a date or else we pass null
            selected={(field.value && new Date(field.value)) || null}
            onChange={value => helpers.setValue(value)}
            />
            {/* checking if we have an error */}
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ): null}
        </Form.Field>
    )
}