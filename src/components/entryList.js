import React, { useState } from 'react'; 
import { AccordionGroup, Typography, Button } from '@mui/joy';
import { BACKEND_URL } from '../constants';
import { useAuthToken } from './useAuthToken';
import Entry from './Entry';
import axios from 'axios';

export default function EntryList({
    entries, 
    tagName, 
    tagId, 
    setDataChanged
}){
   
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [selectedTag, setSelectedTag] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false); 
    const [openStates, setOpenStates] = useState(Array(entries.length).fill(false));
    const jwtToken = useAuthToken();
    const tagValue = {label: tagName, id: tagId}


    const toggleAll = (value) => {    
        const newOpenStates = Array(openStates.length).fill(value);
        setOpenStates(newOpenStates);
      };

    const handleEdit = (entry, tagValue) => {
        setSelectedEntry(entry);
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

   
    return(
        <div>
            <Typography level="h3" fontWeight="lg">{tagName}</Typography>
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
