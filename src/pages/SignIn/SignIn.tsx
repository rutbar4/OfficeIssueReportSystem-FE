// import * as React from 'react';
// import Button from '@mui/material/Button';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from 'src/store/store';
// import { getSignIn } from 'src/actions/signIn/authentication';
// import { useNavigate} from 'react-router-dom';
// import { useEffect } from 'react';

// const SignIn = () => {
//   const state = useSelector((state : RootState) => state.authentication);

//   const dispatch = useDispatch<AppDispatch>();
//   const navigation = useNavigate();

//   useEffect(() => {
//     if(state.isLoggedIn){
//       navigation(AppRoutes.HOME);
//     }
//   }, [state.isLoggedIn]);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     dispatch(getSignIn());
//   };

//   return (
//     <div>
//       <Button variant="outlined" onClick={(e)=>handleLogin(e)}>Login</Button>
//     </div>
    
//   );
// };

// export default SignIn;