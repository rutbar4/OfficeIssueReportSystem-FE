import {
    Alert,
    Box, Button,
    CircularProgress,
    Divider,
    FormControl,
    Grid, MenuItem, Select,

    Typography
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import {  useNavigate } from 'react-router';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import {useDispatch, useSelector} from 'react-redux';

import Sidebar from '../sidebar/Sidebar';
import StyledButton from '../StyledButton/StyledButton';
import {RootState} from '../../store/store';
import StyledTextField from '../formFields/StyledTextField';
import DisabledField from '../formFields/DisabledField';
import WideDisabledField from '../formFields/WideDisabledField';
import {COLORS} from '../../values/colors';
import {getUserDetails, updateUser} from '../../api/userAPI';

import { AppRoutes } from 'src/types/routes';
import {  Country } from 'src/models/AddressModel';
import { fetchAllCountries } from 'src/api/CountryApi';
import {addUser, getUserFromLocalStorage} from '../../store/slices/userSlice';

const labelColor = { color: '#6B706D' };

const UserProfile = () => {

  const UserProfileValidationSchema = Yup.object().shape({
    street: Yup.string().max(150, 'Street address must be max 150 symbols!')
    .required('Street address is required!'),
    city: Yup.string().max(50, 'City must be max 50 symbols!')
    .required('City is required!'),
    state: Yup.string().max(150, 'State must be max 150 symbols!')
    .required('State is required!'),
    postcode: Yup.string().max(10, 'Postcode must be max 10 symbols!')
    .required('Postcode is required!'),
    country: Yup.string().max(50, 'Country must be max 50 symbols!')
    .required('Country is required!'),
  });

  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const [countries, setCountries] = useState<Country[]>([]);
  const [countriesLoading, setCountriesLoading] = useState(true);
  const [error, setError] = useState('');

  const user = useSelector((state:RootState) => state.user.user);
  const jwt = useSelector((state:RootState) => state.user.jwt)
  const dispatch = useDispatch();


  useEffect(() => {
    fetchAllCountries()
        .then((countries) => setCountries(countries))
        .catch(({response}) => setError(response.data.reason))
        .finally(()=>setCountriesLoading(false));
  }, []);

  const onUserUpdate = (values) => {
      console.log(values);
      updateUser( {
          id: user?.id,
          address: {
              street : values.street,
              city : values.city,
              state: values.state,
              postcode : values.postcode,
              countryId : countries.find((country) => country.name === values.country)?.id
          },
          avatar : 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/220px-SNice.svg.png'
      }). then(({data}) => {
          {
              dispatch(
                  addUser({
                      user:data,
                      jwt:getUserFromLocalStorage()?.jwt
                  })
              );
      navigate(AppRoutes.HOME);
  }
      })
          .catch((err) => console.log(err))
          .finally();
  };

  const handleImageChange = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
              <Formik
                  initialValues={{
                      fullName: user?.fullName,
                      office: user?.office.name,
                      role: user?.position,
                      street: user?.address.street,
                      city: user?.address.city,
                      state: user?.address.state,
                      postcode: user?.address.postcode,
                      country: user?.country.name
                  }}
                  validationSchema={UserProfileValidationSchema}
                  onSubmit={onUserUpdate}
                                                                 >
                  {({values, errors, touched, handleChange, handleSubmit, handleBlur, isSubmitting, setFieldValue}) => (
                      <form onSubmit={handleSubmit} id={'userUpdateForm'} >
                          {error && <Alert severity="error">USER UPDATE FAILED</Alert> }
                          <>
                              <Sidebar />
                              <Box paddingBottom='10px'>
                                  <Typography variant='h3' gutterBottom sx={{ color: '#0E166E' }}>
                                      My Profile
                                  </Typography>
                                  <Typography variant='h5' sx={{ color: '#6B706D', marginBottom: '10px' }}>
                                      Edit your personal information, position and working address
                                  </Typography>
                              </Box>
                              <Grid container spacing={5}>
                                  <Grid item xs={4} md={4} >
                                      <Typography variant='h5' sx={{ color: '#6B706D', marginBottom: '5px'}}>
                                          Photo
                                      </Typography>
                                      <div onClick={handleImageChange} style={{ cursor: 'pointer', position: 'relative', width: '320px', height: '320px' }}>

                                          { user?.avatar ? <img src={user?.avatar} alt="Selected" style={{ width: '100%', height: '100%', borderRadius: '6px',
                                              borderColor: COLORS.lighterGray,
                                              borderWidth: '1px',
                                              borderStyle: 'solid',
                                              outlineColor: COLORS.blue,
                                              outlineWidth: '4px', }}
                                                           /> : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                                              <label style={labelColor} id="photoLabel">
                                                  Select Photo
                                              </label>
                                          </div>

                                          }

                                      </div>
                                  </Grid>
                                  <Grid item xs={8} md={8}>
                                      <Grid container spacing={5} direction='row'>
                                          <Grid item xs={12}>
                                              <Typography variant="h5" style={{ color: 'grey', paddingBottom: '5px' }}>
                                                  Full Name
                                              </Typography>
                                              <WideDisabledField
                                                  id="fullName"
                                                  name="fullName"
                                                  type="text"
                                              />
                                          </Grid>
                                          <Grid item xs={6}>
                                              <Typography variant="h5" style={{ color: 'grey', paddingBottom: '5px' }}>
                                                  Department
                                              </Typography>
                                              <DisabledField
                                                  id="office"
                                                  name="office"
                                                  type="text"
                                              />
                                          </Grid>
                                          <Grid item xs={6}>
                                              <Typography variant="h5" style={{ color: 'grey', paddingBottom: '5px' }}>
                                                  Role
                                              </Typography>
                                              <DisabledField
                                                  id="role"
                                                  name="role"
                                                  type="text"
                                              />
                                          </Grid>
                                      </Grid>
                                      <Grid item xs={12} md={12} style={{ marginTop: '50px', marginBottom: '40px' }}>
                                          <Divider style={{ ...labelColor, marginTop: '40px', marginBottom: '40px' }}/>
                                          <label style={{ ...labelColor, marginTop: '40px', marginBottom: '40px' }}>Address</label>
                                      </Grid>
                                      <Grid container spacing={5} direction="row">
                                          <Grid item xs={12}>
                                              <Typography variant="h5" style={{ color: 'grey', paddingBottom: '5px' }}>
                                                  Street address
                                              </Typography>
                                              <StyledTextField
                                                  error={touched.street && !!errors.street}
                                                  errorMessage="Please input your street."
                                                  id="street"
                                                  name="street"
                                                  type="text"
                                              />
                                          </Grid>
                                          <Grid item xs={6}>
                                              <Typography variant="h5" style={{ color: 'grey', paddingBottom: '5px' }}>
                                                  City
                                              </Typography>
                                              <StyledTextField
                                                  error={touched.city && !!errors.city}
                                                  errorMessage="Please input your city."
                                                  id="city"
                                                  name="city"
                                                  type="text"
                                              />
                                          </Grid>
                                          <Grid item xs={6}>
                                              <Typography variant="h5" style={{ color: 'grey', paddingBottom: '5px' }}>
                                                  State / Province
                                              </Typography>
                                              <StyledTextField
                                                  error={touched.state && !!errors.state}
                                                  errorMessage="Please input your state."
                                                  id="state"
                                                  name="state"
                                                  type="text"
                                              />
                                          </Grid>
                                          <Grid item xs={6}>
                                              <Typography variant="h5" style={{ color: 'grey', paddingBottom: '5px' }}>
                                                  Postcode
                                              </Typography>
                                              <StyledTextField
                                                  error={touched.postcode && !!errors.postcode}
                                                  errorMessage="Please input your postcode."
                                                  id="postcode"
                                                  name="postcode"
                                                  type="text"
                                                  placeholder="e.g., name@cognizant.com"
                                              />
                                              <Typography sx={{ color: 'red' }}>
                                                  <ErrorMessage name='postcode'/>
                                              </Typography>
                                          </Grid>
                                          <Grid item xs={6}>
                                              <Typography variant="h5" style={{ color: 'grey', paddingBottom: '5px' }}>
                                                  Country
                                              </Typography>

                                              <FormControl fullWidth >
                                              <Field
                                                  fullWidth
                                                  id={'country'}
                                                  name={'country'}
                                                  as={Select}
                                                  style={{
                                                      fontSize: '14px',
                                                      paddingLeft: '3px',
                                                      height: '40px',
                                                      color: COLORS.blue,
                                                      borderRadius: '6px',
                                                      borderColor: COLORS.lighterGray,
                                                      outlineColor: COLORS.blue,
                                                      outlineWidth: '4px',
                                                      boxShadow: 'none'
                                                  }}
                                                  onChange={event => setFieldValue('country', event.target.value)
                                                  }
                                              >
                                                  {countries.map((country) =>
                                                      <MenuItem key={country.id} value={country.name}>{country.name}</MenuItem>
                                                  )}
                                               </Field>
                                          </FormControl>
                                          </Grid>
                                      </Grid>
                                  </Grid>
                              </Grid>
                              <Grid container justifyContent="flex-end" sx={{ marginTop: '50px' }}>
                                  <StyledButton buttonType='secondary' buttonSize='small' type='button'
                                                onClick={() => navigate(AppRoutes.HOME)}
                                  >Cancel</StyledButton>

                                      <Button type="submit"
                                              form={'userUpdateForm'}
                                              sx={{
                                                  width: '70px',
                                                  height: '30px',
                                                  fontSize: '12px',
                                                  borderRadius: '35px',
                                                  marginLeft: '10px',
                                                  backgroundColor: COLORS.blue,
                                                  color: 'white',
                                              }}
                                      >
                                          Save</Button>
                              </Grid>
                          </>
                      </form>
                  )}
              </Formik>
  );
};

export default UserProfile;

