import React, {useEffect, useState} from "react";
import { Autocomplete } from '@mui/joy';
import { useEntriesByTagData } from '../context/entriesByTagProvider';

export default function TagSelect({
    jwtToken,
    tagValue, 
    setTagValue, 
    checkTagCreation,
    setCheckTagCreation
}){
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions ] = useState([]);
    const  contextValue = useEntriesByTagData();
    const { tagDropDownOptions } = contextValue;

    useEffect(() => {
        if(tagDropDownOptions){
            setOptions(tagDropDownOptions);
        }

        if (!tagValue || checkTagCreation) {
            const options = tagDropDownOptions ? tagDropDownOptions : [];
            const newTagValue = checkTagCreation ? options[options.length - 1] : options[0];
            setTagValue(newTagValue);
            setCheckTagCreation(false);
        }

    }, [tagDropDownOptions, checkTagCreation]);

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


