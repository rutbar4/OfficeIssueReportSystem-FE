import {Box} from '@mui/system';
import {Grid, Stack} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

import FilePreviewElement from './FilePreviewElement';

const AttachmentsField =({imageList, updateImageList})=> {

    const deleteUpload = (url) => {
        const index = imageList.indexOf(url);
        if(index > -1){
            const newImageList=[...imageList];
            newImageList.splice(index);
            updateImageList(newImageList);
        }
    };

    return(

        <Box maxWidth={'800px'} maxHeight={'400px'}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {
                    imageList.map((url) => (
                        <FilePreviewElement
                            key={url}
                            fileName={'file'}
                            link={url}
                            removeUpload={deleteUpload}
                        />
                    ))
                }
            </Grid>


        </Box>
    );
};

AttachmentsField.propTypes = {
    imageList: PropTypes.arrayOf(PropTypes.string).isRequired,
    updateImageList: PropTypes.func.isRequired
};

export default AttachmentsField;
