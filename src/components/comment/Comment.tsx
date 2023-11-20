
import { Avatar, Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { FC } from 'react';

import AddCommentForm from './AddComment';
import CommentUpvoteButton from './CommentUpvoteButton';
import { COLORS } from '../../values/colors';

import { Employee } from 'src/models/EmployeeModel';
import { Comment } from 'src/models/CommentModel';


type CommentProps = {
  issueId: string,
  comment: Comment,
  replies: Comment[],
  employee: Employee,
  setActiveComment: (id: string | null) => void,
  activeComment: string | null,
  addComment: (text: string, parentId: string | null, issueId: string, currentUserId: string) => void,
  parentId?: string | null,
  currentUser: Employee,
  onUpvote: (commentId: string, issueId: string) => void;
  issueStatus: string,
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
  issueStatus
}) => {
    const isReplying = activeComment && activeComment === comment.id;
    const replyId = parentId ? parentId : comment.id;
    const createdAt = new Date(comment.time);

    const day = createdAt.getDate();
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(createdAt);
    const year = createdAt.getFullYear();
    const hour = createdAt.getHours();
    const minute = createdAt.getMinutes();

    const formattedDate = `${day} ${month} ${year}, ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;


  const handleUpvote = (commentId: string, issueId: string) => {
    if (onUpvote) {
      onUpvote(commentId, issueId);
    }
  };

  return (
    <Card variant='outlined' sx={{display: 'flex', alignItems: 'center', p: 2, m: 1, border: 'none', boxShadow: 'none', width: '100%'}}>
      <CardContent sx={{flex: '1 1 auto', ml: 2, display: 'flex', flexDirection: 'column'}} >
        <Stack direction='row' alignItems='center' spacing={2}>
          <Box p={{ xs: '0', sm: '4px' }}>
          <Avatar src={employee.avatar} alt={`${employee.fullName} Photo`} sx={{marginTop: 1}} />
          </Box>
          <Typography variant='h6' sx={{ fontSize: '14px', fontWeight: 'bold', color: COLORS.blue}}>{employee.fullName}</Typography>
          <Typography variant='caption' sx={{ fontSize: '12px'}}>{formattedDate}</Typography>
        </Stack>
        <Typography sx={{ marginTop: 2, fontSize: '12px', color: COLORS.blue, marginLeft: 9 }}>{comment.text}</Typography>
        <div className='comment-action'>
          <Box sx={{ marginLeft: 10 }}>
          <CommentUpvoteButton
            isUpVoted={comment.isUpVoted}
            votes={comment.votes}
            onClick={issueStatus !== 'Closed' ? (() => onUpvote?.(comment.id, issueId)) : undefined as unknown as () => void}
          />
          <Typography variant="caption"
           sx={{ font: 'Inter',
                weight: 500,
                size: '40px',
                lineHeight: '20px',
                color: COLORS.blue,
                width: '38px',
                height: '20px' }}
          >
            •
          </Typography>
          {!comment.parentId &&
          (<Button variant='text'
          onClick={() => setActiveComment(comment.id)}
          sx={{ marginTop: 2,
            cursor: 'pointer',
            textTransform: 'capitalize',
            fontSize: '12px',
            color: COLORS.blue,
           }}
           >
            Reply
          </Button>
          )}
          </Box>
          {isReplying && issueStatus !== 'Closed' && (
            <Box sx={{display: 'flex', alignItems: 'center', width: '110%', height: '-40px'}}>
              <AddCommentForm
                issueId={issueId}
                currentUser={currentUser}
                parentId={parentId}
                picture={currentUser.avatar}
                submitLabel='Reply'
                handleSubmit={(text) => addComment(text,  replyId, issueId, currentUser.id)}
              />
              <Box >
                <Button onClick={() => setActiveComment(null)}
                 sx={{
                  background: 'white',
                  color: '#6B706D',
                  padding: '2px',
                  border: 'none',
                  top: '-14px',
                  right: '15px',
                  fontSize: '16px',
                }}
                >X</Button>
              </Box>
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
