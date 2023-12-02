import { Grid, IconButton, Paper, Typography} from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';



const FilePreviewElement =({link, fileName,removeUpload})=> {

    const handleDeleteFile = () => removeUpload(link);

    return (

        <Paper variant={'outlined'} square={false} sx={{width:250, height:80}}>
            <Grid container spacing={1}>
                <Grid item xs={3}>
                        <img src={link} style={{height:65, width:65}} alt={'upload'}/>
                </Grid>
                <Grid item xs={3}>
                    <Typography>
                        filename.jpg
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <IconButton onClick={handleDeleteFile}>
                        <CloseIcon/>
                    </IconButton>
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
