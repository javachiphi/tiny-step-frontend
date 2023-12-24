import React, { useState, useEffect, useMemo } from 'react'; 
import { Box, Typography, Textarea, Button } from '@mui/joy';
import { useAuthToken } from './useAuthToken';
import { useNavigate } from 'react-router-dom';
import useEntry from '../api/useEntry';
import useTagHandler from '../api/useTagHandler';
import MultiSelect from '../pages/reflectPage/multiSelect';
import { getTagIdsByType } from '../utils/tagUtils'
import { getToday } from '../utils/helpers';

export default function EntryForm({mode, entry, onClose, setDataChanged}){
    const [observation, setObservation] = useState('');
    const [solution, setSolution] = useState('');
    const jwtToken = useAuthToken();
    const navigate = useNavigate();
     
    const {entry: entryTags, loading: entryTagsLoading} = useEntry(entry && entry.id);

    const { 
        tagsData,
        handleTagIdsToAdd, 
        handleTagsToCreate, 
        handleSave, 
        handleInitialTagIds 
    } = useTagHandler(jwtToken, setDataChanged);


    useEffect(() => {
        if(entry && entry.id){
            setObservation(entry.observation || '');
            setSolution(entry.solution || '');
            const tags = entryTags?.tags || [];
         
            const situationTags = getTagIdsByType(tags, 'situation');
            const mindTags = getTagIdsByType(tags, 'mind');

            const initialState = {
                situation: { tagIdsToAdd: situationTags, tagsToCreate: [] },
                mind: { tagIdsToAdd: mindTags, tagsToCreate: [] }
            }
            
            handleInitialTagIds(initialState); // display default in multiselect & iniital id set are different 
        }

    },[entry, entryTags])



    const handleChange = (e, type) => {
        const value = e.target.value;
        if(type === "observation"){
            setObservation(value);
        } else if(type === "solution"){
            setSolution(value)
        }
    }
    const handleSubmit =(e) => {
        e.preventDefault();

        if(entry && entry.id){
        handleSave("edit", entry.id, observation, solution, tagsData)
        .then(() => {
            setDataChanged(true); 
            onClose();
        })
        } else {
            handleSave("create", null, observation, solution, tagsData)
            .then(() => {
                navigate('/reflect');
               console.log('then is working?')
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
                        sx={{margin: "0 auto",textAlign: "center"}}
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
                {
                    entryTagsLoading && mode !== "create" ? (
                        <div>loading</div>
                    ): (
                    <>
                    <Typography>
                        Situation
                    </Typography>
       
                        <MultiSelect 
                            tagType="situation"
                            onTagIdsChange={(newTagIds) => handleTagIdsToAdd("situation", newTagIds)}
                            onTagsToCreateChange={(newTagsToCreate) => handleTagsToCreate("situation", newTagsToCreate)}
                            defaultValues={(entryTags && entryTags.tags) || []}
                        />

        
                    </>
                    )
                }
                </div>
                <div>
                {
                    entryTagsLoading && mode !== "create" ? (
                        <div>loading</div>
                    ): (
                    <>
                    <Typography>
                        Mind
                    </Typography>
       
                        <MultiSelect 
                            tagType="mind"
                            onTagIdsChange={(newTagIds) => handleTagIdsToAdd("mind", newTagIds)}
                            onTagsToCreateChange={(newTagsToCreate) => handleTagsToCreate("mind", newTagsToCreate)}
                            defaultValues={(entryTags && entryTags.tags) || []}
                        />

        
                    </>
                    )
                }
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


