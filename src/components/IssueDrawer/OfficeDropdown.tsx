import React, { useState, useEffect } from 'react';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import HTTP from 'src/api';
import Backend from 'src/api/BackendConfig/BackendConfig';
type Office = {
  id: string;
  name: string;
  country: string;
};

const OfficeDropdown = ({ anchorEl, onClose, selectedOffice, onOfficeChange }) => {
  const [officeOptions, setOfficeOptions] = useState<Office[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (anchorEl) {
      fetchOfficeOptionsFromEndpoint()
        .then((options) => {
          setOfficeOptions(options);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching office options:', error);
          setIsLoading(false);
        });
    }
  }, [anchorEl]);
  const apiUrl = `${Backend.backendURL}issue/offices`;
  const fetchOfficeOptionsFromEndpoint = async () => {
    try {
      const response = await HTTP.get(apiUrl);
      if (!response.data) {
        throw new Error('Network response was not ok');
      }
      const data = await response.data;
      return data.map((office) => ({ name: office.name, country: office.country, id: office.id }));
    } catch (error) {
      throw error;
    }
  };

  const handleOfficeClick = (office) => {
    onOfficeChange(office);
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
    >
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <List>
          {officeOptions.map((office, index) => (
            <ListItem
              key={index}
              onClick={() => handleOfficeClick(office)}
              sx={{
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                  fontWeight: '600',
                  cursor: 'pointer',
                },
                color: '#000048',
              }}
            >
              {office.name}, {office.country}
            </ListItem>
          ))}
        </List>
      )}
    </Popover>
  );
};

export default OfficeDropdown;
