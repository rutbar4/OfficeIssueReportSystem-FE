import * as React from 'react';
import { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';

import { fetchAllOffices } from 'src/api/OfficeApi';
import { Office } from 'src/models/OfficeModel';
import { COLORS } from 'src/values/colors.js';

export default function OfficeSelectMenu({ setOffice }) {
  const [offices, getOffices] = useState<Office[]>([]);

  useEffect(() => {
    const fetchOffices = async () => {
      const fetchedOffices = await fetchAllOffices();
      getOffices(fetchedOffices);
    };

    fetchOffices();
  }, []);

  const handleChange = (event, newValue: Office | null) => {
    setOffice(newValue);
  };

  return (
    <Autocomplete
      disablePortal
      id="employee-selection"
      options={offices}
      defaultValue={{ name: 'All Offices', id: '' }}
      getOptionLabel={(office: Office) => office.name}
      sx={{ width: 200 }}
      size="small"
      renderInput={(params) => (
        <TextField
          {...params}
          label="Office:"
          placeholder="Office"
          sx={{
            fieldset: {
              borderRadius: '20px',
            },
          }}
        />
      )}
      onChange={handleChange}
    />
  );
}
