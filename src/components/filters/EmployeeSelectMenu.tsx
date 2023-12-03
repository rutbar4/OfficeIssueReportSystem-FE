import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { COLORS } from 'src/values/colors.js';

import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { fetchAllUsers } from 'src/api/UserListApi';
import { User } from 'src/models/BasicUserModel';

export default function EmployeeSelectMenu({ setSelectedUser }) {
  const [users, setUsers] = React.useState<User[]>([]);

  React.useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await fetchAllUsers();
      setUsers(fetchedUsers);
    };

    fetchUsers();
  }, []);

  const handleUserChange = (event, newValue: User | null) => {
    setSelectedUser(newValue);
  };

  return (
      <Autocomplete
        clearIcon={<CloseIcon style={{ marginTop: 2 }}/>}
        popupIcon={<ArrowDropDownIcon style={{ marginTop: 2 }} />}
        disablePortal
        id="employee-selection"
        options={users}
        defaultValue={{ fullName: 'All Employees', id: '' }}
        getOptionLabel={(user: User) => user.fullName}
        ListboxProps={{ style: { fontSize: '14px' } }}
        sx={{ width: 200 }}
        size="small"
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{ ...params.InputProps, style: { fontSize: 14, color: COLORS.blue } }}
            InputLabelProps={{ style: { fontSize: '12px' } }}
            label="Employee"
            placeholder="Employee"
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
