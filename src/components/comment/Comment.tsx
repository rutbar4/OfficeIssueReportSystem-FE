import { Avatar, Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import CircleIcon from '@mui/icons-material/Circle';
import SendIcon from '@mui/icons-material/Send';
import { FC } from 'react';

import AddCommentForm from './AddComment';
import CommentUpvoteButton from './CommentUpvoteButton';
import { COLORS } from '../../values/colors';

import { Employee } from 'src/models/EmployeeModel';
import { Comment } from 'src/models/CommentModel';

type CommentProps = {
  issueId: string;
  comment: Comment;
  replies: Comment[];
  employee: Employee;
  setActiveComment: (id: string | null) => void;
  activeComment: string | null;
  addComment: (text: string, parentId: string | null, issueId: string, currentUserId: string) => void;
  parentId?: string | null;
  currentUser: Employee;
  onUpvote: (commentId: string, issueId: string) => void;
  issueStatus: string;
};

const CommentForm: FC<CommentProps> = ({
  issueId,
  comment,
  replies,
  employee,
  setActiveComment,
  activeComment,
  addComment,
  parentId = null,
  currentUser,
  onUpvote,
  issueStatus,
}) => {
  const isReplying = activeComment && activeComment === comment.id;
  const replyId = parentId ? parentId : comment.id;
  const createdAt = new Date(comment.time);

  const day = createdAt.getDate();
  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(createdAt);
  const year = createdAt.getFullYear();
  const hour = createdAt.getHours();
  const minute = createdAt.getMinutes();

  const formattedDate = `${day} ${month} ${year}, ${hour.toString().padStart(2, '0')}:${minute
    .toString()
    .padStart(2, '0')}`;

  const handleUpvote = (commentId: string, issueId: string) => {
    if (onUpvote) {
      onUpvote(commentId, issueId);
    }
  };

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        border: 'none',
        boxShadow: 'none',
        width: '100%',
        paddingBottom: 0,
      }}
    >

      <CardContent
        sx={{
          flex: '1 1 auto',
          ml: 4,
          display: 'flex',
          flexDirection: 'column',
          paddingBottom: 0,
          padding: 0,
          width: '100%',
        }}
      >

        <Stack direction="row" alignItems="center" spacing={2}>
          <Box p={{ xs: '0', sm: '4px' }}>
            <Avatar src={comment.employee.avatar} alt={`${comment.employee.fullName} Photo`} sx={{ marginTop: 1 }} />
          </Box>
          <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: 'bold', color: COLORS.blue }}>
            {comment.employee.fullName}
          </Typography>
          <Typography variant="h6" sx={{ color: COLORS.gray, paddingTop: '2px' }}>
            {formattedDate}
          </Typography>
        </Stack>
        <Typography variant="h6" sx={{ marginTop: '-8px', marginBottom: 1, color: COLORS.blue, marginLeft: 8 }}>
          {comment.text}
        </Typography>
        <div>
          <Box sx={{ marginLeft: 9, display: 'flex', alignItems: 'center' }}>
            <CommentUpvoteButton
              isUpVoted={comment.isUpVoted}
              votes={comment.votes}
              onClick={issueStatus !== 'Closed' ? () => onUpvote?.(comment.id, issueId) : () => {}}
            />

            {!comment.parentId && issueStatus !== 'Closed' && (
              <CircleIcon style={{ fontSize: '5px', color: COLORS.blue, marginLeft: 6, marginRight: 0 }} />
            )}
            {!comment.parentId && issueStatus !== 'Closed' && (
              <Button
                variant="text"
                onClick={() => (isReplying ? setActiveComment(null) : setActiveComment(comment.id))}
                sx={{
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  fontSize: '12px',
                  color: COLORS.blue,
                  borderRadius: '17px',
                  maxHeight: '24px',
                  marginLeft: '-2px',
                }}
              >
                Reply
              </Button>
            )}

          </Box>
          {isReplying && issueStatus !== 'Closed' && (
            <Box sx={{ display: 'flex', marginLeft: '20px' }}>
              <AddCommentForm
                issueId={issueId}
                currentUser={currentUser}
                parentId={parentId}
                picture={currentUser.avatar}
                submitLabel="Reply"
                handleSubmit={(text) => addComment(text, replyId, issueId, currentUser.id)}
                fieldWidth="350px"
              />
            </Box>
          )}
          {replies.length > 0 && (
            <Box>
              {replies.map((reply) => (
                <CommentForm
                  key={reply.id}
                  issueId={issueId}
                  comment={reply}
                  setActiveComment={setActiveComment}
                  activeComment={activeComment}
                  addComment={addComment}
                  parentId={comment.id}
                  replies={[]}
                  currentUser={currentUser}
                  employee={employee}
                  onUpvote={() => handleUpvote(reply.id, issueId)}
                  issueStatus={issueStatus}
                />
              ))}
            </Box>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CommentForm;
