import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import Box from '@mui/material/Box';
import {Typography} from '@mui/material';
import BackupIcon from '@mui/icons-material/Backup';

const FileDropField = () => {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, []);
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
