import HTTP from './index'

export const fetchPaginationCount = async () => {
    try{
        const response = await HTTP.get('/issue/paginationCount');
        return response.data;
    }
    catch(error){
        console.log(error);
    }
};