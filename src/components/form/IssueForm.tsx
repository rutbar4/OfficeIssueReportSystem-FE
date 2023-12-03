import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import * as Yup from 'yup';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import {
    Alert,
    Button,
    CircularProgress,
    FormControl, FormHelperText,
    MenuItem,
    Select,
    Stack
} from '@mui/material';
import {useEffect, useState} from 'react';
import {ErrorMessage, Field, Formik} from 'formik';
import {Editor} from '@tinymce/tinymce-react';
import {useSelector} from 'react-redux';

import StyledButton from '../StyledButton/StyledButton';
import {Office} from '../../models/OfficeModel';
import {fetchAllOffices} from '../../api/OfficeApi';
import {saveIssue} from '../../api/issueAPI';
import FileDropField from '../formFields/FileDropField';
import {RootState} from '../../store/store';
import {COLORS} from '../../values/colors';
import StyledTextField from '../formFields/StyledTextField';
import AttachmentsField from '../formFields/AttachmentsField';
import MiniDropZone from '../formFields/MiniDropZone';

const issueValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(5, 'minimal short summary size is 10 letters')
        .max(150, 'maximal short summary size is 150 letters')
        .required('short summary is required'),
    description: Yup.string()
        .min(10, 'minimal description size is 10 letters')
        .max(250, 'maximal short summary size is 150 letters')
        .required('Description is required'),
    office: Yup.string().required('Office select is required'),
});

const FlexContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const labelColor = { color: '#6B706D' };

const IssueForm = ({ open, close }) => {
    const [officesLoading, setOfficesLoading] = useState(true);
    const [offices, setOffices] = useState<Office[]>([]);
    const [showError, setError] = useState('');
    const user = useSelector((state:RootState) => state.user.user);
    const [description, setDescription] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [imageList, setImageList]= useState<string []>([]);

    useEffect(() => {
        fetchAllOffices()
            .then((offices) => setOffices(offices))
            .catch((err) => setError(err))
            .finally(() => setOfficesLoading(false));
    }, []);

       const onSaveIssue = (values: { name: any; description: any; office: any; attachments: any; }, helpers: { resetForm: () => void; setSubmitting: (arg0: boolean) => void; }) => {
        console.log('values:',values);
        console.log('images:', imageList);
        saveIssue({
            name: values.name,
            description: values.description,
            officeId:offices.find((o) => o.name === values.office)?.id,
            employeeId: user?.id,
            images: imageList
        })
            .then((response) => {
                helpers.resetForm();
                close();
            })
            .catch(({ response }) => setError(response.data.message))
            .finally(() => {helpers.setSubmitting(false);
                ;});
    };

        const validateDescription = (value) => {
            const text = value.replace(/<\/?p>/g, '')
                    .replace(/<\/?li>/g, '')
                .replace(/<\/?ul>/g, '');
            console.log(text);
            const length = text.trim().length;
            console.log(length);
            if (!text || text.trim() === '') {
                setDescriptionError('Description is required');
                console.log(descriptionError);
            }
            if (length < 20 || length > 250) {
                setDescriptionError('Description must be between 20 and 250 characters');
                console.log(descriptionError);
            }else{ setDescriptionError('');
                console.log('no error');}
        };

    return(
        <>
             <Formik
                initialValues={{
                    name: '',
                    description: '',
                    office: user?.office.name,
                    attachments: ''
                }}
                onSubmit={onSaveIssue}
                validationSchema={issueValidationSchema}
             >

                { ({values, errors, touched, handleChange, handleSubmit, handleBlur, isSubmitting, setFieldValue, resetForm}) => (
                    <form onSubmit={handleSubmit} id={'issueForm'} >
                        {
                            <BootstrapDialog onClose={close} aria-labelledby="customized-dialog-title" open={open} fullWidth={true} maxWidth={'md'}  >
                                <DialogTitle variant='h4' sx={{ m: 3, p: 2, mb: 0}} id="customized-dialog-title">
                                    <Typography variant="h4" gutterBottom sx={{ color: 'var(--primary-color)' }}>
                                        Report issue
                                    </Typography>
                                    { showError && <Alert severity="error" sx={{fontSize: '14px'}}>{showError}</Alert> }
                                </DialogTitle>
                                <IconButton
                                    aria-label="close"
                                    onClick={close}
                                    sx={{
                                        position: 'absolute',
                                        right: 8,
                                        top: 8,
                                        color: (theme) => theme.palette.grey[500],
                                    }}
                                >
                                    <CloseIcon />
                                </IconButton>
                                <DialogContent sx={{ width: '94%', height: '850px', mt:0, mb: 3, ml: 3, mr: 3,  p: 2  }}>
                                    <Stack spacing={2} direction="column">
                                        <Typography variant="h5" style={{ color: 'grey', paddingBottom: '5px' }}>
                                            Short description
                                        </Typography>
                                        <StyledTextField
                                            error={touched.name && !!errors.name}
                                            errorMessage="Short description must between 5 and 150 symbols."
                                            id="name"
                                            name="name"
                                            type="text"
                                        />

                                        <Typography variant="h5" style={{ color: 'grey', paddingBottom: '5px' }}>
                                            Description
                                        </Typography>
                                        <FormControl>
                                        <Field name='description'
                                               error={touched.description && !!errors.description}
                                        >
                                            {({ field, meta }) => (
                                                <div>
                                                    <Editor
                                                        id='article_body'
                                                        apiKey='t3fy06mhh684wsiszfxq9iy61vn9kbe5gx98l8vynn7617hx'
                                                        initialValue=''
                                                        init={{
                                                            menubar: false,
                                                            plugins: 'list code hr',
                                                            toolbar: 'bold italic strikethrough bullist numlist ',
                                                            validate_children : true,
                                                            height: '350px'
                                                        }}
                                                        onEditorChange={(e) => {
                                                            handleChange({target:{name:'description', value: e}});
                                                            validateDescription(e);
                                                        }}
                                                        textareaName='description'
                                                        onChange={field.onChange}
                                                        onBlur={field.onBlur}
                                                        value={values.description}
                                                    />
                                                </div>)}
                                        </Field>
                                            { descriptionError ?  <Typography style={{ color: 'red', paddingTop: '1rem', fontSize: '14px' }} >
                                                 {descriptionError}
                                            </Typography> : <></>  }


                                        </FormControl>

                                        <Typography variant="h5" style={{ color: 'grey', paddingBottom: '5px' }}>
                                            Office
                                        </Typography>
                                        {  officesLoading ? <CircularProgress/> : <FormControl   >
                                            <Field
                                                error={touched.office && !!errors.office}
                                                id={'office'}
                                                name={'office'}
                                                as={Select}
                                                style={{
                                                    width: '300px',
                                                    fontSize: '14px',
                                                    paddingLeft: '3px',
                                                    height: '40px',
                                                    color: COLORS.blue,
                                                    borderRadius: '6px',
                                                    borderColor: COLORS.lighterGray,
                                                    outlineColor: COLORS.blue,
                                                    outlineWidth: '4px',
                                                    boxShadow: 'none'
                                                }}
                                                onChange={event => setFieldValue('office', event.target.value)
                                                }
                                            >
                                                {offices.map((o) =>
                                                    <MenuItem key={o.id} value={o.name}>{o.name}</MenuItem>
                                                )}
                                            </Field>
                                            <ErrorMessage name={'office'} component={FormHelperText}>
                                                {(msg) => <div style={{ color: 'red', paddingTop: '1rem' }}> Office is required </div>}
                                            </ErrorMessage>
                                        </FormControl>   }

                                        <Divider />

                                      <FlexContainer sx={{display:'flex', paddingBottom:'15px'}}>
                                        <Typography variant="h5" style={{ color: 'grey', paddingBottom: '5px' }}>
                                          Attachments
                                        </Typography>
                                        {
                                          imageList.length ===0 ? <></> :
                                            <MiniDropZone imageListF={imageList} setImagesInForm={setImageList}/>
                                        }
                                      </FlexContainer>

                                       <div style={{paddingTop:'10px'}}>
                                           {
                                               imageList.length===0 ?  <FileDropField setImagesInForm={setImageList}/> :
                                                   <AttachmentsField imageList={imageList} updateImageList={setImageList}/>
                                           }
                                       </div>

                                    </Stack>
                                </DialogContent>
                                <Divider />
                                <DialogActions sx={{ marginRight: '3%' }}>
                                    {isSubmitting ? (
                                        <CircularProgress />
                                    ) : (
                                        <div >
                                            <StyledButton buttonSize={'medium'} buttonType={'secondary'} type={'button'} onClick={close} >
                                                Cancel
                                            </StyledButton>
                                            <Button
                                                sx={{ backgroundColor: COLORS.blue,
                                                    width: '158px',
                                                    height: '38px',
                                                    fontSize: '14px',
                                                    textTransform: 'none',
                                                    borderRadius: '30px',
                                                    color: 'white',
                                                  '&:hover': {
                                                    backgroundColor: COLORS.blue
                                                  }}}
                                                type={'submit'} form={'issueForm'}
                                            >
                                                Report issue
                                            </Button>
                                        </div>
                                    )}
                                </DialogActions>
                            </BootstrapDialog>
                        }
                    </form>
                )}
            </Formik>
        </>
    );
};

export default IssueForm;
