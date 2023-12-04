import { Grid, IconButton, Paper, Typography } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { getStorage, ref } from 'firebase/storage';
import { COLORS } from '../../values/colors';
import { boolean } from 'yup';

const FilePreviewElement = ({ link, fileName, removeUpload, isDeletable }) => {
  const handleDeleteFile = () => removeUpload(link);

  const storage = getStorage();
  const storageRef = ref(storage, link);
  const fileNames = storageRef.name;

  return (
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 250,
        flexGrow: 1,
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
      }}
    >
      <Grid container spacing={1}>
        <Grid item>
          <img alt={'upload'} src={link} style={{ height: 65, width: 65 }} />
        </Grid>
        <Grid item xs={6} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography variant="body2" sx={{ fontSize: 18, color: COLORS.blue }} gutterBottom>
                {fileNames}
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ fontSize: 14, color: 'grey' }} variant="body2">
                Media Download
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            {isDeletable && (
              <IconButton onClick={handleDeleteFile}>
                <CloseIcon />
              </IconButton>
            )}
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
  isDeletable: PropTypes.bool,
};

FilePreviewElement.defaultProps = {
  isDeletable: true,
};

export default FilePreviewElement;
