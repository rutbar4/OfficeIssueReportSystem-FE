import { Box } from '@mui/system';
import { Stack } from '@mui/material';
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
    <Box maxWidth={'400px'} maxHeight={'400px'}>
      <Stack direction="row" spacing={2}>
        {imageList.map((url) => (
          <FilePreviewElement key={url} fileName={'file'} link={url} removeUpload={deleteUpload} />
        ))}
      </Stack>
    </Box>
  );
};

AttachmentsFieldDetails.propTypes = {
  imageList: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateImageList: PropTypes.func.isRequired,
};

export default AttachmentsFieldDetails;
