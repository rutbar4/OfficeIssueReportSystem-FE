import { Box, Button, Divider, Grid, TextField, Typography } from '@mui/material';
import { useRef, useState } from 'react';

import Sidebar from '../sidebar/Sidebar';
import StyledButton from '../StyledButton/StyledButton';


const labelColor = { color: '#6B706D' };
const defaultImageUrl =
    'https://images.unsplash.com/photo-1585837146751-a44118595680?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2058&q=80';



  const UserProfile = () => {

    const [image, setImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

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
              <TextField fullWidth sx={{ marginTop: '7px' }}/>
            </Grid>
            <Grid item xs={6}>
              <label style={labelColor}>Department</label>
              <TextField select fullWidth sx={{ marginTop: '7px' }}/>
            </Grid>
            <Grid item xs={6}>
              <label style={labelColor}>Role</label>
              <TextField fullWidth sx={{ marginTop: '7px' }}/>
            </Grid>
        </Grid>
        <Grid item xs={12} md={12} style={{ marginTop: '50px', marginBottom: '40px' }}>
            <Divider style={{ ...labelColor, marginTop: '40px', marginBottom: '40px' }}/>
            <label style={{ ...labelColor, marginTop: '40px', marginBottom: '40px' }}>Address</label>
          </Grid>
       <Grid container spacing={5} direction="row">
         <Grid item xs={12}>
            <label style={labelColor}>Street address</label>
              <TextField fullWidth sx={{ marginTop: '7px' }}/>
            </Grid>
            <Grid item xs={6}>
              <label style={labelColor}>City</label>
              <TextField select fullWidth sx={{ marginTop: '7px' }}/>
            </Grid>
            <Grid item xs={6}>
              <label style={labelColor}>State/ Province</label>
              <TextField fullWidth sx={{ marginTop: '7px' }}/>
            </Grid>
            <Grid item xs={6}>
              <label style={labelColor}>Postcode</label>
              <TextField fullWidth sx={{ marginTop: '7px' }}/>
            </Grid>
            <Grid item xs={6}>
              <label style={labelColor}>Country</label>
              <TextField
                select
                fullWidth
                sx={{ marginTop: '7px' }}
              />
            </Grid>
        </Grid>
      </Grid>
  </Grid>
  <Grid container justifyContent="flex-end" sx={{ marginTop: '50px' }}>
        <StyledButton buttonType='secondary' buttonSize='small' type='button'>Cancel</StyledButton>
        <StyledButton buttonType='primary' buttonSize='small' type='button'>Save</StyledButton>
      </Grid>
    </>
  );
};

export default UserProfile;

