import React, { useState, useEffect } from 'react'; 
import { Box, Sheet, Typography, Textarea, Button } from '@mui/joy';
import axios from 'axios';
import { BACKEND_URL } from '../constants';
import TagSelect from './tagSelect';
import ModalForm from './modalForm';
import { useAuthToken } from './useAuthToken';
import { useNavigate } from 'react-router-dom';


export default function EntryForm({entry, onClose, tagValue: initialTagValue, setDataChanged}){
    const [observation, setObservation] = useState('');
    const [solution, setSolution] = useState('');
    const [data, setData] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const jwtToken = useAuthToken();
    const [tagValue, setTagValue] = useState('');
    const [checkTagCreation, setCheckTagCreation] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        if(entry && entry.id){
            setObservation(entry.observation || '');
            setSolution(entry.solution || '');
            setTagValue(initialTagValue || tagValue);
        }
    },[entry, initialTagValue])

    const handleOpenTagModal = (e) => {
        e.stopPropagation();
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
  
        if(entry && entry.id){ 
            axios.put(`${BACKEND_URL}/entries/${entry.id}`, {
                observation: observation,
                solution: solution,
                tagId: tagValue ?  [tagValue.id] : null
            }, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                }
            })
            .then((response) => {
                console.log('response', response.data)
                setDataChanged(true);
                onClose();
            })
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
                    navigate('/diary');
                })
                .catch((error) =>{
                    console.log("error")
                })
        }
    }


    return(
        <div style={{display: 'flex', justifyContent:'center', alignItems: 'center'}}>
            <div style={{width: '800px'}}>
                <form onSubmit={handleSubmit}>
                <div style={{
                        display: "flex", 
                        justifyContent: 'flex-end' 
                        }}
                >
                    <Typography 
                        level="h1" 
                        sx={{
                            margin: "0 auto",
                            textAlign: "center"
                            }}
                    >
                        {getToday()}
                    </Typography>
                    <Button 
                        type="submit" 
                        variant="outlined" 
                        color="neutral"
                        disabled={solution === '' && observation === ''}
                        sx={{
                            padding: '10px'
                        }}
                    >
                        Save
                    </Button>
                </div>
                <div>
                    <TagSelect 
                        jwtToken={jwtToken}
                        tagValue={tagValue}
                        setTagValue={setTagValue}
                        checkTagCreation={checkTagCreation}
                        setCheckTagCreation={setCheckTagCreation}
                    /> 
                    <Button type="button" onClick={(e) => handleOpenTagModal(e)}>
                        Create a tag
                    </Button>
                    <ModalForm
                        modalOpen={modalOpen}
                        setModalOpen={setModalOpen}
                        mode="create"
                        setCheckTagCreation={setCheckTagCreation}
                    />
                </div>
                <Box>
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
        </div>
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


