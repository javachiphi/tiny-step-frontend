import React from 'react'; 
import { getDate } from '../../utils/helpers';
import { Accordion, AccordionDetails, AccordionSummary, Typography, Drawer, Chip } from '@mui/joy';
import EntryForm from '../entryForm';
import EditDeleteDropDown from '../EditDeleteDropdown';
import { WrappedChip } from '../../pages/reflectPage/multiSelect';

export default function Entry({
    entry, 
    open,
    setOpen, 
    onDelete,
    onEdit, 
    onClose, 
    selectedEntry,
    openDrawerId,
    setDataChanged,
    tagType,
}){    
    const showOppositeTags = tagType === "mind" ? "situation" : "mind"
    const oppositeTags = entry.tags.filter((tag) => tag.type === showOppositeTags)
    return(
     <Accordion
        expanded={open}s
        onChange={(event, expanded) => {
            setOpen(expanded);
        }}
      >
        <AccordionSummary>
            <div style={{display: 'flex', gap: '20px', justifyContent: 'space-between'}}>
                <Typography color='neutral' level='body-sm'>{getDate(entry.created_at)}</Typography>
                <Typography fontSize="md" sx={{ml: '10px'}}>{entry.solution}</Typography>
            </div>
        </AccordionSummary>
        <AccordionDetails>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>
                    <Typography color="neutral" fontSize="sm" fontWeight="lg">{showOppositeTags}</Typography>
                        {
                            oppositeTags && oppositeTags.map((tag) => {
                                return (
                                    <Chip key={tag.id} fontSize="md" color={tag.type === "situation" ? "primary" : "neutral"}>
                                        {tag.note}
                                    </Chip>
                                )
                            })
                        }
                    <Typography sx={{mt: 1}} color="neutral" fontSize="sm" fontWeight="lg">
                        Observation
                    </Typography>
                        <Typography sx={{mb: 1}} fontSize="md">
                            {entry.observation}
                        </Typography>
                </div>
                <EditDeleteDropDown 
                    content={entry} 
                    onEdit={onEdit} 
                    onDelete={onDelete} 
                    contentId={entry.id} 
                />
                 
                </div>      

            <Drawer 
                anchor="right" 
                open={entry.id === openDrawerId} 
                onClose={onClose}
                size="lg"
            >
                {entry.id === openDrawerId && (
                    <EntryForm 
                        mode="edit"
                        entry={selectedEntry}
                        onClose={onClose}
                        setDataChanged={setDataChanged}
                    /> 
                )}
            </Drawer>
        </AccordionDetails>
      </Accordion>
    )
}

