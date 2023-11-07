import {  FC, useState } from 'react';
import { Box, Card, CardContent, TextField, Button, Avatar } from '@mui/material';
import { UUID } from 'crypto';

type AddCommentProps = {
  picture: string,
  issueId: UUID,
  currentUserId: UUID,
  parentId: UUID | null
  handleSubmit: (issueId: UUID, currentUserId: UUID, text: string, parentId: UUID | null) => void,

              //issueId: UUID, currentUserId: UUID, text: string, parentId: UUID | null
  submitLabel: string,
  initialText?: string,
};

const AddCommentForm: FC<AddCommentProps> = ({
  picture,
  issueId,
  currentUserId,
  parentId,
  handleSubmit,
  submitLabel,
  initialText = '',
}) => {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSubmit(issueId, currentUserId, text, parentId);
    setText('');
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onSubmit(event as React.FormEvent);
    }
  };

  return (
    <Card variant="outlined">
      <Box p={{ xs: '0', sm: '4px' }}>
       <Avatar src={picture} alt={`${picture} Photo`} sx={{marginTop: -8}} />
      </Box>
      <CardContent>
        <form onSubmit={onSubmit}>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            label="Your Comment"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          {/* <Box mt={2} display="flex" justifyContent="flex-end">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isTextareaDisabled}
            >
              {submitLabel}
            </Button>
          </Box> */}
        </form>
      </CardContent>
    </Card>
  );
};

export default AddCommentForm;
