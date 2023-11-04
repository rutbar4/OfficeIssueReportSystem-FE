import {useSelector} from 'react-redux';
import {Outlet} from 'react-router-dom';
import {Navigate} from 'react-router';

const SecuredRoute= ({roles}) => {
  const user = useSelector(state => state.user.user);
  const allowAccess = roles ? user?.roles.some(r=>roles.include(r)) : user;

  return allowAccess ? <Outlet/> : <Navigate to="/login"/>
}
