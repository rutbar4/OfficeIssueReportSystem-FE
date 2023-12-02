import { FC, useRef, useState } from 'react';
import { Box, CardContent, TextField, Avatar, withStyles, makeStyles, styled, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import { Employee } from 'src/models/EmployeeModel';
import { COLORS } from 'src/values/colors.js';

type AddCommentProps = {
  picture: string;
  issueId: string;
  currentUser: Employee;
  parentId: string | null;
  handleSubmit: (text: string, parentId: string | null, issueId: string, currentUserId: string) => void;
  submitLabel: string;
  initialText?: string;
  fieldWidth: any;
};

const AddCommentForm: FC<AddCommentProps> = ({
  picture,
  issueId,
  currentUser,
  parentId,
  handleSubmit,
  initialText = '',
  fieldWidth,
}) => {
  const [text, setText] = useState(initialText);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSubmit(text, parentId, issueId, currentUser.id);
    setText('');
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onSubmit(event as React.FormEvent);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        border: 'none',
        width: '100%',
      }}
    >
      <Avatar src={picture} alt={`${picture} Photo`} sx={{ width: 40, height: 40, marginLeft: 2, marginTop: -1 }} />
      <CardContent>
        <form onSubmit={onSubmit}>
          <div style={{ display: 'flex' }}>
            <div style={{ paddingRight: '7px', width: fieldWidth }}>
              <TextField
                fullWidth
                multiline
                placeholder="Add comment..."
                InputProps={{
                  sx: {
                    '&.Mui-focused fieldset': {
                      borderColor: COLORS.blue + ' !important',
                      borderWidth: '2px !important',
                    },
                    borderRadius: '8px',
                    borderColor: COLORS.lighterGray,
                    outlineColor: COLORS.blue,
                    color: COLORS.blue,
                    fontSize: '12px',
                  },
                }}
                InputLabelProps={{ shrink: false }}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            <Button type="submit" sx={{}}>
              <SendIcon sx={{ color: COLORS.blue, width: 20, height: 20 }} />
            </Button>
          </div>
        </form>
      </CardContent>
    </Box>
  );
};

export default AddCommentForm;
