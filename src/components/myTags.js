import axios from 'axios';
import React, {useState, useEffect } from 'react';
import { BACKEND_URL } from '../constants';
import {IconButton, Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy"
import {MoreVert, DeleteIcon, EditIcon, MoreHoriz } from '@mui/icons-material';

import {Button, Typography, AccordionGroup, Accordion, AccordionDetails,AccordionSummary } from '@mui/joy';
import { getDate } from './entryList';

import ModalForm from './modalForm';

export default function MyTags(){
    const [ tags, setTags ] = useState([])
    
    const [openStates, setOpenStates] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTagForEdit, setSelectedTagForEdit] = useState(null);

    const handleEdit = (tag) => {
        setSelectedTagForEdit(tag);
        setModalOpen(true);
    }

    const handleDelete = (tagId, tagType) => {
        console.log('hey')
        let idsToDelete = [];
        idsToDelete.push(tagId);

        axios({
            url: `${BACKEND_URL}/tags/users/1`, //remove association 
            method: 'delete',
            data: idsToDelete,
          })
          .then((response) => {
            console.log('delete', response.data.message)
            // if user created the tag, then destroy the tag
            if(tagType === 'user_generated'){
                axios.delete(`${BACKEND_URL}/tags/${tagId}`)
                .then((response) => {
                    console.log('response', response);
                })
            }
          })
    }

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
                    key={tag.user_tags.tagId+ tag.note}
                    tag={tag}
                    index={index}
                    open={openStates[index]}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    setOpen={(value) => {
                        const newOpenStates = [...openStates];
                        newOpenStates[index] = value;
                        setOpenStates(newOpenStates)
                    }}
                />
            )}
        </AccordionGroup>
        {selectedTagForEdit && (
            <ModalForm
                mode={"edit"}
                editTagData={selectedTagForEdit}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
            />
        )}
    </div>)
}


function Tag({tag, open, setOpen, onDelete, onEdit, modalOpen, setModalOpen}){    
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
             <TagMore tag={tag} onEdit={onEdit} onDelete={onDelete} tagId={tag.user_tags.tagId} tagType={tag.type}/>
             </div>

            <Typography sx={{mb: 1}} fontSize="md">{tag.description}</Typography>
         
        </AccordionDetails>
      </Accordion>
        </>
    )
}


function TagMore({onDelete, tagId, tagType, onEdit, tag}){
    return(
        <Dropdown>
            <MenuButton
                slots={{ root: IconButton }}
                slotProps={{ root: { variant: 'plain', color: 'neutral' } }}
                sx={{width: '20px'}}
                
            >
                <MoreHoriz color='neutral'/>
                {/* edit */}
            </MenuButton>
            <Menu>
                <MenuItem onClick={() => onEdit(tag)}>
                    Edit
                </MenuItem>
                <MenuItem onClick={() => onDelete(tagId, tagType)}>Delete</MenuItem>
            </Menu>
        </Dropdown>
    )
}
