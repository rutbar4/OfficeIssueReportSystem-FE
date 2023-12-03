import React, {useCallback, useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import Box from '@mui/material/Box';
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from '@mui/material';
import BackupIcon from '@mui/icons-material/Backup';
import {ref, uploadBytes, getDownloadURL, listAll, list,} from 'firebase/storage';
import {v4} from 'uuid';

import {storage} from '../../firebase/firebaseConfig';


const MiniDropZone = ({imageListF, setImagesInForm}) => {

  const [imageUpload, setImageUpload] = useState<File[]>([]);

  const [imageList, setImageList] = useState<string []>(imageListF);

  const uploadImage = useCallback((acceptedFiles: File[]) => {
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
        setImagesInForm((imageListF) => [...imageListF, ...urls]);
      })
      .catch((error) => {
        console.error('Error uploading files:', error);
      }).finally();
  }, [setImagesInForm]);

  const onDrop = useCallback(acceptedFiles => {
    uploadImage(acceptedFiles);
  }, [uploadImage]);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  return (
    <Box sx={{height:'5px', width:'100px', maxWidth:'100%', textAlign:'center', position:'relative'}}
    >
      {
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p>Upload file.</p> :<div>
                <BackupIcon/>
                <Typography sx={{color: '#6B706D', fontSize:'14'}}>Upload File</Typography>
              </div>
          }
        </div>
      }
    </Box>
  );
};

export default MiniDropZone;
