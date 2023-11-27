import * as React from 'react';
import { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { fetchAllOffices } from 'src/api/OfficeApi';
import { Office } from 'src/models/OfficeModel';
import { COLORS } from 'src/values/colors.js';
import { makeStyles } from '@mui/material';

export default function OfficeSelectMenu() {
  //const dummyOffices = [{ officeName: 'Office 1' }, { officeName: 'Office 2' }];

  const [offices, getOffices] = useState<Office[]>([]);
  const [selectedOffice, setOffice] = useState('');

  useEffect(() => {
    const fetchOffices = async () => {
      const fetchedOffices = await fetchAllOffices();
      getOffices(fetchedOffices);
      //console.log(fetchedOffices);
    };

    fetchOffices();
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setOffice(event.target.value);
  };

  //console.log(offices[1].officeName);

  return (
    <FormControl sx={{ m: 1, minWidth: 120, height: 10 }} size="small">
      <InputLabel id="office-selection">All Offices</InputLabel>
      <Select
        labelId="office-select-label"
        id="office-select"
        value={selectedOffice}
        label="All Offices"
        onChange={handleChange}
        sx={{ borderRadius: '20px', color: COLORS.blue }}
      >
        <MenuItem value="">All Offices</MenuItem>
        {offices.map((office) => (
          <MenuItem color="black" key={office.name} value={office.name}>
            {office.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
