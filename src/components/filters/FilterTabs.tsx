import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'src/scss/ModalTabsStyles.scss';
import IssueTab from './Tab';
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
        <Box sx={{ p: 3 }}>
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

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);
  

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <ThemeProvider theme={customTabTheme}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab {...a11yProps(0)} label="All issues" />
            <Tab {...a11yProps(1)} label="Open" />
            <Tab {...a11yProps(2)} label="Planned" />
            <Tab {...a11yProps(3)} label="Resolved" />
            <Tab {...a11yProps(5)} label="Closed" />
            <Tab {...a11yProps(6)} label="Reported by me" />
        </Tabs>
       </ThemeProvider>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <IssueTab type={""} email={"sarunas@devbridge.com"}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <IssueTab type={"open"} email={"sarunas@devbridge.com"}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      <IssueTab type={"planned"} email={"sarunas@devbridge.com"}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
      <IssueTab type={"resolved"} email={"sarunas@devbridge.com"}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
      <IssueTab type={"closed"} email={"sarunas@devbridge.com"}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
      <IssueTab type={"user"} email={"sarunas@devbridge.com"}/>
      </CustomTabPanel>
    </Box>
  );


}
