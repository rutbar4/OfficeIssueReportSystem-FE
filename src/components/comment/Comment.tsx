
import { Avatar, Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { UUID } from 'node:crypto';

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
  currentUserId: string,
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
  currentUserId,
  onUpvote
}) => {
    const isReplying = activeComment && activeComment === comment.id;
    const canReply = Boolean(currentUserId);
    const replyId = parentId ? parentId : comment.id;
    const createdAt = new Date(comment.time).toLocaleTimeString();
    const [hasUpvoted, setHasUpvoted] = useState(false);


  const handleUpvote = () => {
    if (onUpvote && !hasUpvoted) {
      setHasUpvoted(true);
    }
  };



  const upvoteButton = () => {
    if (comment.votes === 0) {
      return (
        <Button variant='text'  onClick={handleUpvote} sx={{ marginTop: 2, marginLeft: '-12px', cursor: 'pointer',
        textTransform: 'capitalize', fontSize: '12px', color: '#000048'}}
        >
         Upvote
        </Button>
      );
    } else {
      return (
        <Button variant='text' onClick={handleUpvote}  sx={{ marginTop: 2, marginLeft: '-10px', cursor: 'pointer',
        textTransform: 'capitalize', fontSize: '12px', color: '#000048'}}
        >
        <UpvoteChip count={comment.votes}/>
        </Button>
      );
    }
  };

  return (
    <Card variant='outlined' sx={{display: 'flex', alignItems: 'center', p: 2, m: 1, border: 'none'}}>
      <Box p={{ xs: '0', sm: '4px' }}>
       <Avatar src={employee.avatar} alt={`${employee.fullName} Photo`} sx={{marginTop: -8}} />
      </Box>
      <CardContent sx={{flex: '1 1 auto', ml: 2}} >
        <Stack direction='row' alignItems='center' spacing={2}>
          <Typography variant='h6' sx={{ fontSize: '14px', fontWeight: 'bold', color: '#000048' }}>{employee.fullName}</Typography>
          <Typography variant='caption' sx={{ fontSize: '12px' }}>{createdAt}</Typography>
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
            <AddCommentForm
            issueId={issueId}
            currentUserId={currentUserId}
            parentId={parentId}
            picture={employee.avatar}
            submitLabel='Reply'
            handleSubmit={(text) => addComment(issueId, currentUserId, text, replyId)}
            />
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
                currentUserId={currentUserId}
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
