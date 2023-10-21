import { Box, Divider, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import {  useNavigate } from 'react-router';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';


import Sidebar from '../sidebar/Sidebar';
import StyledButton from '../StyledButton/StyledButton';

import { AppRoutes } from 'src/types/routes';
import { UserProfileModel } from 'src/models/UserProfileModel';
import { fetchUserProfile, updateUserProfile, emptyUserProfile } from 'src/api/UserProfileApi';
import {  Country } from 'src/models/AddressModel';
import { fetchAllOffices } from 'src/api/OfficeApi';
import { Office } from 'src/models/OfficeModel';
import { fetchAllCountries } from 'src/api/CountryApi';


const labelColor = { color: '#6B706D' };


  const UserProfile = () => {

    const UserProfileValidationSchema = Yup.object().shape({
      fullName: Yup.string().required('Full name is required!'),
      officeName: Yup.string().required('Department is required!'),
      role: Yup.string().required('Role is required!'),
      street: Yup.string().required('Street Address is required!'),
      city: Yup.string().required('City is required!'),
      state: Yup.string().required('State is required!'),
      postcode: Yup.string().required('Postcode is required!'),
      countryName: Yup.string().required('Country is required!'),
    });

    const [image, setImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();

    const [offices, setOffices] = useState<Office[]>([]);
    const [countries, setCountries] = useState<Country[]>([]);
    const [userProfile, setUserProfile] = useState<UserProfileModel>(emptyUserProfile);


    useEffect(() => {
      Promise.all([fetchUserProfile(), fetchAllOffices(), fetchAllCountries()])
        .then(([profile, fetchedOffices, fetchedCountries]) => {
          setUserProfile(profile);
          if (profile.picture && profile.picture.link) {
            setImage(profile.picture.link);
          }
          setOffices(fetchedOffices);
          setCountries(fetchedCountries);
        });
    }, []);


    const handleUpdateUserSubmit = (values) => {
      if (userProfile) {
        if (userProfile.picture) {
          if (image) {
            userProfile.picture.link = image;
          }
        }
        updateUserProfile({ ...userProfile, ...values }).then((status) => {
          if (status === 201) {
            navigate(AppRoutes.HOME);
          }
        });
      }
    };


    const handleImageChange = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>, formikBag: any) => {
      const file = event.target.files && event.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
        formikBag.setFieldValue('image', imageUrl);
      }
    };


  return (
    <Formik
      initialValues={{
        fullName: userProfile?.fullName || '',
        department: {
          officeName: userProfile?.department.officeName || '',
        },
        role: userProfile?.role || '',
        address: {
          street: userProfile?.address.street || '',
          city: userProfile?.address.city || '',
          state: userProfile?.address.state || '',
          postcode: userProfile?.address.postcode || '',
        },
        country: {
          countryName: userProfile?.country.countryName || ''
      }
    }}
    validationSchema={UserProfileValidationSchema}
    onSubmit={handleUpdateUserSubmit}
    enableReinitialize
    >
  {(formikProps) => (
    <Form onSubmit={formikProps.handleSubmit}>
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
          <div onClick={handleImageChange} style={{ cursor: 'pointer', position: 'relative', width: '300px', height: '300px' }}>
            {image ? (
              <img src={image} alt="Selected" style={{ width: '100%', height: '100%' }} />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                <label style={labelColor} id="photoLabel">
                  Select Photo
                </label>
              </div>
            )}
            <input
              type='button'
              accept='image/*'
              capture='environment'
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={(event) => handleFileInputChange(event, formikProps)}
            />
          </div>
      </Grid>
        <Grid item xs={8} md={8}>
        <Grid container spacing={5} direction='row'>
          <Grid item xs={12}>
            <label style={labelColor}>Full name</label>
            <Field
              fullWidth
              sx={{ marginTop: '7px' }}
              as={TextField}
              id='fullName'
              name='fullName'
            />
            <Typography sx={{ color: 'red' }}>
              <ErrorMessage name="fullName" />
            </Typography>
            </Grid>
            <Grid item xs={6}>
              <label style={labelColor}>Department</label>
              <Field
                fullWidth
                sx={{ marginTop: '7px' }}
                as={Select}
                id='department.officeName'
                name='department.officeName'
                value={formikProps.values.department.officeName}
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur}
              >
              {offices.map((office) => (
                <MenuItem key={office.id} value={office.officeName}>
                  {office.officeName}
                </MenuItem>
              ))}
              </Field>
              <Typography sx={{ color: 'red' }}>
                <ErrorMessage name="department.officeName"/>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <label style={labelColor}>Role</label>
              <Field
               fullWidth
               sx={{ marginTop: '7px' }}
               as={TextField}
               id='role'
               name='role'
              />
              <Typography sx={{ color: 'red' }}>
                <ErrorMessage name='role'/>
              </Typography>
            </Grid>
        </Grid>
        <Grid item xs={12} md={12} style={{ marginTop: '50px', marginBottom: '40px' }}>
            <Divider style={{ ...labelColor, marginTop: '40px', marginBottom: '40px' }}/>
            <label style={{ ...labelColor, marginTop: '40px', marginBottom: '40px' }}>Address</label>
          </Grid>
       <Grid container spacing={5} direction="row">
         <Grid item xs={12}>
            <label style={labelColor}>Street address</label>
              <Field
               fullWidth
               sx={{ marginTop: '7px' }}
               as={TextField}
               id='street'
               name='address.street'
              />
              <ErrorMessage name='address.street'/>
            </Grid>
            <Grid item xs={6}>
              <label style={labelColor}>City</label>
              <Field
                fullWidth
                sx={{ marginTop: '7px' }}
                as={TextField}
                id='city'
                name='address.city'
              />
              <Typography sx={{ color: 'red' }}>
                <ErrorMessage name='address.city'/>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <label style={labelColor}>State/ Province</label>
              <Field
               fullWidth
               sx={{ marginTop: '7px' }}
               as={TextField}
               id='state'
               name='address.state'
              />
              <Typography sx={{ color: 'red' }}>
                <ErrorMessage name='address.state'/>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <label style={labelColor}>Postcode</label>
              <Field
               fullWidth
               sx={{ marginTop: '7px' }}
               as={TextField}
               id='postcode'
               name='address.postcode'
              />
              <Typography sx={{ color: 'red' }}>
                <ErrorMessage name='address.postcode'/>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <label style={labelColor}>Country</label>
              <Field
                fullWidth
                sx={{ marginTop: '7px' }}
                as={Select}
                id='country'
                name='country.countryName'
                value={formikProps.values.country.countryName}
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur}
              >
              {countries.map((country) => (
                <MenuItem key={country.id} value={country.countryName}>
                  {country.countryName}
                </MenuItem>
              ))}
              </Field>
              <Typography sx={{ color: 'red' }}>
                <ErrorMessage name='country.countryName'/>
              </Typography>
            </Grid>
        </Grid>
      </Grid>
  </Grid>
  <Grid container justifyContent="flex-end" sx={{ marginTop: '50px' }}>
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
