import {Field} from 'formik';

import {COLORS} from '../../values/colors';

const WideDisabledField=({
                         name = 'text',
                         type = 'text',
                         id = 'text',
                     })=>{
    return(
        <Field
            fullWidth
            id={id}
            name={name}
            type={type}
            disabled
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
                width:'935px'
            }}
        />
    );

};

export default WideDisabledField;
