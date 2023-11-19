import {FormControl, InputLabel, MenuItem, Select,} from '@mui/material';
import { Field} from 'formik';


const FormSelectComponent = ({name, label, selections, properties, ...props}) => {

    return (
        <FormControl fullWidth>
            <InputLabel>{label}</InputLabel>
            <Field
                id={name}
                name={name}
                as={Select}
                label={name}
                onChange={event => properties.setFieldValue(name, event.target.value)
            }
            >
                {selections.map((sel) =>
                    <MenuItem key={sel.value} value={sel.value}>{sel.value}</MenuItem>
                )}

            </Field>
        </FormControl>
    );
};

export default FormSelectComponent;
