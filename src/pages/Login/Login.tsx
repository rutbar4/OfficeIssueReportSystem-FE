import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Alert, Box, Button, Container, createTheme, Divider, LinearProgress, Link, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addUser } from '../../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/userAPI';
import { useState } from 'react';
import { logInUser } from '../../store/slices/authenticationSlice';
import StyledTextField from 'src/components/formFields/StyledTextField';
import { COLORS } from 'src/values/colors.js';
import { EXTERNAL_LINKS } from 'src/values/externalLinks.js';
import Sidebar from 'src/components/sidebar/Sidebar';

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().required(),
  password: Yup.string().required(),
});

const Login = () => {
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = (values, helpers) => {
    login(values)
      .then(({ data, headers }) => {
        dispatch(
          addUser({
            user: data.user,
            jwtToken: data.jwt,
          })
        );
        dispatch(logInUser(true));
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        setShowError(true);
      })
      .finally(() => helpers.setSubmitting(false));
  };

  return (
    <Formik initialValues={{ email: '', password: '' }} onSubmit={onLogin} validationSchema={loginValidationSchema}>
      {(props) => (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <Sidebar />
          <Container maxWidth="xs">
            <Box>
              <Typography variant="h2" color={COLORS.blue}>
                Welcome to <br />
                Devbridge Office Portal
              </Typography>
              {!props.isSubmitting && showError ? (
                <Box sx={{ paddingBottom: '3rem', paddingTop: '3rem' }}>
                  <Alert severity="error">
                    <Typography variant="h6">Login failed, please check your credentials and try again.</Typography>
                  </Alert>
                </Box>
              ) : (
                <Box sx={{ height: '5rem' }} />
              )}
              <Typography variant="h5" style={{ color: COLORS.blue, paddingBottom: '5px' }}>
                Email address
              </Typography>
              <Form>
                <StyledTextField
                  error={props.touched.email && !!props.errors.email}
                  errorMessage="Please input your email address."
                  id="email"
                  name="email"
                  type="text"
                  placeholder="e.g., name@cognizant.com"
                />
                <Typography variant="h5" style={{ color: COLORS.blue, paddingBottom: '5px', paddingTop: '20px' }}>
                  Password
                </Typography>
                <StyledTextField
                  error={props.touched.password && !!props.errors.password}
                  errorMessage="Please input your password."
                  id="password"
                  name="password"
                  type="password"
                  placeholder=""
                />

                <Box style={{ paddingBottom: '10px', paddingTop: '10px' }}>
                  <Link variant="h5" href={''} color={COLORS.blue}>
                    Forgot password?
                  </Link>
                </Box>
                <br />
                <Button
                  fullWidth
                  type="submit"
                  style={{
                    backgroundColor: COLORS.blue,
                    color: '#FFFFFF',
                    height: '40px',
                    borderRadius: '30px',
                    textTransform: 'none',
                    fontSize: '14px',
                  }}
                >
                  Sign In
                </Button>
                <Box marginTop="20px" height="10px">
                  {props.isSubmitting && <LinearProgress />}
                </Box>
              </Form>
            </Box>
            <Container
              maxWidth="xs"
              style={{
                bottom: '0',
                left: '0',
                right: '0',
                position: 'fixed',
                display: 'flex',
                marginBottom: '2rem',
                justifyContent: 'space-between',
                color: COLORS.lighterGray,
              }}
            >
              <Link variant="h6" href={EXTERNAL_LINKS.termsOfService} underline="hover" color={COLORS.lighterGray}>
                Terms of Service
              </Link>
              <Divider orientation="vertical" flexItem />
              <Link variant="h6" href={EXTERNAL_LINKS.support} underline="hover" color={COLORS.lighterGray}>
                Support
              </Link>
              <Divider orientation="vertical" flexItem />
              <Typography variant="h6">© {new Date().getFullYear()} Cognizant</Typography>
            </Container>
          </Container>
        </Box>
      )}
    </Formik>
  );
};

export default Login;
