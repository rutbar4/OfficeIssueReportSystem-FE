import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Box from '@mui/material/Box';
import { Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import BackupIcon from '@mui/icons-material/Backup';
import { ref, uploadBytes, getDownloadURL, listAll, list } from 'firebase/storage';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

import { storage } from '../../firebase/firebaseConfig';

import { COLORS } from 'src/values/colors.js';

const ProfileImageDropZone = ({ setImageInForm }) => {
  const [imageUpload, setImageUpload] = useState<File[]>([]);

  const [imageList, setImageList] = useState<string[]>([]);

  const uploadImage = useCallback(
    (acceptedFiles: File[]) => {
      const imagesRef = ref(storage, 'images/');

      setImageUpload(acceptedFiles);

      if (acceptedFiles.length === 0) return;

      Promise.all(
        acceptedFiles.map((image) => {
          console.log('file:', image.name);
          const imageRef = ref(storage, `Profile/${image.name}`);

          return uploadBytes(imageRef, image).then(() => {
            return getDownloadURL(imageRef).then((url) => {
              console.log('url:', url);
              return url;
            });
          });
        })
      )
        .then((urls) => {
          // Update state with the list of URLs
          setImageList((prev) => [...prev, ...urls]);
          setImageInForm([...imageList, ...urls]);
        })
        .catch((error) => {
          console.error('Error uploading files:', error);
        })
        .finally();
    },
    [setImageInForm]
  );

  const onDrop = useCallback(
    (acceptedFiles) => {
      uploadImage(acceptedFiles);
    },
    [uploadImage]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box
      sx={{
        height: '10rem',
        width: '850px',
        maxWidth: '100%',
        textAlign: 'center',
        position: 'relative',
        borderRadius: '1rem',
        borderWidth: '1px',
        alignItems: 'top',
        display: 'flex',
        justifyContent: 'right',
      }}
    >
      {
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <div>
              <Stack direction="row" spacing={2} alignItems={'right'}>
                <AddAPhotoIcon fontSize={'large'} style={{ cursor: 'pointer', color: COLORS.blue }} />
              </Stack>
            </div>
          )}
        </div>
      }
    </Box>
  );
};

export default ProfileImageDropZone;
