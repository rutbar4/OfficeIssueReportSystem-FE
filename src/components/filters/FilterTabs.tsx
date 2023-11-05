import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IssueCard from 'src/components/Issue';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'src/scss/ModalTabsStyles.scss';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { getIssues } from 'src/actions/issues/IssuesAction';
import { RootState } from 'src/store/store';
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

    const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();

    const issues = useSelector((state: RootState) => state.issues);

    React.useEffect(() => {
        dispatch(getIssues());
    }, [dispatch]);

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
      {issues.loading ? (
        <p>Loading...</p>
      ): ( <div>
        {issues.issues.map((issue) => (
          <IssueCard
          key={issue.id}
          issueId={issue.id}
          issueName={issue.name}
          issueDescription={issue.description}
          issueStatus={issue.status}
          upvoteCount={issue.upvoteCount}
          commentCount={issue.commentCount}
          date={issue.time}
          />
        ))}
      </div>
      )}   
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Open issues
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Planned Issues
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Resolved issues
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        Closed Issues
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        Closed Issues
      </CustomTabPanel>
      <CustomTabPanel value={value} index={6}>
        Reported by Me
      </CustomTabPanel>
    </Box>
  );


}
