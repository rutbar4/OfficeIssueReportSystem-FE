import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import {Alert, Avatar, Box, Button, Checkbox, CircularProgress, Container, createTheme, CssBaseline, FormControlLabel, Grid, Link, Typography} from "@mui/material";
import {ThemeProvider} from '@emotion/react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {useDispatch} from 'react-redux';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {addUser} from '../../store/slices/userSlice';
import {login} from '../../api/userAPI';
import FormTextInput from '../formFields/FormTextinput';
import {logInUser} from '../../store/slices/authenticationSlice';

const loginValidationSchema = Yup.object().shape(
  {
    email: Yup.string().required(),
    password: Yup.string().required()
  }
);

const defaultTheme = createTheme();

const Login = () => {

  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = (values, helpers) => {
    login(values)
      .then(({data, headers}) => {
          dispatch(addUser({
            user: data.user,
            jwt: data.jwt,
          }),);
          dispatch(logInUser(true));
          navigate('/');
        }
      )
      .catch((error) => {
        console.log(error);
        setShowError(true);
      })
      .finally(() => helpers.setSubmitting(false));
  };

  // @ts-ignore
  return (

    <Formik
      initialValues={ {email: '', password: ''} }

      onSubmit={ onLogin }

      validationSchema={ loginValidationSchema }>

      { props => (
        <ThemeProvider theme={ defaultTheme }>
          <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
              sx={ {
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              } }
            >
              <Avatar sx={ {m: 1, bgcolor: 'secondary.main'} }>
                <LockOutlinedIcon/>
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box>
                { showError && <Alert severity="error">Login failed, please check your credentials and try again</Alert> }
                <Form>
                  <FormTextInput error={ props.touched.email && !!props.errors.email }
                                 name="email"
                                 label="email"
                                 fullWidth
                                 margin="normal"/>
                  <FormTextInput error={ props.touched.password && !!props.errors.password }
                                 name="password"
                                 label="password"
                                 fullWidth
                                 margin="normal"
                                 type="password"/>

                  <FormControlLabel
                    control={ <Checkbox value="remember" color="primary"/> }
                    label="Remember me"
                  />
                  {
                    props.isSubmitting ?
                      <Box
                        sx={ {
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          mt: 3,
                          mb: 2
                        } }
                      >
                        <CircularProgress size={ 36 }/>
                      </Box> :
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={ {mt: 3, mb: 2} }>
                        Sign In
                      </Button>
                  }

                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="#" variant="body2">
                        { "Don't have an account? Sign Up" }
                      </Link>
                    </Grid>
                  </Grid>

                </Form>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      )
      }
    </Formik>

  );
};

export default Login;
