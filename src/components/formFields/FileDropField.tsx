import React, {useCallback, useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import Box from '@mui/material/Box';
import {Typography} from '@mui/material';
import BackupIcon from '@mui/icons-material/Backup';
import {ref, uploadBytes, getDownloadURL, listAll, list,} from 'firebase/storage';
import {v4} from 'uuid';

import {storage} from '../../firebase/firebaseConfig';


const FileDropField = () => {

  const [imageUpload, setImageUpload] = useState<File[]>([]);

  const uploadImage = useCallback((acceptedFiles:File[]) => {

    setImageUpload(acceptedFiles);
    console.log('lenght of array:', acceptedFiles.length);

    if (acceptedFiles.length === 0) return;

    for (const image of acceptedFiles){

      console.log('file:', image.name);

      const imageRef = ref(storage, `uploads/${image.name}`);

      uploadBytes(imageRef, image).then(()=> alert('image uploaded')).catch().finally();

    }

  }, [imageUpload]);


  const onDrop = useCallback(acceptedFiles => {
    uploadImage(acceptedFiles);
  }, [uploadImage]);

   const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  return (
    <Box sx={{height:'10rem', width:'850px', maxWidth:'100%', textAlign:'center', position:'relative', borderRadius:'1rem',
      borderWidth:'1px', borderStyle:'dashed', borderColor:'#6B706D'}}
    >
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :<div>
              <BackupIcon/>
              <Typography sx={{color: '#6B706D', fontSize:'14'}}>Drop files to attach or browse</Typography>
            </div>
        }
      </div>
    </Box>
  );
};

export default FileDropField;
