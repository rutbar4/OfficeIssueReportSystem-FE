
import { Avatar, Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { FC } from 'react';

import AddCommentForm from './AddComment';
import CommentUpvoteButton from './CommentUpvoteButton';

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
      <Box p={{ xs: '0', sm: '4px' }}>
       <Avatar src={employee.avatar} alt={`${employee.fullName} Photo`} sx={{marginTop: -8}} />
      </Box>
      <CardContent sx={{flex: '1 1 auto', ml: 2, display: 'flex', flexDirection: 'column'}} >
        <Stack direction='row' alignItems='center' spacing={2}>
          <Typography variant='h6' sx={{ fontSize: '14px', fontWeight: 'bold', color: '#000048' }}>{employee.fullName}</Typography>
          <Typography variant='caption' sx={{ fontSize: '12px' }}>{formattedDate}</Typography>
        </Stack>
        <Typography sx={{ marginTop: 2, fontSize: '12px', color: '#000048'}}>{comment.text}</Typography>
        <div className='comment-action'>
          <CommentUpvoteButton
            isUpVoted={comment.isUpVoted}
            votes={comment.votes}
            onClick={() => onUpvote?.(comment.id, issueId)}
          />
          <Typography variant="caption" sx={{ font: 'Inter',
          weight: 500, size: '40px', lineHeight: '20px',
           color: '#000048', width: '38px', height: '20px' }}>
            •
          </Typography>
          <Button variant='text'
          onClick={() => setActiveComment(comment.id)}
          sx={{ marginTop: 2, cursor: 'pointer',
          textTransform: 'capitalize',
           fontSize: '12px', color: '#000048'}}
          >
            Reply
          </Button>
          {isReplying && (
            <Box sx={{display: 'flex', alignItems: 'center', width: '110%', height: '-40px'}}>
            <AddCommentForm
            issueId={issueId}
            currentUser={currentUser}
            parentId={parentId}
            picture={currentUser.avatar}
            submitLabel='Reply'
            handleSubmit={(text) => addComment(text,  replyId, issueId, currentUser.id)}
            />
              <Box>
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