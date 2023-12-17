import React, {useEffect, useState} from "react";
import { Autocomplete } from '@mui/joy';
import axios from 'axios';
import { BACKEND_URL } from "../constants";



export default function TagSelect({jwtToken, tagValue, setTagValue}){
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions ] = useState([]);



    useEffect(() => {
        
        if(jwtToken){
            axios.get(`${BACKEND_URL}/tags/users/my`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                }
            })
            .then((response) => {
                const received = response.data;
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



    },[jwtToken, setTagValue])

    return(
        <Autocomplete
            placeholder="type to search.."
            options={options}
            sx={{ width: 300 }}
            value={tagValue}
            onChange={(event, newValue) => {    
                setTagValue(newValue);
            }}
            isOptionEqualToValue={(option, value) => value ? option.id === value.id : false}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
        />
    )
}
