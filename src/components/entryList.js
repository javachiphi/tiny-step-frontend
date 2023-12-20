import React, { useState, useEffect} from 'react'; 
import { AccordionGroup, Typography, Button } from '@mui/joy';
import { BACKEND_URL } from '../constants';
import { useAuthToken } from './useAuthToken';
import Entry from './Entry';
import axios from 'axios';

export default function EntryList({
    entries, 
    tagValue,
    setDataChanged
}){
   
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [selectedTag, setSelectedTag] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false); 
    const [openStates, setOpenStates] = useState([]);
    const jwtToken = useAuthToken();

    
    useEffect(() => {
        if (entries && entries.length > 0) {
            setOpenStates(Array(entries.length).fill(false));
        } else {
            setOpenStates([]);
        }
    }, [entries])
 
    const toggleAll = (value) => {    
        const newOpenStates = Array(openStates.length).fill(value);
        setOpenStates(newOpenStates);
      };

    const handleEdit = (entry, tagValue) => {
        setSelectedEntry(entry);
        setSelectedTag(tagValue); // initial value for tag autocomplete
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
            <div>

                <Button color="neutral" variant="outlined" onClick={() => toggleAll(true)}> Open All</Button>
                <Button color="neutral" variant="outlined" onClick={() => toggleAll(false)}>Close All</Button>
            </div>
            <AccordionGroup sx={{ maxWidth: 700 }}>
                {entries && entries.map((entry, index) => {
                    const tagValueFromAllDiaries = entries.tags && { label : entries.tags[0].note , id: entries.tags[0].id };
                    const indexExist = index && index; 
                    const openState = openStates[indexExist] || false;
                    return (
                    <Entry 
                        key={entry.id} 
                        index={indexExist} 
                        entry={entry} 
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onClose={handleCloseDrawer}
                        tagValue={tagValue ? tagValue : tagValueFromAllDiaries}
                        isDrawerOpen={isDrawerOpen}
                        selectedEntry={selectedEntry}
                        selectedTag={selectedTag}
                        setDataChanged={setDataChanged}
                        open={openState} 
                        setOpen={(value) => {
                            const newOpenStates = [...openStates];
                            newOpenStates[indexExist] = value;
                            setOpenStates(newOpenStates);
                        }} 
                    />
                )}
            )}
            </AccordionGroup>
        </div>
    )
}
