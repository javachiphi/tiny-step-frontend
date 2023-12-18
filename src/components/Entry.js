import React from 'react'; 
import { getDate } from './helpers';
import { Accordion, AccordionDetails, AccordionSummary, Typography, Drawer } from '@mui/joy';
import EntryForm from './entryForm';
import EditDeleteDropDown from './EditDeleteDropdown';

export default function Entry({
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

