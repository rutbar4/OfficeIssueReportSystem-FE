import {Box} from '@mui/system';
import {Stack} from '@mui/material';
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

        <Box maxWidth={'400px'} maxHeight={'400px'}>
            <Stack direction="row" spacing={2}>
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
            </Stack>


        </Box>
    );
};

AttachmentsField.propTypes = {
    imageList: PropTypes.arrayOf(PropTypes.string).isRequired,
    updateImageList: PropTypes.func.isRequired
};

export default AttachmentsField;
