import React from 'react';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import StatusChip from 'src/components/Chip/StatusChip';

const StatusDropdown = ({ statusOptions, anchorEl, onClose, onStatusChange, selectedStatus, setSelectedStatus }) => {
  const handleStatusClick = (status) => {
    setSelectedStatus(status);
    onStatusChange(status);
    onClose();
  };
  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      style={{ minWidth: '600px !important' }}
    >
      <List>
        {statusOptions.map((status, index) => (
          <ListItem
            key={index}
            onClick={() => handleStatusClick(status)}
            sx={{
              '&:hover': {
                backgroundColor: '#f0f0f0',
                cursor: 'pointer',
              },
            }}
          >
            <StatusChip issueStatus={status} />
            {selectedStatus === status && (
              <span
                style={{
                  marginLeft: '125px',
                  color: '#000048',
                  fontWeight: 'bold',
                }}
              >
                ✓
              </span>
            )}
          </ListItem>
        ))}
      </List>
    </Popover>
  );
};

export default StatusDropdown;
