import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';

import { fetchAllUsers } from 'src/api/UserListApi';
import { User } from 'src/models/BasicUserModel';
import { COLORS } from 'src/values/colors.js';

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
    <>
      <Autocomplete
        disablePortal
        id="employee-selection"
        options={users}
        getOptionLabel={(user: User) => user.fullName}
        sx={{ width: 200,[`&& .${autocompleteClasses.inputRoot}`]: {
          paddingRight: 2
        } }}
        size="small"
        renderInput={(params) => (
          <TextField
            {...params}
            label="All Employees"
            sx={{
              fieldset: {
                borderRadius: '20px',
              },
            }}
          />
        )}
        onChange={handleUserChange}
      />
    </>
  );
}
