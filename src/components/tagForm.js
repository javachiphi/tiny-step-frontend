import React, {useState} from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../constants';
import { Button, Box, Textarea, Input, Typography } from '@mui/joy';
import { useAuthToken } from './useAuthToken';



export default function TagForm({
    mode, 
    editTagData, 
    setModalOpen, 
    setDataChanged,
    setCheckTagCreation
}){
    const [note, setNote ] = useState(mode === 'edit' ? editTagData.note : '');
    const [description, setDescription] = useState(mode === 'edit' ? editTagData.description : '');
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

        if(mode ==="edit") {
            console.log('edit submitted!')
            const tagId = editTagData.user_tags.tagId;

            axios.put(`${BACKEND_URL}/tags/${tagId}`, {
                note: note,
                description: description,
                type: "user_generated"
            })
            .then((response) => {
                console.log(response.data)
                setDataChanged(true); // this will trigger a re-render of the tag list
                setModalOpen(false);
                
            })


        } else { // mode === "create" 
                console.log('hey creating');

                axios.post(`${BACKEND_URL}/tags`, {
                        note: note,
                        description: description,
                        type: "user_generated"
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${jwtToken}`,
                        }
                    }
                )
                .then((response) => {
                    console.log('response', response.data.id)
                    const idsToAdd = []
                    idsToAdd.push(response.data.id)

                    axios.post(`${BACKEND_URL}/tags/users/my`, { idsToAdd }, 
                    {
                        headers: {
                            Authorization: `Bearer ${jwtToken}`,
                        }
                    })
                .then((response) => {
                    setCheckTagCreation(true); //this updates tagSelect list
                    setModalOpen(false)
                    console.log("add tag to a user", response.data)
                })

                } 
                )
                .catch((error) => console.log(error));
        }


    }
    return(
        <form onSubmit={handleSubmit}>
            <Box sx={{display: "flex", flexDirection:"column"}}>
            <Typography level='h3'>{mode}</Typography>
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
            <Button type="submit" variant="outlined">submit</Button>
            </Box>
        </form>
    )
}