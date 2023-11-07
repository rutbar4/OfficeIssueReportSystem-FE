// eslint-disable-next-line react/jsx-filename-extension
import { UUID, randomUUID } from 'crypto';
import { FC, useEffect, useState } from 'react';
import { Box, Container, Divider, Paper } from '@mui/material';

import  { Comment, Employee } from './Comment';
import CommentForm from './Comment';
import AddCommentForm from './AddComment';

import { createCommentApi, getAllCommentsApi, updateCommentApi } from 'src/api/CommentApi';



type CommentsProps = {
  issueId: UUID,
  currentUser: Employee,
};

const Comments: FC<CommentsProps> = ({issueId, currentUser}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [activeComment, setActiveComment] = useState<UUID | null>(null);

  const rootComments = comments.filter((comment) => comment.parentId === null);

  const getReplies = (commentId: UUID) =>
    comments.filter((comment) => comment.parentId === commentId).sort(
      (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
    );


  const handleUpvote = (commentId: UUID) => {
    const updatedUpvoteComments = comments.map((comment) => {
      if (comment.id === commentId) {
        comment.votes += 1;
        updateCommentApi(comment);
      }
      return comment;
    });
    setComments(updatedUpvoteComments);
  };


  const addComment = (issueId: UUID, currentUserId: UUID, text: string, parentId: UUID | null) => {
    const newComment: Comment = {
      text: text, issueId: issueId, employee: { id: currentUserId, fullName: currentUser.fullName, avatar: currentUser.avatar },
       parentId: parentId, votes: 0, time: new Date(),
      id: randomUUID(),
    };
    createCommentApi(newComment).then((comment) => {
      setComments([comment, ...comments]);
      setActiveComment(null);
    });
  };


  useEffect(() => {
    getAllCommentsApi().then((data) => {
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
          onUpvote={handleUpvote}
          />
        </Paper>
      ))}

    </Box>
    <Box mt={3}>
      <Divider/>
    </Box>
    <Box mt={3}>
      <AddCommentForm
      issueId={issueId}
      currentUserId={currentUser.id}
      parentId={null}
      handleSubmit={addComment}
      picture={currentUser.avatar}
      submitLabel='Add comment'
      />
    </Box>
    </Container>
  );

};

export default Comments;

