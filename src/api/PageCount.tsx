import HTTP from './index';

export const fetchPageCount = async (type, userID, officeId, userId) => {
  try {
    switch (type) {
      case 'user':
        return (
          await HTTP.get(`/issue/reportedBy/${userID}/page-count`, {
            params: { officeID: officeId ? officeId : null, employeeID: userId ? userId : null },
          })
        ).data;
      case '':
      case null:
        return (
          await HTTP.get(`/issue/page-count`, {
            params: { officeID: officeId ? officeId : null, employeeID: userId ? userId : null },
          })
        ).data;
      default:
        return (
          await HTTP.get(`/issue/${type}/page-count`, {
            params: { officeID: officeId ? officeId : null, employeeID: userId ? userId : null },
          })
        ).data;
    }
  } catch (error) {
    console.log(error);
  }
};
