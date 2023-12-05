import * as React from 'react';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { fetchAllOffices } from 'src/api/OfficeApi';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Office } from 'src/models/OfficeModel';
import { COLORS } from 'src/values/colors.js';

export default function OfficeSelectMenu({ setOffice, selectedOffice }) {
  const [offices, getOffices] = useState<Office[]>([]);

  useEffect(() => {
    const fetchOffices = async () => {
      const fetchedOffices = await fetchAllOffices();
      const newOffices = [{ name: 'All Offices', id: '' }].concat(fetchedOffices);
      getOffices(newOffices);
    };

    fetchOffices();
  }, []);

  const handleChange = (event, newValue: Office | null) => {
    setOffice(newValue);
  };

  return (
    <Autocomplete
      clearIcon={<CloseIcon style={{ marginTop: 2 }}/>}
      popupIcon={<ArrowDropDownIcon style={{ marginTop: 2 }}/>}
      disablePortal
      size="small"
      id="employee-selection"
      options={offices}
      value={selectedOffice ? selectedOffice : { name: 'All Offices', id: '' }}
      getOptionLabel={(office: Office) => office.name}
      ListboxProps={{ style: { fontSize: '14px' } }}
      sx={{ width: '200px' }}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{ ...params.InputProps, style: { fontSize: '14px', color: COLORS.blue } }}
          InputLabelProps={{ style: { fontSize: '12px' } }}
          label="Office"
          placeholder="Start typing..."
          sx={{
            fieldset: {
              borderRadius: '20px',
              alignContent: 'center',
              alignItems: 'center',
            },
          }}
        />
      )}
      onChange={handleChange}
    />
  );
}
