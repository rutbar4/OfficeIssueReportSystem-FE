import { Grid, IconButton, Paper, Typography} from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

const FilePreviewElement =({link, fileName,removeUpload})=> {

    const handleDeleteFile = () => removeUpload(link);

    return (

      <Paper
        sx={{
          p: 2,
          margin: 'auto',
          maxWidth: 250,
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        }}
      >
        <Grid container spacing={1}>
          <Grid item>

              <img alt={'upload'} src={link} style={{height:65, width:65}} />

          </Grid>
          <Grid item xs={6} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography variant="body2" gutterBottom>
                  Full resolution 1920x1080 • JPEG
                </Typography>
              </Grid>
              <Grid item>
                <Typography sx={{ cursor: 'pointer' }} variant="body2">
                  Download
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <IconButton onClick={handleDeleteFile}>
                <CloseIcon/>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
};

FilePreviewElement.propTypes = {
    link: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired,
    removeUpload: PropTypes.func.isRequired,
};

export default FilePreviewElement;
