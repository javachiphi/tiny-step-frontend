import React, {useEffect, useState} from "react";
import SystemTags from "./systemTagsList";
import { Button, Box, Typography, Sheet, Autocomplete } from '@mui/joy';
import axios from 'axios';
import { BACKEND_URL } from "../constants";
import { useAuthToken } from './useAuthToken';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from 'react-router-dom';


export default function TagVault(){
    const [value, setValue] = useState(options[0]);
    const [inputValue, setInputValue] = useState('');
    const [selectedTags, setSelectedTags] = useState([]); 
    const [originalData, setOriginalData] = useState([]);
    const jwtToken = useAuthToken();
    const navigate = useNavigate();

    useEffect(() => {
        if(jwtToken){
            axios.get(`${BACKEND_URL}/tags/users/my`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                }
            })
            .then((response) => {
                const received = response.data;
                const getUserTags = received.map((data) => data.user_tags);
                const getTagIds = getUserTags.map((userTag) => userTag.tagId);
                setOriginalData(getTagIds);
                setSelectedTags(getTagIds);
                // console.log('getTagIds', getTagIds)
            
            })
            .catch((error) => {
                console.log('error', error)
            })
        }

    },[jwtToken])

    if (!jwtToken) {
        return <div>Loading...</div>;
    }

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
        const idsToDelete = originalData.filter(id => !newData.includes(id));
        const idsToAdd = newData.filter(id => !originalData.includes(id));
    
        const addTagsPromise = axios.post(`${BACKEND_URL}/tags/users/my`, {
            idsToAdd
        }, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            }
        });
    
        const deleteTagsPromise = axios({
            url: `${BACKEND_URL}/tags/users/my`,
            method: 'delete',
            data: idsToDelete,
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            }
        });
    
        Promise.all([addTagsPromise, deleteTagsPromise])
            .then((responses) => {
                console.log("Adding tags response:", responses[0].data.message);
                console.log("Deleting tags response:", responses[1].data.message);
                // Redirect after successful operations
                navigate('/tags');
            })
            .catch((error) => {
                console.error('Error in tag operations:', error);
            });
    };
    

    return(
    <Sheet sx={{display: "flex", flexDirection: 'column', gap: "10px", margin: "100px"}}>
        {/* {selectedTags.map((id) => <div>{id}</div>)} */}
        <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', justifyContent: "space-between", mb: 2 }}>
                <Typography 
                    fontWeight="lg" 
                    level="h1" 
                    color="neutral" 
                    sx={{ mb: 0.5}}>Onboarding </Typography>
                <Button 
                    size="lg" 
                    type="submit" 
                    variant="outlined" 
                    endDecorator={<KeyboardArrowRight />} 
                    color="success"
                >
                    Next
                </Button>
            </Box>
            <PersonalitySelect 
                value={value} 
                inputValue={inputValue} 
                setValue={setValue} 
                setInputValue={setInputValue}
            />
            <SystemTags 
                requestType= "Personality" 
                userPersonality={value}
                selectedTags={selectedTags}
                toggleSelection={toggleSelection}
            />
            <SystemTags 
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

