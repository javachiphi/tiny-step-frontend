import React, {useEffect, useState} from 'react';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Box from '@mui/joy/Box';
import { BACKEND_URL } from '../constants';
import axios from 'axios';

export default function Tags({requestType, userPersonality, selectedTags, toggleSelection}){
    const [ tags, setTags ] = useState([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/tags`)
        .then((response) => {
            const received = response.data;
            let filtered 
            filtered = received.filter((data) => {
                if (requestType === 'Personality' && userPersonality === undefined) {
                  return data.type === 'myers_briggs';
                } else if (requestType === 'Personality') {
                  return data.type === 'myers_briggs' && data.personality === userPersonality;
                } else if (requestType === 'CBT') {
                  return data.type === 'CBT';
                } else {
                  return true;
                }
            });
            setTags(filtered)
        })  
        .catch((error) => {
            console.log('error', error)
        })

    },[userPersonality])

    return(
        <div>
            <Typography sx={{ mb: 0.5}} level="h3" color="neutral">{requestType}  {userPersonality}</Typography>
            <Box 
                sx={{
                    display: 'flex',
                    flexDirection: 'row', 
                    flexWrap: "wrap"
                }}
            >
                {
                    tags.map((tag) => 
                        <Tag 
                          key={tag.id} 
                          tag={tag}
                          isSelected={selectedTags.includes(tag.id)}
                          toggleSelection={() => toggleSelection(tag.id)}
                        />)
                }
           </Box>
        </div>
    )
}

export function Tag({tag, isSelected, toggleSelection}) {
  return (
     <Card sx={{ 
        width: '270px', 
        margin: '8px',
        '&:hover': { boxShadow: 'md' }, 
        }}>
        <Typography level="title-lg">
          {tag.note}
        </Typography>
        <Typography level="body-md">
         {tag.description}
        </Typography>
        <IconButton onClick={toggleSelection} variant="outlined" color="neutral" sx={{ mr: 'auto' }}>
          {isSelected ? <CheckCircleIcon />: <CheckCircleOutlineIcon />}
        </IconButton>

      </Card>
  );
}


