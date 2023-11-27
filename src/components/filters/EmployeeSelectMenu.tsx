import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, SelectChangeEvent, createStyles, makeStyles } from '@mui/material';

import { fetchAllUsers } from 'src/api/UserListApi';
import { User } from 'src/models/BasicUserModel';
import { COLORS } from 'src/values/colors.js';

export default function EmployeeSelectMenu() {
  const [users, getUsers] = React.useState<User[]>([]);
  const [selectedUser, setUser] = React.useState('');

  React.useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await fetchAllUsers();
      getUsers(fetchedUsers);
      //console.log(fetchedUsers);
    };

    fetchUsers();
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setUser(event.target.value);
  };

  return (
    <Autocomplete
      disablePortal
      id="employee-selection"
      options={users}
      getOptionLabel={(user: User) => user.fullName}
      sx={{ p: 1, minWidth: 160, color: COLORS.blue }}
      size="small"
      renderInput={(params) => (
        <TextField
          {...params}
          label="All Employees"
          sx={{
            fieldset: {
              borderRadius: '20px',
              color: COLORS.blue,
            },
          }}
        />
      )}
    />
  );
}
