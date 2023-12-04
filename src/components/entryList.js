import React, { useState, useEffect } from 'react'; 
import { Box, Sheet, Typography, Textarea, Button } from '@mui/joy';
import {AccordionGroup, Accordion, AccordionDetails,AccordionSummary } from '@mui/joy';
import axios from 'axios';
import { BACKEND_URL } from '../constants';

export default function EntryList(){
    const [entries, setEntries] = useState([]);
    const [openStates, setOpenStates] = useState([]);

    const toggleAll = (value) => {
        // Set all open states to the specified value (true for open, false for close)
        const newOpenStates = Array(openStates.length).fill(value);
        setOpenStates(newOpenStates);
      };

    useEffect(() => {
        axios.get(`${BACKEND_URL}/users/1/entries`) // need to implement pagination 
        .then((response) =>{
            const received = response.data;
            console.log(received);
            setEntries(received);
        })
        .catch((error) =>{
            console.log('error', error)
        })

    },[])

    return(
        <Sheet sx={{display: "flex", flexDirection: 'column', gap: "10px", margin: "100px"}}>
            <div>
                <button onClick={() => toggleAll(true)}>Open All</button>
                <button onClick={() => toggleAll(false)}>Close All</button>
            </div>
            <AccordionGroup sx={{ maxWidth: 400 }}>
                {entries.map((entry, index) =><Entry key={entry.id} index={index} entry={entry} open={openStates[index]} setOpen={(value) => {
                const newOpenStates = [...openStates];
                newOpenStates[index] = value;
                setOpenStates(newOpenStates);
            }} 
            />)}
            </AccordionGroup>
        </Sheet>
    )
}



function Entry({entry, open, setOpen}){
    
    return(
     <Accordion
        expanded={open}
        onChange={(event, expanded) => {
            setOpen(expanded);
        }}
      >
        <AccordionSummary>{getDate(entry.createdAt)}</AccordionSummary>
        <AccordionDetails>
            <Typography sx={{mb: 0.5}} color="neutral" fontSize="sm" fontWeight="lg">Solution</Typography>
            <Typography sx={{mb: 1}} fontSize="md">{entry.solution}</Typography>
            <Typography sx={{mb: 0.5}} color="neutral" fontSize="sm" fontWeight="lg">Observation</Typography>
            <Typography sx={{mb: 1}} fontSize="md">{entry.observation}</Typography>
     
           
        </AccordionDetails>
      </Accordion>
    )
}


function getDate(createdDate) {
    const entryDate = new Date(createdDate);
    if (isNaN(entryDate)) {
      return "Invalid Date";
    }
  
    const date = entryDate.getDate();
    const options = { month: "short" };
    const year = entryDate.getFullYear();
    const formattedMonth = new Intl.DateTimeFormat("en-US", options).format(entryDate);
  
    return formattedMonth.concat(` ${date}, ${year}`);
  }
  