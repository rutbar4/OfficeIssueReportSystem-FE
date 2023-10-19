import { Box, Divider, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import {  useNavigate } from 'react-router';

import Sidebar from '../sidebar/Sidebar';
import StyledButton from '../StyledButton/StyledButton';

import { AppRoutes } from 'src/types/routes';
import { UserProfileModel } from 'src/models/UserProfileModel';
import { fetchUserProfile, updateUserProfile } from 'src/api/UserProfileApi';
import {  Country } from 'src/models/AddressModel';
import { fetchAllOffices } from 'src/api/OfficeApi';
import { Office } from 'src/models/OfficeModel';
import { fetchAllCountries } from 'src/api/CountryApi';


const labelColor = { color: '#6B706D' };

const emptyUserProfile: UserProfileModel = {
  fullName: '',
  department: {
    id: '',
    officeName: '',
  },
  role: '',
  address: {
    id: '',
    street: '',
    city: '',
    state: '',
    postcode: '',
  },
  country: {
    id: '',
    countryName: '',
  },
  picture: {
    id: '',
    link: '',
  },
};

  const UserProfile = () => {

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


    const handleUpdateUserClick = () => {
      if (userProfile) {
        if (userProfile.picture) {
          if (image) {
            userProfile.picture.link = image;
          }
        }
        updateUserProfile(userProfile)
          .then((status) => {
            if (status === 201) {
              navigate(AppRoutes.HOME);
            }
        });
      }
    };


    const updateUserProperty = (userProperty: string, value: string) => {
      setUserProfile((user) => ({
        ...user,
        [userProperty]: value,
      }));
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
    <>
    <Sidebar />
    <Box paddingBottom='10px'>
    <Typography variant="h3" gutterBottom sx={{ color: '#0E166E' }}>
          My Profile
        </Typography>
        <Typography variant="h5" sx={{ color: '#6B706D', marginBottom: '10px' }}>
          Edit your personal information, position and working address
          </Typography>
          </Box>
          <Typography variant="h5" sx={{ color: '#6B706D', marginBottom: '10px' }}>
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
              type="file"
              accept="image/*"
              capture="environment"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleFileInputChange}
            />
          </div>
      </Grid>
        <Grid item xs={8} md={8}>
        <Grid container spacing={5} direction="row">
          <Grid item xs={12}>
            <label style={labelColor}>Full name</label>
              <TextField fullWidth
               sx={{ marginTop: '7px' }}
               value={userProfile?.fullName || ''}
               onChange={(event) => updateUserProperty('fullName', event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <label style={labelColor}>Department</label>
              <TextField
              fullWidth
              select
              sx={{ marginTop: '7px' }}
              value={userProfile?.department.officeName || ''}
              onChange={(event) => updateUserProperty('department.officeName', event.target.value)}
              >
              {offices.map((office) => (
                <MenuItem key={office.id} value={office.officeName}>
                  {office.officeName}
                </MenuItem>
              ))}
            </TextField>

{/* <Select
    fullWidth
    sx={{ marginTop: '7px' }}
    value={userProfile?.department.officeName || ''}
    onChange={(event) => updateUserProperty('department.officeName', event.target.value)}
    id={userProfile?.department.id}
  >
    {offices.map((office) => (
      <option key={office.id} value={office.officeName}>
        {office.officeName}
      </option>
    ))}
  </Select> */}

            </Grid>
            <Grid item xs={6}>
              <label style={labelColor}>Role</label>
              <TextField fullWidth
               sx={{ marginTop: '7px' }}
               value={userProfile?.role || ''}
               onChange={(event) => updateUserProperty('role', event.target.value)}
              />
            </Grid>
        </Grid>
        <Grid item xs={12} md={12} style={{ marginTop: '50px', marginBottom: '40px' }}>
            <Divider style={{ ...labelColor, marginTop: '40px', marginBottom: '40px' }}/>
            <label style={{ ...labelColor, marginTop: '40px', marginBottom: '40px' }}>Address</label>
          </Grid>
       <Grid container spacing={5} direction="row">
         <Grid item xs={12}>
            <label style={labelColor}>Street address</label>
              <TextField fullWidth
               sx={{ marginTop: '7px' }}
              value={userProfile?.address.street || ''}
              onChange={(event) => updateUserProperty('address.street', event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <label style={labelColor}>City</label>
              <TextField
                fullWidth
                value={userProfile?.address.city || ''}
                sx={{ marginTop: '7px' }}
                onChange={(event) => updateUserProperty('address.city', event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <label style={labelColor}>State/ Province</label>
              <TextField fullWidth
               sx={{ marginTop: '7px' }}
               value={userProfile?.address.state || ''}
               onChange={(event) => updateUserProperty('address.state', event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <label style={labelColor}>Postcode</label>
              <TextField fullWidth
               sx={{ marginTop: '7px' }}
               value={userProfile?.address.postcode || ''}
               onChange={(event) => updateUserProperty('address.postcode', event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <label style={labelColor}>Country</label>
              <TextField
                select
                fullWidth
                sx={{ marginTop: '7px' }}
                value={userProfile?.country.countryName || ''}
                onChange={(event) => updateUserProperty('country.countryName', event.target.value)}
              >
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.countryName}>
                    {country.countryName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
        </Grid>
      </Grid>
  </Grid>
  <Grid container justifyContent="flex-end" sx={{ marginTop: '50px' }}>
    <StyledButton buttonType='secondary' buttonSize='small' type='button'
      onClick={() => navigate(AppRoutes.HOME)}>Cancel</StyledButton>
    <StyledButton buttonType='primary' buttonSize='small' type='button'
    onClick={handleUpdateUserClick}
    >Save</StyledButton>
  </Grid>
    </>
  );
};

export default UserProfile;

