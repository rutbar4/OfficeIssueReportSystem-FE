// eslint-disable-next-line react/jsx-filename-extension
import { UUID } from 'crypto';
import { FC, useEffect, useState } from 'react';
import { Box, Container, Divider, Paper } from '@mui/material';

import  { Comment, Employee } from './Comment';
import CommentForm from './Comment';
import AddCommentForm from './AddComment';



type CommentsProps = {
  issueId: UUID,
  currentUser: Employee,
};

const Comments: FC<CommentsProps> = ({issueId, currentUser}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [activeComment, setActiveComment] = useState<Comment | null>(null);

  const rootComments = comments.filter((comment) => comment.parentId === null);
  const getReplies = (commentId: UUID) =>
    comments.filter((comment) => comment.parentId === commentId).sort(
      (a, b) => new Data(a.time).getTime() - new Data(b.time).getTime()
    );

  const addComment = (issueId: UUID, currentUserId: UUID, text: string, parentId: UUID | null) => {
    createCommentApi(issueId, currentUserId, text, parentId).then((comment) => {
      setComments([comment, ...comments]);
      setActiveComment(null);
    });
  };

  useEffect(() => {
    getCommentsApi().then((data) => {
      setComments(data);
    });
  }, []);

  return (
    <Container>

    <Box mt={3}>
      {rootComments.map((rootComment) => (
        <Paper key={rootComment.id} elevation={3} sx={{ p: 2, mt: 2 }}>
          <CommentForm
          issueId={issueId}
          comment={rootComment}
          employee={rootComment.employee}
          replies={getReplies(rootComment.id)}
          activeComment={activeComment}
          setActiveComment={setActiveComment}
          addComment={addComment}
          currentUserId={currentUser.id}
          />
        </Paper>
      ))}

    </Box>
    <Box mt={3}>
      <Divider/>
    </Box>
    <Box mt={3}>
      <AddCommentForm
      handleSubmit={addComment}
      picture={currentUser.avatar}
      submitLabel='Add comment'
      />
    </Box>
    </Container>
  );

};

export default Comments;

