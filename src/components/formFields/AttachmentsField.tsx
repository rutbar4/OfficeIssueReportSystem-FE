import {Box} from '@mui/system';
import {Button, Card, CardActions, CardMedia, Stack} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

const AttachmentsField =({imageList})=> {
    return(
        <Box maxWidth={'400px'} maxHeight={'400px'}>
            <Stack direction="row" spacing={2}>
                {
                    imageList.map((url) => (
                        <Card key ={url} sx={{ maxWidth: 150 }} >
                            <CardMedia
                                component="img"
                                alt="issue"
                                height="50"
                                width={'50'}
                                image={url}
                            />
                            <CardActions>
                                <Button size="small">Media</Button>
                                <Button size="small">Download</Button>
                            </CardActions>
                        </Card>
                    ))
                }
            </Stack>


        </Box>
    );
};

AttachmentsField.propTypes = {
    imageList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AttachmentsField;
