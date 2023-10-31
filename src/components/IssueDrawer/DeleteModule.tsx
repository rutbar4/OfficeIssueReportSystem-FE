import 'src/scss/DeleteIssueStyles.scss';

import * as React from 'react';
import clsx from 'clsx';
import { styled, Box } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import { IconButton, Typography, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { deleteIssueById } from '../../api/IssueDeleteApi';

export default function ModalUnstyled({ id, title }: { id: string; title: string }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDelete = async () => {
    try {
      await deleteIssueById(id);
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error('Failed to delete the issue:', error);
    }
  };
  return (
    <div>
      <TriggerButton type="button" onClick={handleOpen} className="trigger-button">
        <Typography className="popup">Delete Issue</Typography>
      </TriggerButton>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        disableAutoFocus
        disableEnforceFocus
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={style}>
          <div className="modal-header">
            <IconButton className="icon" onClick={handleClose}>
              <CloseIcon fontSize="large" />
            </IconButton>
          </div>
          <div style={{ position: 'relative', top: '-25px', left: 40 }}>
            <div>
              <h3 id="unstyled-modal-title" className="modal-title">
                <Typography className="title">Delete issue</Typography>
              </h3>
            </div>
          </div>
          <div className="desc-wrap">
            <p id="unstyled-modal-description" className="modal-description">
              <Typography className="description">
                Are you sure you want to delete issue<span style={{ fontWeight: 700 }}> ‘{title}’ </span>? Item will be
                deleted permanently and cannot be restored.
              </Typography>
            </p>
          </div>
          <div className="modal-footer">
            <Button onClick={handleClose} variant="outlined" className="cancel-button">
              <Typography className="cancel">Cancel</Typography>
            </Button>
            <Button variant="contained" color="error" className="delete-button" onClick={handleDelete}>
              <Typography className="delete-issue">Delete Issue</Typography>
            </Button>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}

const Backdrop = React.forwardRef<HTMLDivElement, { open?: boolean; className: string }>((props, ref) => {
  const { open, className, ...other } = props;
  return <div className={clsx({ 'MuiBackdrop-open': open }, className)} ref={ref} {...other} />;
});

const blue = {
  200: '#99CCFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0066CC',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 600,
};

const ModalContent = styled(Box)(
  ({ theme }) => `
  display: flex;
  height:316px;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
  background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#FFF'};
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 4px 12px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.20)'};
  padding: 1rem;
  color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 500;
  text-align: start;
  position: relative;

& .modal-header {
  display: flex;
  height:50px;
  align-items: center;
  position: relative;
}


& .modal-header .icon {
  position: absolute;
  top: 0;
  right: 0;
  color: #000048;
}

  & .modal-footer {
    width: 600px;
    height: 72px;
    bottom: 0;
    left: 0;
    padding: 16px 24px;
    border-radius: 0 0 12px 12px;
    border: 1px solid transparent;
    border-top: 1px solid #ccc;
    gap: 8px;
    display: flex;
    position: absolute;
    justify-content: flex-end;
    align-items: center;
  }

  & .modal-title {
    margin: 0;
    font-family: 'Inter, sans-serif !important',
    line-height: 32px;
    letter-spacing: 0em;
  }

  & .modal-description {
    margin: 0;
    line-height: 1.5rem;
    font-weight: 400;
    color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
  }
  `
);

const TriggerButton = styled('button')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &:active {
    background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
    outline: none;
  }
`
);
