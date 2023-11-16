import HTTP from './index'

export const fetchPageCount = async (type, userID) => {
    try{
        switch(type) {
            case 'user':
                return (await HTTP.get(`/issue/reportedBy/${userID}/pageCount`)).data;
            case '':
                return (await HTTP.get(`/issue/pageCount`)).data;
            default:
                return (await HTTP.get(`/issue/${type}/pageCount`)).data;
        }
    }
    catch(error){
        console.log(error);
    }
};