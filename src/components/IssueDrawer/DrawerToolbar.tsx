import 'src/scss/DeleteIssueStyles.scss';

import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from '@mui/material';
import { useSelector } from 'react-redux';

import DeleteModule from './DeleteModule';

import { RootState } from 'src/store/store';

interface issueDetailsProps {
  issueId: string;
  title: string;
  wrapperSetDaitailsOpen: any;
  employeeId: string;
}
type role =
  | {
      value: string;
    }
  | string;
export default function DrawerToolbar(props: issueDetailsProps) {
  const { issueId, title, wrapperSetDaitailsOpen, employeeId } = props;

  const [isDropdownOpen, setIsPopupOpen] = useState(false);

  const toggleDeletePopup = () => {
    if (isAdmin || employeeId === user?.id) {
      setIsPopupOpen(!isDropdownOpen);
    }
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
  const user = useSelector((state: RootState) => state.user.user);
  const isAdmin = (user?.roles as role[])?.includes('ADMIN') || false;
  return (
    <Toolbar sx={{ justifyContent: 'flex-end' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          p: 1,
        }}
      >
        {(isAdmin || user?.id === employeeId) && (
          <Box>
            <IconButton onClick={toggleDeletePopup}>
              <MoreVertIcon fontSize="large" />
            </IconButton>
            {isDropdownOpen && (
              <div ref={PopupRef} className="Icona">
                <DeleteModule id={issueId} title={title} />
              </div>
            )}
          </Box>
        )}
        <Box>
          <IconButton onClick={() => wrapperSetDaitailsOpen(false)}>
            <CloseIcon fontSize="large" />
          </IconButton>
        </Box>
      </Box>
    </Toolbar>
  );
}
