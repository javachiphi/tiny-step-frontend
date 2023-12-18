import React, {useEffect, useState} from "react";
import { Autocomplete, Button } from '@mui/joy';
import axios from 'axios';
import { BACKEND_URL } from "../constants";



export default function TagSelect({
    jwtToken, 
    tagValue, 
    setTagValue, 
    checkTagCreation,
    setCheckTagCreation
}){
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions ] = useState([]);


    useEffect(() => {  
        if (jwtToken) {
            axios.get(`${BACKEND_URL}/tags/users/my`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                }
            })
            .then((response) => {
                const received = response.data;
                let formatted = received.map(tag => ({
                    label: tag.note, 
                    id: tag.user_tags.tagId
                }));
    
                setOptions(formatted);
    
                // Set the tag value only if it's not already set or if a new tag is created
                if (!tagValue || checkTagCreation) {
                    const newTagValue = checkTagCreation ? formatted[formatted.length - 1] : formatted[0];
                    console.log('New tag value:', newTagValue);
                    setTagValue(newTagValue);
                    setCheckTagCreation(false);
                }
            })
            .catch((error) => {
                console.error('Error fetching tags:', error);
            });
        }
    }, [jwtToken, checkTagCreation]);
    

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


