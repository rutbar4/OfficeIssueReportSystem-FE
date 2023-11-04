import { ArrowUpward, Padding, Reply, ThumbUp } from '@mui/icons-material';
import { Avatar, Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { UUID } from 'crypto';
import React, {useState} from 'react';

import UpvoteChip from '../Chip/UpvoteChip';


type CommentProps = {
  id? :UUID,
  text: string,
  time: string,
  votes: number,
  replies: CommentProps[]
  employee: {
    id?: UUID,
    fullName: string,
    avatar: string,
  },
  onUpvote?: (commnetId: UUID) => void;
  onReply?: (commentId: UUID) => void;
};


const Comment: React.FC<CommentProps> = ({
  id,
  text,
  time,
  votes,
  replies,
  employee,
  onUpvote,
  onReply}) => {
    const [replyComment, setReplyComment] = useState('');


  const handleReply = () => {

  };

  const handleUpvote = () => {

  };

  const handleAddComment = () => {

  };

  const upvoteButton = () => {
    if (votes === 0) {
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
        <UpvoteChip count={votes}/>
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
          <Typography variant='caption' sx={{ fontSize: '12px' }}>{time}</Typography>
        </Stack>
        <Typography sx={{ marginTop: 2, fontSize: '12px', color: '#000048'}}>{text}</Typography>
        <div className='replies'>
          {replies.map((reply) => (
            <Comment key={reply.id}
              text={reply.text}
              time={reply.time}
              employee={reply.employee}
              votes={reply.votes}
              replies={reply.replies}
              onUpvote={reply.onUpvote}
              onReply={reply.onReply}
            />
            ))}
        </div>
        <div className='comment-action'>
          {upvoteButton()}

          <Typography variant="caption" sx={{ font: 'Inter',
          weight: 500, size: '14px', lineHeight: '20px',
           color: '#000048', width: '38px', height: '20px' }}>
            •
          </Typography>

          <Button variant='text'
          onClick={handleReply}
          sx={{ marginTop: 2, cursor: 'pointer',
          textTransform: 'capitalize',
           fontSize: '12px', color: '#000048'}}
          >
            Reply
          </Button>
        </div>
        </CardContent>
      </Card>

  );

};


export default Comment;
