
import axios from 'axios';

import * as actions from './IssuesActionType';

import { AppDispatch } from 'src/store/store';

const getIssuesAction = () => ({
  type: actions.GET_ISSUES,
});

const getIssuesSuccessAction = (issues) => ({
  type: actions.GET_ISSUES_SUCCESS,
  payload: issues,
});

export const getIssues = () => {
  return (dispatch: AppDispatch) => {
     dispatch(getIssuesAction());
    axios.get('http://localhost:8080/issue').then(async (result) => {
      const resultJson = await result.data;
      dispatch(getIssuesSuccessAction(resultJson));
    }).catch((error) => {
      console.log(error);
      dispatch(getIssuesAction);
    });
  };
};

const getOpenIssuesAction = () => ({
  type: actions.GET_OPEN_ISSUES,
});

const getOpenIssuesSuccessAction = (issues) => ({
  type: actions.GET_OPEN_ISSUES_SUCCESS,
  payload: issues,
});

export const getOpenIssues = () => {
  return (dispatch: AppDispatch) => {
    dispatch(getOpenIssuesAction());
    axios.get('http://localhost:8080/issue/open').then(async (result) => {
      const resultJson = await result.data;
      dispatch(getOpenIssuesSuccessAction(resultJson));
    }).catch((error) => {
      console.log(error);
      dispatch(getOpenIssuesAction);
    });
  };
};

const getPlannedIssuesAction = () => ({
  type: actions.GET_PLANNED_ISSUES,
});

const getPlannedIssuesSuccessAction = (issues) => ({
  type: actions.GET_PLANNED_ISSUES_SUCCESS,
  payload: issues,
});

export const getPlannedIssues = () => {
  return (dispatch: AppDispatch) => {
    dispatch(getPlannedIssuesAction());
    axios.get('http://localhost:8080/issue/planned').then(async (result) => {
      const resultJson = await result.data;
      dispatch(getPlannedIssuesSuccessAction(resultJson));
    }).catch((error) => {
      console.log(error);
      dispatch(getPlannedIssuesAction);
    });
  };
};

const getResolvedIssuesAction = () => ({
  type: actions.GET_RESOLVED_ISSUES,
});

const getResolvedIssuesSuccessAction = (issues) => ({
  type: actions.GET_RESOLVED_ISSUES_SUCCESS,
  payload: issues,
});

export const getResolvedIssues = () => {
  return (dispatch: AppDispatch) => {
    dispatch(getResolvedIssuesAction());
    axios.get('http://localhost:8080/issue/resolved').then(async (result) => {
      const resultJson = await result.data;
      dispatch(getResolvedIssuesSuccessAction(resultJson));
    }).catch((error) => {
      console.log(error);
      dispatch(getResolvedIssuesAction);
    });
  };
};


const getClosedIssuesAction = () => ({
  type: actions.GET_CLOSED_ISSUES,
});

const getClosedIssuesSuccessAction = (issues) => ({
  type: actions.GET_CLOSED_ISSUES_SUCCESS,
  payload: issues,
});

export const getClosedIssues = () => {
  return (dispatch: AppDispatch) => {
    dispatch(getClosedIssuesAction());
    axios.get('http://localhost:8080/issue/closed').then(async (result) => {
      const resultJson = await result.data;
      dispatch(getClosedIssuesSuccessAction(resultJson));
    }).catch((error) => {
      console.log(error);
      dispatch(getClosedIssuesAction);
    });
  };
};


const getUserIssuesAction = () => ({
  type: actions.GET_USER_ISSUES,
});

const getUserIssuesSuccessAction = (issues) => ({
  type: actions.GET_USER_ISSUES_SUCCESS,
  payload: issues,
});

export const getUserIssues = (email) => {
  return (dispatch: AppDispatch) => {
    dispatch(getUserIssuesAction());
    axios.get(`http://localhost:8080/issue/reportedBy/${email}`).then(async (result) => {
      const resultJson = await result.data;
      dispatch(getUserIssuesSuccessAction(resultJson));
    }).catch((error) => {
      console.log(error);
      dispatch(getUserIssuesAction);
    });
  };
};

