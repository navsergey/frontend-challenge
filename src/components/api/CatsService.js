import axios from "axios";

export default class CatsService {
    static async getCats(limit = 15){
        const res = await axios.get('https://api.thecatapi.com/v1/images/search',{
            params: {
                limit
            },
            headers:{
                'x-api-key': 'live_lQjsMPXGmOZiEofPsZwjio95h3EdFxttbmRWo34JxhQq5661QYU8PRAkk1QfU8L9'
            }
        });
        return res.data;
    }
}