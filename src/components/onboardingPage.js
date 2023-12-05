import React, {useEffect, useState} from "react";
import Tags from "./onboardingTag";
import { Button, Box, Typography, Sheet, Autocomplete } from '@mui/joy';
import axios from 'axios';
import { BACKEND_URL } from "../constants";
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';


export default function OnboardingPage(){
    const [value, setValue] = useState(options[0]);
    const [inputValue, setInputValue] = useState('');
    const [selectedTags, setSelectedTags] = useState([]); 
    const [originalData, setOriginalData] = useState([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/tags/users/1`)
        .then((response) => {
            const received = response.data;
            const getUserTags = received.map((data) => data.user_tags);
            const getTagIds = getUserTags.map((userTag) => userTag.tagId);
            setOriginalData(getTagIds);
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
      
        const newData = selectedTags;
        const idsToDelete = originalData.filter((id) => !newData.includes(id));
        const idsToAdd = newData.filter((id) => !originalData.includes(id));

        //call post 
        axios.post(`${BACKEND_URL}/tags/users/1`, { idsToAdd }) // fix user id to 'loggedin user'
          .then((response) => {
            console.log("adding tags", response.data.message)
            // setSelectedTags()
          })
          .catch((error) => {
            console.error('Error associating tags:', error);
          });
        
        axios({
            url: `${BACKEND_URL}/tags/users/1`, // fix user id to 'loggedin user'
            method: 'delete',
            data: idsToDelete,
          }).then((response) => console.log('delete', response.data.message))

      };

    return(
    <Sheet sx={{display: "flex", flexDirection: 'column', gap: "10px", margin: "100px"}}>
        {/* {selectedTags.map((id) => <div>{id}</div>)} */}
        <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', justifyContent: "space-between", mb: 2 }}>
                <Typography fontWeight="lg" level="h1" color="neutral" sx={{ mb: 0.5}}>Onboarding </Typography>
                <Button size="lg" type="submit" variant="outlined" endDecorator={<KeyboardArrowRight />} color="success">Next </Button>
            </Box>
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

        </form>
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

