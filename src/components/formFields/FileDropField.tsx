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

  const [imageList, setImageList] = useState<string []>([]);

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
        })
        .catch((error) => {
          console.error('Error uploading files:', error);
        });
  }, []);

  const onDrop = useCallback(acceptedFiles => {
    uploadImage(acceptedFiles);
  }, [uploadImage]);

   const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  return (
    <Box sx={{height:'10rem', width:'850px', maxWidth:'100%', textAlign:'center', position:'relative', borderRadius:'1rem',
      borderWidth:'1px', borderStyle:'dashed', borderColor:'#6B706D'}}
    >
      {
        imageList.length ===0 ?  <div {...getRootProps()}>
              <input {...getInputProps()} />
              {
                isDragActive ?
                    <p>Drop the files here ...</p> :<div>
                      <BackupIcon/>
                      <Typography sx={{color: '#6B706D', fontSize:'14'}}>Drop files to attach or browse</Typography>
                    </div>
              }
            </div> : <div>
          {
            imageList.map((url) => {
              return <img key={url} src={url} alt={''}/>;
            })
          }
        </div>
      }
    </Box>
  );
};

export default FileDropField;
