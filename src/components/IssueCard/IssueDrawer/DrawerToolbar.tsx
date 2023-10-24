import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from '@mui/material';

export default function DrawerToolbar({ wrapperSetDaitailsOpen }) {
  return (
    <Toolbar sx={{ justifyContent: 'flex-end' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          p: 1,
        }}
      >
        <Box>
          <IconButton>
            <OpenInFullIcon fontSize="large" />
          </IconButton>
        </Box>
        <Box>
          <IconButton>
            <MoreVertIcon fontSize="large" />
          </IconButton>
        </Box>
        <Box>
          <IconButton onClick={() => wrapperSetDaitailsOpen(false)}>
            <CloseIcon fontSize="large" />
          </IconButton>
        </Box>
      </Box>
    </Toolbar>
  );
}
