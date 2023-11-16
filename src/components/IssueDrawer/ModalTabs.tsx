import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'src/scss/ModalTabsStyles.scss';
import { useSelector } from 'react-redux';

import  Comments  from '../comment/Comments';

import { Comment } from 'src/models/CommentModel';
import { RootState } from 'src/store/store';
import { Employee } from 'src/models/EmployeeModel';
import { getAllCommentsApi } from 'src/api/CommentApi';


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


export default function BasicTabs({ description, issueId }: { description: string, issueId: string }) {
  const [value, setValue] = React.useState(0);
  const [comments, setComments] = React.useState<Comment[]>([]);


  React.useEffect(() => {
    getAllCommentsApi(issueId).then((data) => {
      setComments(data);
    });
  }, [issueId]);

  const updateComments = (newComments: Comment[]) => {
    setComments(newComments);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const user = useSelector((state: RootState) => state.user.user);
  const currentUser: Employee = {
    id: user?.id || '',
    fullName: user?.fullName || '',
    avatar: user?.avatar || '',
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <ThemeProvider theme={customTabTheme}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab {...a11yProps(0)} label="Details" />
            <Tab {...a11yProps(1)} label={`Comments (${comments.length})`}/>
            <Tab {...a11yProps(2)} label="Activity log" />
        </Tabs>
       </ThemeProvider>
      </Box>
      <CustomTabPanel value={value} index={0}>
       <Typography className="Description">
         Description
       </Typography>
       <Typography className="ActualDescription">
        {description}
       </Typography>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Comments issueId={issueId}
          currentUser={currentUser}
          issueComments={comments}
          updateComments={updateComments}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Busimi Logai
      </CustomTabPanel>
    </Box>
  );
}

