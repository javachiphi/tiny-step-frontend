import React from 'react';
import {Typography, Accordion, AccordionDetails,AccordionSummary } from '@mui/joy';
import { getDate } from './helpers';
import EditDeleteDropDown from './EditDeleteDropdown';


export default function Tag({
    tag,
    open, 
    setOpen, 
    onDelete, 
    onEdit, 
    modalOpen, 
    setModalOpen
}){    
    return(
        <>
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
            <div style={{display: 'flex', alignItems: 'end', justifyContent: 'space-between'}}>
             {  tag.type === 'user_generated' ? 
            (<Typography color='neutral' level='body-sm' sx={{mb: 1}}>added on {getDate(tag.user_tags.createdAt)}</Typography>)
            : (<Typography color='neutral' level='body-sm' sx={{mb: 1}}>selected on {getDate(tag.user_tags.createdAt)}</Typography>)
            }
             <EditDeleteDropDown content={tag} onEdit={onEdit} onDelete={onDelete} contentId={tag.user_tags.tagId} tagType={tag.type}/>
             </div>

            <Typography sx={{mb: 1}} fontSize="md">{tag.description}</Typography>
         
        </AccordionDetails>
      </Accordion>
        </>
    )
}
