import { Box } from '@mui/system';
import { Grid, Stack } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

import FilePreviewElement from './FilePreviewElement';

import HTTP from 'src/api';

const AttachmentsFieldDetails = ({ imageList, updateImageList, issueID }) => {
  const deleteUpload = async (url) => {
    try {
      const response = await HTTP.delete('http://localhost:8080/issue/deletePicture', {
        params: {
          issueId: issueID,
          link: url,
        },
      });

      if (response.status === 200) {
        const index = imageList.indexOf(url);
        if (index > -1) {
          const newImageList = [...imageList];
          newImageList.splice(index, 1);
          updateImageList(newImageList);
        }
      } else {
        console.error('Error deleting image:', response.data);
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }

    const index = imageList.indexOf(url);
    if (index > -1) {
      const newImageList = [...imageList];
      newImageList.splice(index, 1);
      updateImageList(newImageList);
    }
  };

  return (
    <Box maxWidth={'800px'} maxHeight={'200px'} overflow="auto">
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 8, md: 12 }} style={{}}>
        {imageList.map((url) => (
          <Grid item key={url} xs={5} style={{ width: '150px', height: '120px', margin: '20px' }}>
            <FilePreviewElement key={url} fileName={'file'} link={url} removeUpload={deleteUpload} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

AttachmentsFieldDetails.propTypes = {
  imageList: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateImageList: PropTypes.func.isRequired,
};

export default AttachmentsFieldDetails;
