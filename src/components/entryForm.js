import React, { useState } from 'react'; 
import { Box, Sheet, Typography, Textarea, Button } from '@mui/joy';
import axios from 'axios';
import { BACKEND_URL } from '../constants';
import TagSelect from './tagSelect';
import ModalForm from './modalForm';
import { useAuthToken } from './useAuthToken';




export default function EntryForm(){
    const [observation, setObservation] = useState('');
    const [solution, setSolution] = useState('');
    const [data, setData] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const jwtToken = useAuthToken();

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

        axios.post(`${BACKEND_URL}/entries`, {
            observation: observation, 
            solution: solution
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

    

    return(
        // <Sheet sx={{display: "flex", flexDirection: 'column', gap: "10px", margin: "100px"}}>
        <div style={{width: '800px'}}>
        <form onSubmit={handleSubmit}>
        <Box sx={{display: "flex", alignContent:"center",  justifyContent: 'center' , alignItems: 'baseline'}}>
            <Typography level="h1" sx={{marginTop: "50px", textAlign: "center"}}>
            {getToday()}
            </Typography>
            <Button type="submit" variant="outlined" color="neutral" disabled={solution === '' && observation === ''}>Save</Button>
        </Box>
        <TagSelect /> 
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


