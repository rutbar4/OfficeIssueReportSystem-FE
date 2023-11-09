import React from 'react';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import StatusChip from 'src/components/Chip/StatusChip';

const StatusDropdown = ({ statusOptions, anchorEl, onClose, selectedStatus, onStatusChange }) => {
  const handleStatusClick = (status) => {
    onStatusChange(status); // Notify the parent component of the selected status
    onClose(); // Close the dropdown
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
    >
      <List>
        {statusOptions.map((status, index) => (
          <ListItem
            key={index}
            button
            onClick={() => handleStatusClick(status)}
          >
            <StatusChip issueStatus={status} />
          </ListItem>
        ))}
      </List>
    </Popover>
  );
};

export default StatusDropdown;
