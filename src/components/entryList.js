import React, { useState, useEffect } from 'react'; 
import { Drawer, Typography, Textarea, Button, IconButton } from '@mui/joy';
import {AccordionGroup, Accordion, AccordionDetails,AccordionSummary } from '@mui/joy';
import axios from 'axios';
import { BACKEND_URL } from '../constants';
import EditDeleteDropDown from './EditDeleteDropdown';
import { useAuthToken } from './useAuthToken';
import EntryForm from './entryForm';

export default function EntryList({entries, tagName, tagId, setDataChanged}){
    const [openStates, setOpenStates] = useState(Array(entries.length).fill(false));
    const jwtToken = useAuthToken();
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [selectedTag, setSelectedTag] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false); 

    const toggleAll = (value) => {    
        const newOpenStates = Array(openStates.length).fill(value);
        setOpenStates(newOpenStates);
      };

    const handleEdit = (entry, tagValue) => {
        setSelectedEntry(entry);
        console.log('tagValue', tagValue)
        setSelectedTag(tagValue);
        setIsDrawerOpen(true);
    };

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
    };



    const handleDelete = (entryId) => {
        axios({
            url: `${BACKEND_URL}/entries/${entryId}`,
            method: 'delete',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            }
        })
        .then((response) => {
            setDataChanged(true);
        })
    }

    const tagValue = {label: tagName, id: tagId}
    return(
        <div>
            <Typography level="h3" fontWeight="lg">{tagName}</Typography>
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
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onClose={handleCloseDrawer}
                        tagValue={tagValue}
                        isDrawerOpen={isDrawerOpen}
                        selectedEntry={selectedEntry}
                        selectedTag={selectedTag}
                        setDataChanged={setDataChanged}
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


function Entry({
    entry, 
    open,
    setOpen, 
    onDelete,
    onEdit, 
    onClose, 
    selectedEntry,
    selectedTag, 
    isDrawerOpen, 
    tagValue,
    setDataChanged
}){    

    return(
     <Accordion
        expanded={open}
        onChange={(event, expanded) => {
            setOpen(expanded);
        }}
      >
        <AccordionSummary>
            {getDate(entry.createdAt)}
        </AccordionSummary>
        <AccordionDetails>
            <EditDeleteDropDown 
                content={entry} 
                onEdit={onEdit} 
                onDelete={onDelete} 
                contentId={entry.id} 
                tagValue={tagValue}
            />
            <Drawer 
                anchor="right" 
                open={isDrawerOpen} 
                onClose={onClose}
                size="lg"
            >
                <EntryForm 
                    entry={selectedEntry}
                    onClose={onClose}
                    tagValue={selectedTag}
                    setDataChanged={setDataChanged}
                />
            </Drawer>
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
  