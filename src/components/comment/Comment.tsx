
import { Avatar, Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { UUID } from 'crypto';
import { FC } from 'react';

import UpvoteChip from '../Chip/UpvoteChip';
import AddCommentForm from './AddComment';



export type Employee = {
  id: UUID,
  fullName: string,
  avatar: string,
};

export type Comment = {
  id: UUID,
  text: string,
  parentId: UUID,
  votes: number,
  time: string,
  employee: Employee,
};


type CommentProps = {
  issueId: UUID,
  comment: Comment,
  replies: Comment[],
  employee: Employee,
  setActiveComment: (comment: Comment | null) => void,
  activeComment: Comment | null,
  addComment: (issueId: UUID, currentUserId: UUID, text: string, parentId: UUID | null) => void,
  parentId?: UUID | null,
  currentUserId: UUID,
  onUpvote?: (commnetId: UUID) => void;
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
}) => {
    const isReplying = activeComment && activeComment.id === comment.id;
    const canReply = Boolean(currentUserId);
    const replyId = parentId ? parentId : comment.id;
    const createdAt = new Date(comment.time).toLocaleDateString;



  const handleUpvote = () => {

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
          onClick={() => setActiveComment({id: comment.id})}
          sx={{ marginTop: 2, cursor: 'pointer',
          textTransform: 'capitalize',
           fontSize: '12px', color: '#000048'}}
          >
            Reply
          </Button>
          {isReplying && (
            <AddCommentForm
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
