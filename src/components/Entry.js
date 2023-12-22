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
            <div style={{display: 'flex', gap: '20px', justifyContent: 'space-between'}}>
            <Typography color='neutral' level='body-sm'>{getDate(entry.createdAt)}</Typography>
            <Typography fontSize="md" sx={{ml: '10px'}}>{entry.solution}</Typography>
            </div>
        </AccordionSummary>
        <AccordionDetails>
            <Typography color="neutral" fontSize="sm" fontWeight="lg">Observation</Typography>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography sx={{mb: 1}} fontSize="md">{entry.observation}</Typography>
                <EditDeleteDropDown 
                    content={entry} 
                    onEdit={onEdit} 
                    onDelete={onDelete} 
                    contentId={entry.id} 
                    tagValue={tagValue}
                />
                 
                </div>      

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
        </AccordionDetails>
      </Accordion>
    )
}
