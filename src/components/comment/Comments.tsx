// eslint-disable-next-line react/jsx-filename-extension
import { FC, useState } from 'react';
import { Box, Container, Divider, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';

import CommentForm from './Comment';
import AddCommentForm from './AddComment';
import { COLORS } from '../../values/colors';

import { createCommentApi, updateCommentApi } from 'src/api/CommentApi';
import { Employee } from 'src/models/EmployeeModel';
import { AddComment, Comment } from 'src/models/CommentModel';
import { addCommentToIssue } from 'src/actions/issues/IssuesAction';
import store from 'src/store/store';

type CommentsProps = {
  issueId: string;
  currentUser: Employee;
  issueComments: Comment[];
  updateComments: (newComments: Comment[]) => void;
  issueStatus: string;
};

const Comments: FC<CommentsProps> = ({ issueId, currentUser, issueComments, updateComments, issueStatus }) => {
  const [comments, setComments] = useState<Comment[]>(issueComments);
  const [activeComment, setActiveComment] = useState<string | null>(null);

  const dispatch = useDispatch();
  const issues = store.getState().rootReducer.issues.issues;

  const rootComments = comments.filter((comment) => comment.parentId === null);

  const getReplies = (commentId: string) =>
    comments
      .filter((comment) => comment.parentId === commentId)
      .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

  const handleUpvote = (commentId: string, issueId: string) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return updateCommentApi(comment.id, issueId).then((updatedCommentFromApi) => {
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

  const addComment = (text: string, parentId: string | null, issueId: string, currentUserId: string) => {
    if (text.trim() === '') {
      setActiveComment(null);
    } else {
      const newComment: AddComment = {
        text: text,
        time: new Date(),
        votes: 0,
        parentId: parentId,
        issueId: issueId,
        employeeId: currentUserId,
      };
      createCommentApi(newComment).then((comment) => {
        setComments([comment, ...comments]);
        setActiveComment(null);
        updateComments([comment, ...comments]);
        const currentIssue = issues.find((issue) => issue.id === issueId);
        const updatedIssue = {
          ...currentIssue,
          commentCount: currentIssue.commentCount + 1,
        };
        dispatch(addCommentToIssue(issueId, updatedIssue));
      });
    }
  };

  return (
    <Container maxWidth={false} sx={{ width: '100%', padding: 0, bottom: 0 }}>
      <Box sx={{ marginLeft: 0, width: '100%', padding: 0 }}>
        {rootComments.map((rootComment) => (
          <Paper
            key={rootComment.id}
            elevation={0}
            sx={{ marginLeft: -10, marginRight: 'auto', width: '100%', marginTop: 0, padding: 0 }}
          >
            <CommentForm
              issueId={issueId}
              comment={rootComment}
              employee={rootComment.employee}
              replies={getReplies(rootComment.id)}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
              addComment={addComment}
              currentUser={currentUser}
              onUpvote={handleUpvote}
              issueStatus={issueStatus}
            />
          </Paper>
        ))}
      </Box>
      {issueStatus !== 'Closed' && (
        <Box
          sx={{
            position: 'sticky',
            bottom: '0',
            left: '27px',
            width: '100%',
            backgroundColor: COLORS.white,
            marginLeft: -10,
            padding: 0,
          }}
        >
          <Divider style={{ width: '137%', marginLeft: '-40px', overflow: 'hidden' }} />
          <AddCommentForm
            issueId={issueId}
            currentUser={currentUser}
            parentId={null}
            handleSubmit={addComment}
            picture={currentUser.avatar}
            submitLabel="Add comment"
            fieldWidth="550px"
          />
        </Box>
      )}
    </Container>
  );
};

export default Comments;
