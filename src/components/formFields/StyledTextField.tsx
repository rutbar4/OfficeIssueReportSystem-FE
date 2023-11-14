import { FormControl, FormHelperText, TextField } from '@mui/material';
import { ErrorMessage, Field } from 'formik';

import { COLORS } from 'src/values/colors.js';
const FormTextInput = ({
  error,
  errorMessage = 'Required field!',
  name = 'text',
  type = 'text',
  placeholder = '',
  id = 'text',
}) => (
  <FormControl error={error} fullWidth>
    <Field
      fullWidth
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      style={{
        fontSize: '14px',
        paddingLeft: '15px',
        height: '40px',
        color: COLORS.blue,
        borderRadius: '6px',
        borderColor: COLORS.lighterGray,
        borderWidth: '1px',
        borderStyle: 'solid',
        outlineColor: COLORS.blue,
        outlineWidth: '4px',
      }}
    />
    <ErrorMessage name={name} component={FormHelperText}>
      {(msg) => <div style={{ color: 'red', paddingTop: '1rem' }}>{errorMessage}</div>}
    </ErrorMessage>
  </FormControl>
);
export default FormTextInput;
