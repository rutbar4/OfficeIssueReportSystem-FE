import HTTP from './index'

export const fetchPageCount = async (type, userID) => {
    try{
        switch(type) {
            case 'user':
                return (await HTTP.get(`/issue/reportedBy/${userID}/page-count`)).data;
            case '':
            case null:
                return (await HTTP.get(`/issue/page-count`)).data;
            default:
                return (await HTTP.get(`/issue/${type}/page-count`)).data;
        }
    }
    catch(error){
        console.log(error);
    }
};