import { Box, Divider, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import {  useNavigate } from 'react-router';

import Sidebar from '../sidebar/Sidebar';
import StyledButton from '../StyledButton/StyledButton';

import { AppRoutes } from 'src/types/routes';
import { UserProfileModel } from 'src/models/UserProfileModel';
import { fetchUserProfile, updateUserProfile } from 'src/api/UserProfileApi';
import { Address, Country } from 'src/models/AddressModel';
import { fetchAllOffices } from 'src/api/OfficeApi';
import { Office } from 'src/models/OfficeModel';
import { fetchAllCountries } from 'src/api/CountryApi';
import { fetchAllAddresses } from 'src/api/AddressApi';


const labelColor = { color: '#6B706D' };

  const UserProfile = () => {

    const [image, setImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();

    const [offices, setOffices] = useState<Office[]>([]);
    const [countries, setCountries] = useState<Country[]>([]);
    const[addresses, setAddresses] = useState<Address[]>([]);
    const [userProfile, setUserProfile] = useState<UserProfileModel | null>(null);
    const [updatedUserProfile, setUpdatedUserProfile] = useState<UserProfileModel>({
      id: '',
      fullName: '',
      role: '',
      department: {
        id: '',
        officeName: '',
      },
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
    });


    useEffect(() => {
      fetchUserProfile()
        .then((data) => {
          setUserProfile(data);
          if (data.picture && data.picture.link) {
            setImage(data.picture.link);
          }
        });
    }, []);


    useEffect(() => {
      fetchAllOffices()
      .then((data) => {
        setOffices(data);
      });
    }, []);


    useEffect(() => {
      fetchAllAddresses()
      .then((data) => {
        setAddresses(data);
      });
    }, []);


    useEffect(() => {
      fetchAllCountries()
      .then((data) => {
        setCountries(data);
      });
    }, []);


    const handleUpdateUserClick = () => {
      if (updatedUserProfile) {
        if (updatedUserProfile.picture) {
          if (image) {
            updatedUserProfile.picture.link = image;
          }
        }
        if (userProfile) {
          updatedUserProfile.id = userProfile.id;
          userProfile.address && (updatedUserProfile.address.id = userProfile.address.id);
          userProfile.country && (updatedUserProfile.country.id = userProfile.country.id);
          userProfile.picture && (updatedUserProfile.picture.id = userProfile.picture.id);
        }
        updateUserProfile(updatedUserProfile)
          .then((status) => {
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
              // eslint-disable-next-line jsx-a11y/img-redundant-alt
              <img src={image} alt="Selected Photo" style={{ width: '100%', height: '100%' }} />
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
              <TextField fullWidth sx={{ marginTop: '7px' }}
               value={userProfile?.fullName || ''}
               onChange={(event) => {
                setUpdatedUserProfile((updatedUserProfile) => ({
                  ...updatedUserProfile,
                  fullName: event.target.value || '',
                }));
              }}
              />
            </Grid>
            <Grid item xs={6}>
              <label style={labelColor}>Department</label>
              <TextField select fullWidth sx={{ marginTop: '7px' }}
              value={userProfile?.department.officeName || ''}
              onChange={(event) => {
                setUpdatedUserProfile((updatedUserProfile) => ({
                  ...updatedUserProfile,
                  department: {
                    ...updatedUserProfile.department,
                    officeName: event.target.value || '',
                  },
                }));
              }}
              >
                {offices.map((office) => (
                <MenuItem key={office.id} value={office.officeName}>
                  {office.officeName}
                </MenuItem>
              ))}
                </ TextField>
            </Grid>
            <Grid item xs={6}>
              <label style={labelColor}>Role</label>
              <TextField fullWidth sx={{ marginTop: '7px' }}
               value={userProfile?.role || ''}
               onChange={(event) => {
                setUpdatedUserProfile((updatedUserProfile) => ({
                  ...updatedUserProfile,
                  role: event.target.value || '',
                }));
              }}
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
              <TextField fullWidth sx={{ marginTop: '7px' }}
              value={userProfile?.address.street || ''}
              onChange={(event) => {
                setUpdatedUserProfile((updatedUserProfile) => ({
                  ...updatedUserProfile,
                  address: {
                    ...updatedUserProfile.address,
                    street: event.target.value || '',
                  },
                }));
              }}
              />
            </Grid>
            <Grid item xs={6}>
              <label style={labelColor}>City</label>
              <TextField select fullWidth sx={{ marginTop: '7px' }}
               value={userProfile?.address.city || ''}
               onChange={(event) => {
                setUpdatedUserProfile((updatedUserProfile) => ({
                  ...updatedUserProfile,
                  address: {
                    ...updatedUserProfile.address,
                    city: event.target.value || '',
                  },
                }));
              }}
              >
                {addresses.map((address) => (
                  <MenuItem key={address.id} value={address.city}>
                    {address.city}
                  </MenuItem>
                ))}
                </TextField>
            </Grid>
            <Grid item xs={6}>
              <label style={labelColor}>State/ Province</label>
              <TextField fullWidth sx={{ marginTop: '7px' }}
               value={userProfile?.address.state || ''}
               onChange={(event) => {
                setUpdatedUserProfile((updatedUserProfile) => ({
                  ...updatedUserProfile,
                  address: {
                    ...updatedUserProfile.address,
                    state: event.target.value || '',
                  },
                }));
              }}
              />
            </Grid>
            <Grid item xs={6}>
              <label style={labelColor}>Postcode</label>
              <TextField fullWidth sx={{ marginTop: '7px' }}
               value={userProfile?.address.postcode || ''}
               onChange={(event) => {
                setUpdatedUserProfile((updatedUserProfile) => ({
                  ...updatedUserProfile,
                  address: {
                    ...updatedUserProfile.address,
                    postcode: event.target.value || '',
                  },
                }));
              }}
              />
            </Grid>
            <Grid item xs={6}>
              <label style={labelColor}>Country</label>
              <TextField
                select
                fullWidth
                sx={{ marginTop: '7px' }}
                value={userProfile?.country.countryName || ''}
                onChange={(event) => {
                  setUpdatedUserProfile((updatedUserProfile) => ({
                    ...updatedUserProfile,
                    country: {
                      ...updatedUserProfile.address,
                      countryName: event.target.value || '',
                    },
                  }));
                }}
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

