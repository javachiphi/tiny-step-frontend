import React, {useEffect, useState} from 'react';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import { BACKEND_URL } from '../../constants';
import axios from 'axios';
import TagCard from './tagCard';

export default function SystemTags({
  requestType, 
  userPersonality, 
  selectedTags, 
  toggleSelection
}){
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
                {tags && tags.map((tag) => 
                  <TagCard 
                    key={tag.id} 
                    tag={tag}
                    isSelected={selectedTags.includes(tag.id)}
                    toggleSelection={() => toggleSelection(tag.id)}
                  />
                )}
           </Box>
        </div>
    )
}


