// eslint-disable-next-line react/jsx-filename-extension
import { FC, useEffect, useState } from 'react';
import { Box, Container, Divider, Paper } from '@mui/material';

import  { Comment, Employee } from './Comment';
import CommentForm from './Comment';
import AddCommentForm from './AddComment';

import { createCommentApi, getAllCommentsApi, updateCommentApi } from 'src/api/CommentApi';


type CommentsProps = {
  issueId: string,
  currentUser: Employee,
};

const Comments: FC<CommentsProps> = ({issueId, currentUser}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [activeComment, setActiveComment] = useState<string | null>(null);

  const rootComments = comments.filter((comment) => comment.parentId === null);

  const getReplies = (commentId: string) =>
    comments.filter((comment) => comment.parentId === commentId).sort(
      (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
    );


  const handleUpvote = (commentId: string) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        const updatedComment = { ...comment, votes: comment.votes + 1 };
        return updateCommentApi(comment.id, updatedComment.votes).then((updatedCommentFromApi) => {
          return updatedCommentFromApi;
        });
      } else {
        return comment;
      }
    });
    Promise.all(updatedComments).then((updatedCommentsArray) => {
      const filteredUpdatedComments = updatedCommentsArray.filter((comment) => comment !== undefined);
      setComments(filteredUpdatedComments as Comment[]);
    });
  };


  const addComment = (issueId: string, currentUserId: string, text: string, parentId: string | null) => {
    if (text.trim() === '') {
      setActiveComment(null);
    } else {
    const newComment: Comment = {
      text: text, issueId: issueId, employee: { id: currentUserId, fullName: currentUser.fullName, avatar: currentUser.avatar },
       parentId: parentId, votes: 0, time: new Date(),
      id: '',
    };
    createCommentApi(newComment).then((comment) => {
      setComments([comment, ...comments]);
      setActiveComment(null);
    });
  }
  };


  useEffect(() => {
    getAllCommentsApi(issueId).then((data) => {
      setComments(data);
    });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
    <Box mt={3} sx={{ marginLeft: 0, width: '100%'}}>
      {rootComments.map((rootComment) => (
        <Paper key={rootComment.id} elevation={0} sx={{ p: 2, mt: 2, marginLeft: -11, marginRight: 'auto', width: '100%' }}>
          <CommentForm
          issueId={issueId}
          comment={rootComment}
          employee={rootComment.employee}
          replies={getReplies(rootComment.id)}
          activeComment={activeComment}
          setActiveComment={setActiveComment}
          addComment={addComment}
          currentUser={currentUser}
          onUpvote={() => handleUpvote(rootComment.id)}
          />
        </Paper>
      ))}
    </Box>
    <Box mt={3} sx={{
          position: 'sticky',
          bottom: '0',
          left: '20px',
          width: '110%',
          p: 2,
          backgroundColor: 'white'
        }}
    >
      <Divider/>
      <AddCommentForm
      issueId={issueId}
      currentUser={currentUser}
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

