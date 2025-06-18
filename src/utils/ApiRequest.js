import axios from "axios";
import { URL } from "./ApiConfig";

export const submitPeople = async (people) => {

    const options = {
        method: 'POST',
        url: URL + `/shuffle`,
        headers: {
            'Accept': 'application/json',
        },
        data:{
            peopleCount:people
        }
    }

     return await axios.request(options);
}