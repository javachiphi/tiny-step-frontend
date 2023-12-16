import React, {useEffect, useState} from "react";
import { Autocomplete } from '@mui/joy';
import axios from 'axios';
import { BACKEND_URL } from "../constants";



export default function TagSelect({jwtToken, tagValue, setTagValue}){
    // const [value, setTagValue] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions ] = useState([]);

    /// fix users/1 to based on user jwtSub. 
    // fix backend jwtSub

    useEffect(() => {
        // console.log('jwtToken', jwtToken)
        if(jwtToken){
            axios.get(`${BACKEND_URL}/tags/users/1`)
            .then((response) => {
                const received = response.data;
                // const getUserTags = received.map((data) => data.user_tags);
                console.log('received', received)
                let formatted = [];

                received.forEach((tag) => {
                    formatted.push({ label: tag.note, id: tag.user_tags.tagId});
                })

                setOptions(formatted);
                setTagValue(formatted[0]);
                        
            })
            .catch((error) => {
                console.log('error', error)
            })

        }



    },[jwtToken])


    return(
        <Autocomplete
            placeholder="type to search.."
            options={options}
            sx={{ width: 300 }}
            value={tagValue}
            onChange={(event, newValue) => {
                console.log('new value', newValue)
                setTagValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
        />
    )
}

// const options =['INFP', 'ENFP', 'INTJ', 'ENTJ']
