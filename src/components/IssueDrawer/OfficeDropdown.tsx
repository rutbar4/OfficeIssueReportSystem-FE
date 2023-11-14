import React, { useState, useEffect } from 'react';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

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

  const fetchOfficeOptionsFromEndpoint = async () => {
    try {
      const response = await fetch('http://localhost:8080/issue/offices');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
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
            <ListItem key={index} onClick={() => handleOfficeClick(office)}>
              {office.name} , {office.country}
            </ListItem>
          ))}
        </List>
      )}
    </Popover>
  );
};

export default OfficeDropdown;
