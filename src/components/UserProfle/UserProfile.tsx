import { Autocomplete, Box, Divider, Grid, TextField, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import {  useNavigate } from 'react-router';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import {useSelector} from 'react-redux';

import Sidebar from '../sidebar/Sidebar';
import StyledButton from '../StyledButton/StyledButton';
import {RootState} from '../../store/store';
import StyledTextField from '../formFields/StyledTextField';

import { AppRoutes } from 'src/types/routes';
import {  Country } from 'src/models/AddressModel';
import { fetchAllOffices } from 'src/api/OfficeApi';
import { Office } from 'src/models/OfficeModel';
import { fetchAllCountries } from 'src/api/CountryApi';



const labelColor = { color: '#6B706D' };


const UserProfile = () => {

  const UserProfileValidationSchema = Yup.object().shape({
    fullName: Yup.string().max(150, 'Full name must be max 150 symbols!')
    .required('Full name is required!'),
    officeName: Yup.string().max(50, 'Department must be max 50 symbols!')
    .required('Department is required!'),
    role: Yup.string().max(50, 'Role must be max 50 symbols!')
    .required('Role is required!'),
    street: Yup.string().max(150, 'Street address must be max 150 symbols!')
    .required('Street address is required!'),
    city: Yup.string().max(50, 'City must be max 50 symbols!')
    .required('City is required!'),
    state: Yup.string().max(150, 'State must be max 150 symbols!')
    .required('State is required!'),
    postcode: Yup.string().max(10, 'Postcode must be max 10 symbols!')
    .required('Postcode is required!'),
    countryName: Yup.string().max(50, 'Country must be max 50 symbols!')
    .required('Country is required!'),
  });

  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const [offices, setOffices] = useState<Office[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state:RootState) => state.user.user);


  useEffect(() => {
    Promise.all([ fetchAllOffices(), fetchAllCountries()])
      .then(([fetchedOffices, fetchedCountries]) => {
        setOffices(fetchedOffices);
        setCountries(fetchedCountries);
      });
  }, []);


  const handleUpdateUserSubmit = (values) => {
   console.log(values);

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
      onSubmit={handleUpdateUserSubmit}
      enableReinitialize
    >
  {(props) => (
    <Form >
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
          <Typography variant='h5' sx={{ color: '#6B706D', marginBottom: '10px' }}>
            Photo
          </Typography>
        <Grid container spacing={5}>
            <Grid item xs={4} md={4}>
              <div style={{ cursor: 'pointer', position: 'relative', width: '300px', height: '300px', border:'2px', borderColor:'grey' }}>

                  <img src={user?.avatar} alt="Selected" style={{ width: '100%', height: '100%' }} />


              </div>
            </Grid>
          <Grid item xs={8} md={8}>
            <Grid container spacing={5} direction='row'>
              <Grid item xs={12}>
                <Typography variant="h5" style={{ color: 'grey', paddingBottom: '5px' }}>
                  Full Name
                </Typography>
                <StyledTextField
                  error={props.touched.fullName && !!props.errors.fullName}
                  errorMessage="Please input your full name."
                  id="fullName"
                  name="fullName"
                  type="text"
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h5" style={{ color: 'grey', paddingBottom: '5px' }}>
                  Department
                </Typography>
                <StyledTextField
                  error={props.touched.office && !!props.errors.office}
                  errorMessage="Please input your email address."
                  id="office"
                  name="office"
                  type="select"
                  placeholder="e.g., name@cognizant.com"
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h5" style={{ color: 'grey', paddingBottom: '5px' }}>
                  Role
                </Typography>
                <StyledTextField
                  error={props.touched.role && !!props.errors.role}
                  errorMessage="Please input your roles."
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
                  error={props.touched.street && !!props.errors.street}
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
                  error={props.touched.city && !!props.errors.city}
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
                  error={props.touched.state && !!props.errors.state}
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
                  error={props.touched.postcode && !!props.errors.postcode}
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
                <label style={labelColor}>Country</label>
                <Field name="countryName">
                  {({ field, form }) => (
                    <Autocomplete
                      fullWidth
                      sx={{ marginTop: '7px' }}
                      id="country"
                      options={countries.map((country) => country.name)}
                      value={field.value}
                      renderInput={(params) => <TextField {...params}/>}
                      onChange={(_, newValue) => {
                        form.setFieldValue('countryName', newValue);
                      }}
                    />
                  )}
                </Field>
                <Typography sx={{ color: 'red' }}>
                  <ErrorMessage name='countryName'/>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end" sx={{ marginTop: '50px' }}>
          {loading && <div
                style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '50%',
                  transform: 'translate(-50%, 0%)',
                  color: labelColor.color,
                  padding: '8px',
                }}
                      >
                Saving...
              </div>}
          <StyledButton buttonType='secondary' buttonSize='small' type='button'
            onClick={() => navigate(AppRoutes.HOME)}
          >Cancel</StyledButton>
          <StyledButton
            buttonType='primary'
            buttonSize='small'
            type='submit'
          >Save</StyledButton>
        </Grid>
      </>
    </Form>
  )}
</Formik>
  );
};

export default UserProfile;

