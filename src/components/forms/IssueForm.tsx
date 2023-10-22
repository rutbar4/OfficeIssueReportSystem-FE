import {Field, Form, Formik} from 'formik';
import TextField from '@mui/material/TextField';
import {Select, Stack} from '@mui/material';

const IssueForm =()=> {

  return (


    <Formik initialValues={{


    }}
            onSubmit={(values, formikHelpers) => {}}>

      {props => (
          <Form>
            <Stack spacing ={2} direction = "column" >
               <Field id = "short summary"
                   name = "short summary"
                   as = {TextField}
                   variant = "outlined">
              </Field>
              <Field id ="description"
                     name ="description"
                     as ={TextField}
                     variant = "outlined"
              ></Field>
              <Field id = "office"
                     name = "office"
                     as ={Select}
              >

              </Field>



            </Stack>
          </Form>

        )}


    </Formik>

)

}

export default IssueForm;
