import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Box from '@mui/material/Box';
import { Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import BackupIcon from '@mui/icons-material/Backup';
import { ref, uploadBytes, getDownloadURL, listAll, list } from 'firebase/storage';
import { v4 } from 'uuid';

import { storage } from '../../firebase/firebaseConfig';

import { COLORS } from 'src/values/colors.js';

const FileDropField = ({ setImagesInForm }) => {
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
          const imageRef = ref(storage, `uploads/${image.name}`);

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
          setImagesInForm([...imageList, ...urls]);
        })
        .catch((error) => {
          console.error('Error uploading files:', error);
        })
        .finally();
    },
    [setImagesInForm]
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
        borderStyle: 'dashed',
        borderColor: '#6B706D',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <div>
              <Stack direction="row" spacing={1} alignItems={'center'} sx={{ cursor: 'pointer' }}>
                <BackupIcon style={{ color: COLORS.lighterGray }} />
                <Typography sx={{ color: COLORS.lighterGray, fontSize: 16 }}>
                  Drop files here to attach or browse
                </Typography>
              </Stack>
            </div>
          )}
        </div>
      }
    </Box>
  );
};

export default FileDropField;
