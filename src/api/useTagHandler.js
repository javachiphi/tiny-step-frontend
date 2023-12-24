// useTagHandler.js
import { useState } from 'react';
import { createData, updateData } from './apiService';
import { BACKEND_URL } from '../constants';
import axios from 'axios';


const useTagHandler = (jwtToken, setDataChanged) => {
    const [tagsData, setTagsData] = useState({
        situation: { tagIdsToAdd: [], tagsToCreate: [] },
        mind: { tagIdsToAdd: [], tagsToCreate: [] }
      });

    const handleTagIdsToAdd = (tagType, tagIdsToAdd) => {
        setTagsData(prevData => ({
            ...prevData,
            [tagType]: {
                ...prevData[tagType],
                tagIdsToAdd: tagIdsToAdd
            }
        }));
    };

    const handleTagsToCreate = (tagType, tagsToCreate) => {
        setTagsData(prevData => ({
            ...prevData,
            [tagType]: {
                ...prevData[tagType],
                tagsToCreate: tagsToCreate
            }
        }));
    };

  
   
    const handleSave = async (mode, entryId, observation, solution, tagsData) => {
        let allCreateTagPromises = [];
        let allTagIds = [];
    
        // step 1. Create all tags that don't exist yet
        Object.keys(tagsData).forEach((tagType) => {
            const { tagIdsToAdd, tagsToCreate } = tagsData[tagType];
            allTagIds.push(...tagIdsToAdd);
            const createTagPromises = tagsToCreate.map(item => createData("tags", item, jwtToken));
            allCreateTagPromises.push(...createTagPromises);
        });
    
        try {
            // step 2. Wait for all tag creation promises to resolve 
            const responses = await Promise.all(allCreateTagPromises.map(p => p.catch(e => e)));
    
            
            const newlyCreatedTagsId = responses
                .filter(response => response !== null && !(response instanceof Error))
                .map(response => response.id);
    
            let combined = [...allTagIds, ...newlyCreatedTagsId];
    
            // step 2.2 call the API to update the entry with tag ids
            const entryData = {
                observation,
                solution,
                tagId: combined
            }

            const modeActions = {
                create: () => createData("entries", entryData, jwtToken),
                edit: () => updateData(`entries/${entryId}`, entryData, jwtToken)
            };
            
            let response = modeActions[mode] 
            ? modeActions[mode]() 
            : console.log("Mode not specified");
            
        
            console.log('Entry updated:', response);
            setDataChanged(true);
        } catch (error) {
            // Handle any errors that occurred during tag creation or entry update
            console.error('Error in creating tags or updating entry:', error);
        }
    };
    

    return { tagsData, handleTagIdsToAdd, handleTagsToCreate, handleSave };
};

export default useTagHandler;
