import React, { useState, useEffect } from 'react'; 
import { Box, Sheet, Typography, Textarea, Button } from '@mui/joy';
import axios from 'axios';
import { BACKEND_URL } from '../constants';
import TagSelect from './tagSelect';
import ModalForm from './modalForm';
import { useAuthToken } from './useAuthToken';


export default function EntryForm({entry, onClose, tagValue: initialTagValue}){
    const [observation, setObservation] = useState('');
    const [solution, setSolution] = useState('');
    const [data, setData] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const jwtToken = useAuthToken();
    const [tagValue, setTagValue] = useState('');


    useEffect(() => {
        if(entry && entry.id){
            console.log('entry form, set tag value received ', initialTagValue)
            setObservation(entry.observation || '');
            setSolution(entry.solution || '');
            // const initialTagValue = tagName && tagId ? {label: tagName, id: tagId} : null;
            setTagValue(initialTagValue || tagValue);

            console.log('initial tag value', initialTagValue)
        }

        console.log(entry)
        console.log('initialTag value', initialTagValue)
    },[entry, initialTagValue])

    const handleClick = () => {
        console.log('clicked')
        setModalOpen(true);
    }
    const handleChange = (e, type) => {
        const value = e.target.value;
        if(type === "observation"){
            setObservation(value);
            setData({"observation": value})
        } else if(type === "solution"){
            setSolution(value)
        }
    }
    const handleSubmit =(e) => {
        e.preventDefault();
  
        if(entry && entry.id){ // edit action (if entry & entry Id )

            
            axios.put(`${BACKEND_URL}/entries/${entry.id}`, {
                observation: observation,
                solution: solution,
                tagId: tagValue ?  [tagValue.id] : null
            }, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                }
            })
            .then((response) => {console.log('response', response.data)})
            .catch((error) => console.log(error))

        } else { // create action
                axios.post(`${BACKEND_URL}/entries`, {
                    observation: observation, 
                    solution: solution,
                    tagId: tagValue ? tagValue.id : null
                }, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    }
                })
                .then((response) => {
                    console.log('response', response.data);
                })
                .catch((error) =>{
                    console.log("error")
                })
        }
    }

    
// FIX: frontend mechanism of sending tag id! right now tag id is not being sent. 
    return(
        // <Sheet sx={{display: "flex", flexDirection: 'column', gap: "10px", margin: "100px"}}>
        <div style={{width: '800px'}}>
        <form onSubmit={handleSubmit}>
        <Box sx={{display: "flex", alignContent:"center",  justifyContent: 'center' , alignItems: 'baseline'}}>
            <Typography level="h1" sx={{marginTop: "50px", textAlign: "center"}}>
            {getToday()}
            </Typography>
            <Button type="submit" variant="outlined" color="neutral" disabled={solution === '' && observation === ''}>Save</Button>
            {/* {entry && <button onClick={onClose}>Close</button>} */}
        </Box>
        <TagSelect 
            jwtToken={jwtToken}
            tagValue={tagValue}
            setTagValue={setTagValue}
        /> 
        <Button onClick={handleClick}>Create a tag</Button>
         <ModalForm modalOpen={modalOpen} setModalOpen={setModalOpen} mode="create"/>
        <Box sx={{ display: 'flex', flexDirection: 'column'}}>
            Observation
            <Textarea
                minRows={3}
                value={observation}
                onChange={(e) => handleChange(e, 'observation')}
                placeholder={"Write your observation"}
            />
            Solution
            <Textarea
                minRows={3}
                value={solution}
                onChange={(e) => handleChange(e, 'solution')}
                placeholder={"What will you do about it?"}
            />
        </Box>
        
        </form>
        </div>
        // </Sheet>
    )
}




function getToday(){
    const today = new Date();
    const date = today.getDate();
    const options = {month: "short"};
    const year = today.getFullYear();
    const formattedMonth = new Intl.DateTimeFormat("en-US", options).format(today)
    
    return formattedMonth.concat(` ${date}, ${year}`)
}


