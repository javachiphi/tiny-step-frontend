import React, {useState} from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../constants';
import { Button, Box, Textarea, Input, Typography } from '@mui/joy';



export default function TagForm(){
    const [note, setNote ] = useState('');
    const [ description, setDescription] = useState('');

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

        console.log('hey creating');
        // body 
        axios.post(`${BACKEND_URL}/tags`, {
            note: note,
            description: description
        })
        .then((response) => {
           console.log('response', response.data.id)
           const idsToAdd = []
           idsToAdd.push(response.data.id)

           axios.post(`${BACKEND_URL}/tags/users/1`, { idsToAdd })
           .then((response) => {
            console.log("add tag to a user", response.data)
           })

        } 
        )
        .catch((error) => console.log(error));


    }
    return(
        <form onSubmit={handleSubmit}>
            <Box sx={{display: "flex", flexDirection:"column", width: "600px"}}>
            <Typography level='h3'>Create a Tag</Typography>
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
             inputvalue: {note}
             description: {description}
            <Button type="submit" variant="outlined">click submit</Button>
            </Box>
        </form>
    )
}