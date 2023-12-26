import React, {useState} from 'react';
import {  Box, Textarea, Input, Typography } from '@mui/joy';
import { useAuthToken } from './useAuthToken';
import { updateData, createData } from '../api/apiService';
import SaveCancelDropDown from './saveCancelDropdown';

export default function TagForm({
    mode, 
    selectedTag, 
    onClose, 
    tagType
}){
    const [note, setNote ] = useState(mode === 'Edit' ? selectedTag.note : '');
    const [description, setDescription] = useState(mode === 'Edit' ? selectedTag.description : '');
    const jwtToken = useAuthToken();

    const handleChange = (e,type) => {
        const inputValue = e.target.value;
        if(type === 'note'){
            setNote(inputValue)
        } else if(type === 'description'){
            setDescription(inputValue)
        }

    }
    const handleSubmit =(e) => {
        e.preventDefault();
        e.stopPropagation();
        const data = {
            note: note,
            description: description,
            type: tagType
        }
        console.log('data', data)
        if(mode ==="Edit") {
            updateData(`tags/${selectedTag.id}`, data, jwtToken)
            .then((response) => {
                console.log(response) // need to refresh data? 
                onClose(); // Edit mode close
            })
        } else { // mode === "create" 
            console.log('hey creating');
            createData('tags', data, jwtToken)
            .then((response) => {
                console.log('hey need to refresh combinedTags')
                onClose(); // close the drawer
            })
            .catch((error) => console.log(error));
        }


    }
    return(
        <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Typography level='h3'>{mode} {selectedTag.note}</Typography>
            <SaveCancelDropDown 
                onCancel={onClose}
                onSave={(e) =>handleSubmit(e)}
            />
            </div>
                <Box sx={{display: "flex", flexDirection:"column"}}>
                    <Input
                        value={note}
                        onChange={(e) => handleChange(e, 'note')}
                        placeholder="write a tag"
                    />
                    <Textarea 
                        value={description}
                        minRows={3}
                        onChange={(e) => handleChange(e, 'description')}
                        placeholder="write a description"
                    />
                </Box>
        </form>
    )
}