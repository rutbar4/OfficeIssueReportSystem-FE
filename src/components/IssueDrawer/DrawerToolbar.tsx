import 'src/scss/DeleteIssueStyles.scss';

import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, IconButton, Typography } from '@mui/material';

import DeleteModule from './DeleteModule';

interface issueDetailsProps {
  issueID: string;
  title: string;
  wrapperSetDaitailsOpen: any;
}
export default function DrawerToolbar(props: issueDetailsProps) {
  const { issueID, title, wrapperSetDaitailsOpen } = props;

  const [isDropdownOpen, setIsPopupOpen] = useState(false);

  const toggleDeletePopup = () => {
    setIsPopupOpen(!isDropdownOpen);
  };

  const PopupRef = useRef(null);

  const useClickOutside = (ref) => {
    const handleClick = (e) => {
      if (isDropdownOpen) {
        setIsPopupOpen(false);
      }
    };

    useEffect(() => {
      document.addEventListener('mousedown', handleClick);
      return () => {
        document.removeEventListener('mousedown', handleClick);
      };
    });
  };

  return (
    <Toolbar sx={{ justifyContent: 'flex-end' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          p: 1,
        }}
      >
        <Box>
          <IconButton>
            <OpenInFullIcon fontSize="large" />
          </IconButton>
        </Box>
        <Box>
          <IconButton onClick={toggleDeletePopup}>
            <MoreVertIcon fontSize="large" />
          </IconButton>
          {isDropdownOpen && (
            <div ref={PopupRef} className="Icona">
              <DeleteModule id={issueID} title={title} />
            </div>
          )}
        </Box>
        <Box>
          <IconButton onClick={() => wrapperSetDaitailsOpen(false)}>
            <CloseIcon fontSize="large" />
          </IconButton>
        </Box>
      </Box>
    </Toolbar>
  );
}
