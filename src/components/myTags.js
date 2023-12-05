import axios from 'axios';
import React, {useState, useEffect } from 'react';
import { BACKEND_URL } from '../constants';
import {Button, Typography, AccordionGroup, Accordion, AccordionDetails,AccordionSummary } from '@mui/joy';
import { getDate } from './entryList';

export default function MyTags(){
    const [ tags, setTags ] = useState([])
    const [openStates, setOpenStates] = useState([]);

    const toggleAll = (value) => {    
        const newOpenStates = Array(openStates.length).fill(value);
        setOpenStates(newOpenStates);
      };


    useEffect(() => {
        axios.get(`${BACKEND_URL}/tags/users/1`)
        .then((response) => {   
            const myTags = response.data;
            console.log(response.data);
            setTags(myTags)
            setOpenStates(Array(myTags.length).fill(false)) // nice if you can add created at 
        })
        .catch((error)=> console.log(error))
    },[])


    return(
    <div>
        <div>
            <Button color="neutral" variant="outlined" onClick={() => toggleAll(true)}> Open All</Button>
            <Button color="neutral" variant="outlined" onClick={() => toggleAll(false)}>Close All</Button>
        </div>
        <AccordionGroup sx={{ maxWidth: 400 }}>
            {tags.map((tag, index) => 
                <Tag 
                    key={tag.id}
                    tag={tag}
                    index={index}
                    open={openStates[index]}
                    setOpen={(value) => {
                        const newOpenStates = [...openStates];
                        newOpenStates[index] = value;
                        setOpenStates(newOpenStates)
                    }}
                />
            )}
        </AccordionGroup>

    </div>)
}


function Tag({tag, open, setOpen}){    
    return(
     <Accordion
        expanded={open}
        onChange={(event, expanded) => {
            setOpen(expanded);
        }}
      >
        <AccordionSummary>
            <Typography level='body'>{tag.note} </Typography>
            </AccordionSummary>
        <AccordionDetails>
             {  tag.type === 'user_generated' ? 
            (<Typography color='neutral' level='body-sm' sx={{mb: 1}}>added on {getDate(tag.user_tags.createdAt)}</Typography>)
            : (<Typography color='neutral' level='body-sm' sx={{mb: 1}}>selected on {getDate(tag.user_tags.createdAt)}</Typography>)
            }
            <Typography sx={{mb: 1}} fontSize="md">{tag.description}</Typography>
         
        </AccordionDetails>
      </Accordion>
    )
}