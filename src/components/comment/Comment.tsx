
import { Avatar, Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { FC, useState } from 'react';

import UpvoteChip from '../Chip/UpvoteChip';
import AddCommentForm from './AddComment';


export type Employee = {
  id: string,
  fullName: string,
  avatar: string,
};

export type Comment = {
  id: string,
  text: string,
  parentId: string | null,
  votes: number,
  time: Date,
  isUpVoted?: boolean,
  employee: Employee,
  issueId: string,
  employeeId?: string,
};


type CommentProps = {
  issueId: string,
  comment: Comment,
  replies: Comment[],
  employee: Employee,
  setActiveComment: (id: string | null) => void,
  activeComment: string | null,
  addComment: (issueId: string, currentUserId: string, text: string, parentId: string | null) => void,
  parentId?: string | null,
  currentUser: Employee,
  onUpvote?: (commnetId: string) => void;
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
    const [hasUpvoted, setHasUpvoted] = useState(false);
    const createdAt = new Date(comment.time);

    const day = createdAt.getDate();
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(createdAt);
    const year = createdAt.getFullYear();
    const hour = createdAt.getHours();
    const minute = createdAt.getMinutes();

    const formattedDate = `${day} ${month} ${year}, ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;


  const handleUpvote = () => {
    if (onUpvote && !hasUpvoted) {
      setHasUpvoted(true);
    }
  };


  const upvoteButton = () => {
    const color = comment.isUpVoted ? '#0E166E' : '#000048';
      return (
        <Button variant='text'  onClick={() => onUpvote?.(comment.id)}
          sx={{ marginTop: 2,
          marginLeft: '-12px',
          cursor: 'pointer',
          textTransform: 'capitalize',
          fontSize: '12px',
          color: color}}
        >
          {comment.votes === 0 ? 'Upvote' : <UpvoteChip count={comment.votes} />}
        </Button>
      );
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
          {upvoteButton()}
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
            handleSubmit={(text) => addComment(issueId, currentUser.id, text, replyId)}
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
                onUpvote={handleUpvote}
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
