import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import 'src/scss/ModalTabsStyles.scss';
import { useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IssueTab from './Tab';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

import { RootState } from 'src/store/store';
import EmployeeSelectMenu from 'src/components/filters/EmployeeSelectMenu';
import OfficeSelectMenu from 'src/components/filters/OfficeSelectMenu';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Office } from 'src/models/OfficeModel';
import { User } from 'src/models/BasicUserModel';
import { SortParameters } from 'src/models/SortParametersModel';
import { Grid } from '@mui/material';
import SortSelectMenu from './SortSelectMenu';
import { COLORS } from 'src/values/colors.js';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const customTabTheme = createTheme({
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          fontWeight: 400,
          lineHeight: '24px',
          letterSpacing: '0em',
          textAlign: 'left',
          textTransform: 'none',
          color: '#000048',
          '&.Mui-selected': {
            fontWeight: 600,
            color: '#000048',
          },
        },
      },
    },
  },
});

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// eslint-disable-next-line react/no-multi-comp
export default function BasicTabs() {
  const [selectedOffice, setOffice] = React.useState<Office | null>(null);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [sort, setSort] = React.useState<SortParameters | null>(null);
  const [value, setValue] = React.useState(0);
  const [search, setSearch] = React.useState<String | null>(null);
  const userID = useSelector((state: RootState) => state.user.user?.id) || 'null';
  const refreshKey = useSelector((state: RootState) => state.refresh);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    setValue(0);
    setOffice(null);
    setSelectedUser(null);
  }, [refreshKey]);

  return (
    <>
      <Box sx={{ width: '100%' }} key={refreshKey}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <ThemeProvider theme={customTabTheme}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              TabIndicatorProps={{
                style: {
                  backgroundColor: COLORS.cyan,
                  height: '3px',
                },
              }}
            >
              <Tab {...a11yProps(0)} label="All issues" />
              <Tab {...a11yProps(1)} label="Open" />
              <Tab {...a11yProps(2)} label="Planned" />
              <Tab {...a11yProps(3)} label="Resolved" />
              <Tab {...a11yProps(5)} label="Closed" />
              <Tab {...a11yProps(6)} label="Reported by me" />
            </Tabs>
          </ThemeProvider>
        </Box>
        <Grid container sx={{ display: 'flex', marginTop: '15px', paddingBottom: '20px' }} spacing={2}>
          <Grid item>
            <OfficeSelectMenu setOffice={setOffice} />
          </Grid>
          <Grid item>
            <EmployeeSelectMenu setSelectedUser={setSelectedUser} />
          </Grid>
          <Grid item sx={{ marginLeft: 'auto' }}>
            <Grid container spacing={2} sx={{ alignContent: 'center', alignItems: 'center' }}>
              <Grid item>
                <div>Sort by:</div>
              </Grid>
              <Grid item>
                <SortSelectMenu setSort={setSort} />
              </Grid>
              <Grid item>
                <TextField
                  id="outlined-basic"
                  placeholder="Search"
                  variant="outlined"
                  size="small"
                  sx={{
                    input: { color: COLORS.blue, fontSize: '14px' },
                    placeholder: { fontSize: '14px', color: COLORS.blue },
                    fieldset: {
                      borderRadius: '30px',
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  onKeyUp={handleSearch}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <CustomTabPanel value={value} index={0}>
          <IssueTab
            type={null}
            userID={userID}
            officeId={selectedOffice?.id}
            userId={selectedUser?.id}
            sortParam={sort?.parameter}
            searchValue={search}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <IssueTab
            type={'open'}
            userID={userID}
            officeId={selectedOffice?.id}
            userId={selectedUser?.id}
            sortParam={sort?.parameter}
            searchValue={search}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <IssueTab
            type={'planned'}
            userID={userID}
            officeId={selectedOffice?.id}
            userId={selectedUser?.id}
            sortParam={sort?.parameter}
            searchValue={search}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <IssueTab
            type={'resolved'}
            userID={userID}
            officeId={selectedOffice?.id}
            userId={selectedUser?.id}
            sortParam={sort?.parameter}
            searchValue={search}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <IssueTab
            type={'closed'}
            userID={userID}
            officeId={selectedOffice?.id}
            userId={selectedUser?.id}
            sortParam={sort?.parameter}
            searchValue={search}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>
          <IssueTab
            type={'user'}
            userID={userID}
            officeId={selectedOffice?.id}
            userId={selectedUser?.id}
            sortParam={sort?.parameter}
            searchValue={search}
          />
        </CustomTabPanel>
      </Box>
    </>
  );
}
