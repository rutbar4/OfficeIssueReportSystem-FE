import * as React from 'react';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store/store';
import { getSignIn } from 'src/actions/signIn/authentication';

const SignIn = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = () => {
    console.log("Login was pressed");
    dispatch(getSignIn());
    };

  return (
    <Button variant="outlined" onClick={handleLogin}>Login</Button>
  );
};

export default SignIn;