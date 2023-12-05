import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { COLORS } from 'src/values/colors.js';

import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { SortParameters } from 'src/models/SortParametersModel';

export default function SortSelectMenu({ setSort }) {
  const sortValues = [
    { label: 'Recently updated first', parameter: '' },
    { label: 'Most votes first', parameter: 'upvoteCount DESC' },
    { label: 'Least votes first', parameter: 'upvoteCount ASC' },
    { label: 'Title name alphabetically', parameter: 'issue_name' },
    { label: 'Most comments first', parameter: 'comment_count DESC' },
    { label: 'Least comments first', parameter: 'comment_count ASC' },
  ];

  const handleUserChange = (event, newValue: SortParameters | null) => {
    setSort(newValue);
  };

  return (
    <Autocomplete
      clearIcon={<CloseIcon style={{ marginTop: 2 }} />}
      popupIcon={<ArrowDropDownIcon style={{ marginTop: 2 }} />}
      disablePortal
      disableClearable
      id="sort-selection"
      options={sortValues}
      defaultValue={{ label: 'Recently updated first', parameter: '' }}
      getOptionLabel={(sortValues: SortParameters) => sortValues.label}
      ListboxProps={{ style: { fontSize: '14px' } }}
      sx={{ width: 250 }}
      size="small"
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{ ...params.InputProps, style: { fontSize: 14, color: COLORS.blue } }}
          InputLabelProps={{ style: { fontSize: '12px' } }}
          placeholder="Sort by:"
          sx={{
            fieldset: {
              borderRadius: '20px',
            },
          }}
        />
      )}
      onChange={handleUserChange}
    />
  );
}
