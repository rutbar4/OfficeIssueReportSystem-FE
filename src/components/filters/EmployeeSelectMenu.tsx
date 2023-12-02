import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

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
    <>
      <Autocomplete
        clearIcon={<div style={{ marginTop: 14 }} />} 
        disablePortal
        id="employee-selection"
        options={users}
        defaultValue={{ fullName: 'All Employees', id: '' }}
        getOptionLabel={(user: User) => user.fullName}
        sx={{ width: 200 }}
        size="small"
        renderInput={(params) => (
          <TextField
            {...params}
            label="Employee:"
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
    </>
  );
}
