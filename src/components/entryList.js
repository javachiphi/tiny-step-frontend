import React, { useState, useEffect } from 'react'; 
import { Box, Sheet, Typography, Textarea, Button, IconButton } from '@mui/joy';
import {AccordionGroup, Accordion, AccordionDetails,AccordionSummary } from '@mui/joy';
import axios from 'axios';
import { BACKEND_URL } from '../constants';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// all diary entries axios.get(`${BACKEND_URL}/users/1/entries`) // 

export default function EntryList({entries, tag}){
    // const [entries, setEntries] = useState([]);
    const [openStates, setOpenStates] = useState(Array(entries.length).fill(false));

    const toggleAll = (value) => {    
        const newOpenStates = Array(openStates.length).fill(value);
        setOpenStates(newOpenStates);
      };

    return(
        <div>
            <Typography level="h3" fontWeight="lg">{tag}</Typography>
            {/* <IconButton>Create</IconButton> */}
            <div>
               
                <Button color="neutral" variant="outlined" onClick={() => toggleAll(true)}> Open All</Button>
                <Button color="neutral" variant="outlined" onClick={() => toggleAll(false)}>Close All</Button>
            </div>
            <AccordionGroup sx={{ maxWidth: 400 }}>
                {entries.map((entry, index) =>
                    <Entry 
                        key={entry.id} 
                        index={index} 
                        entry={entry} 
                        open={openStates[index]} 
                        setOpen={(value) => {
                            const newOpenStates = [...openStates];
                            newOpenStates[index] = value;
                            setOpenStates(newOpenStates);
                        }} 
                    />)}
            </AccordionGroup>
        </div>
    )
}

/// http://localhost:3001/tags/entries/1

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
            <Typography sx={{mb: 0.5}} color="neutral" fontSize="sm" fontWeight="lg">Situation</Typography>
            <Typography sx={{mb: 1}} fontSize="md">{entry.observation}</Typography>
        </AccordionDetails>
      </Accordion>
    )
}


export function getDate(createdDate) {
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
  