//display main issue details in a box

//Displayed fields:
// Title

// Reported by

// Reported

// Status (colour specific - view designs)

// Upvotes

// Office
import React from 'react';
import Typography from '@mui/material/Typography';
import StatusChip from 'src/components/Chip/StatusChip';

function MyComponent() {
  return (
    <div>
      <Typography variant="h1">Issue Title</Typography>
      <p>Reported by</p>
      <p>Reported</p>
      <p>Status <StatusChip issueStatus='Open'/></p>
      <p>Upvotes</p>
      <p>Office</p>
    </div>
  );
}

export default MyComponent;
