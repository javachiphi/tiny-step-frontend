import React, {useEffect, useState} from "react";
import Tags from "./tag";
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Autocomplete from '@mui/joy/Autocomplete';
import axios from 'axios';
import { BACKEND_URL } from "../constants";

export default function TagPage(){
    const [value, setValue] = useState(options[0]);
    const [inputValue, setInputValue] = useState('');
    const [selectedTags, setSelectedTags] = useState([]); 
    const [selectedTagNames, setSelectedTagNames] = useState([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/tags/users/1`)
        .then((response) => {
            const received = response.data;
            // console.log(received);
            const getUserTags = received.map((data) => data.user_tags);
            const getTagIds = getUserTags.map((userTag) => userTag.tagId);
            console.log(getTagIds)
            setSelectedTags(getTagIds);
         
        })
        .catch((error) => {
            console.log('error', error)
        })

    },[])

    const toggleSelection = (tagId) => {
        if(selectedTags.includes(tagId)){
            setSelectedTags(selectedTags.filter((id) => id !== tagId));
        } else {
            setSelectedTags([...selectedTags, tagId]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('selectedTags', selectedTags); 
        // check how the req.body should look like for this call 
    
        // Send an HTTP request to associate selectedTags with the logged-in user
        axios.post(`${BACKEND_URL}/users/1/tags`, { selectedTags })
          .then((response) => {
            console.log("response", response)
            // setSelectedTags()
          })
          .catch((error) => {
            console.error('Error associating tags:', error);
          });
      };

    return(
    <Sheet sx={{width: "1200px", display: "flex", flexDirection: 'column', gap: "10px", margin: "100px"}}>
        <Typography fontWeight="lg" level="h1" color="neutral" sx={{ mb: 0.5}}>Onboarding </Typography>
        {/* {selectedTags.map((id) => <div>{id}</div>)} */}
        <PersonalitySelect value={value} inputValue={inputValue} setValue={setValue} setInputValue={setInputValue}/>
        <Tags 
            requestType= "Personality" 
            userPersonality={value}
            selectedTags={selectedTags}
             toggleSelection={toggleSelection}
        />
        <Tags 
            requestType="CBT"
            selectedTags={selectedTags}
            toggleSelection={toggleSelection}
        />
    </Sheet>
    )
}


function PersonalitySelect({value, inputValue,setValue, setInputValue}){
    return(
        <Autocomplete
            placeholder="type to search...e.g. INFP"
            options={options}
            sx={{ width: 300 }}
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
        />
    )
}

const options =['INFP', 'ENFP', 'INTJ', 'ENTJ']

