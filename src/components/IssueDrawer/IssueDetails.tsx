import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Divider } from '@mui/material';

import UserChip from '../Chip/UserChip';
import UpvoteChip from '../Chip/UpvoteChip';

import StatusChip from 'src/components/Chip/StatusChip';
import Tabs from 'src/components/IssueDrawer/ModalTabs';
const tableStyle = {
  border: 'none',
  fontSize: '14px',
  itemsAllign: 'left',
  padding: '3px',
  overFlow: 'hidden',
  Width: '10px',
};
const firstCellStyle = {
    color: '#B3B3B3',
    width: '170px'
};

interface issueDetailsProps {
  title: string;
  description: string;
  reportedBy: string;
  reported: string;
  status: string;
  upvotes: number;
  office: string;
  issueId: string,
}

function IssueDetails(props: issueDetailsProps) {
 const { title, description, reportedBy, reported, status, upvotes, office, issueId } = props;

  return (
    <Box sx={{ width: '100%', maxWidth: 650, bgcolor: 'background.paper' }}>
      <Typography variant="h1" sx={{color:'#0E166E'}}>{title}</Typography>
      <Divider variant='middle'/>
      <Table sx={{tableLayout:'fixed', width: 650}}>
        <TableBody sx={{border:0}}>
          <TableRow>
            <TableCell style={{...tableStyle, ...firstCellStyle}}>Reported by</TableCell>
            <TableCell style={tableStyle}><UserChip userName={reportedBy} imageLink='https://images.unsplash.com/photo-1585837146751-a44118595680?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2058&q=80'/></TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{...tableStyle, ...firstCellStyle}}>Reported</TableCell>
            <TableCell style={tableStyle}>{reported}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{...tableStyle, ...firstCellStyle}}>Status</TableCell>
            <TableCell style={tableStyle}>
              <StatusChip issueStatus={status} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{...tableStyle, ...firstCellStyle}}>Upvotes</TableCell>
            <TableCell style={tableStyle}><UpvoteChip count={upvotes}/></TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{...tableStyle, ...firstCellStyle}}>Office</TableCell>
            <TableCell style={tableStyle}>{office}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Tabs description={description} issueId={issueId}/>
    </Box>
  );
}

export default IssueDetails;
