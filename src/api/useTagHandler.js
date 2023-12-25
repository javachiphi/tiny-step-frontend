// useTagHandler.js
import { useState } from 'react';
import { createData, updateData } from './apiService';
import { getTagIdsByType } from '../utils/tagUtils';

export const defaultState = {
    situation: { tagIdsToAdd: [], tagsToCreate: [] },
    mind: { tagIdsToAdd: [], tagsToCreate: [] }
};

const useTagHandler = (jwtToken, setDataChanged) => {
    const [tagsData, setTagsData] = useState(defaultState); 

    const handleInitialTagIds = (selectedEntry) => {
        const tags = selectedEntry.tags;

        const situationTags = getTagIdsByType(tags, 'situation');
        const mindTags = getTagIdsByType(tags, 'mind');

        const initialState = {
            situation: { tagIdsToAdd: situationTags, tagsToCreate: [] },
            mind: { tagIdsToAdd: mindTags, tagsToCreate: [] }
        }   

            console.log('setting initial state')
        setTagsData(initialState);
    };
 
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

    const handleSave = async (mode, entryId, observation, solution, receivedTags) => {
        // mode accepts "create" or "edit"
        let allCreateTagPromises = [];
        let allTagIds = [];
    
        // step 1. Create all tags that don't exist yet
        Object.keys(receivedTags).forEach((tagType) => {
            const { tagIdsToAdd, tagsToCreate } = receivedTags[tagType];
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
            console.log('combined', combined)
            // step 2.2 call the API to update the entry with tag ids
            const entryData = {
                observation: observation,
                solution: solution,
                tagId: combined
            }
            console.log('entryData', entryData)
            const modeActions = {
                create: () => createData("entries", entryData, jwtToken),
                edit: () => updateData(`entries/${entryId}`, entryData, jwtToken)
            };
            
            let response = modeActions[mode] 
            ? modeActions[mode]() 
            : console.log("Mode not specified");
            
        
            console.log('Entry updated:', response);
            if(mode === 'edit'){
                setDataChanged(true);
            }
        } catch (error) {
            // Handle any errors that occurred during tag creation or entry update
            console.error('Error in creating tags or updating entry:', error);
        }
    };
    

    return { 
        tagsData, 
        handleInitialTagIds,
        handleTagIdsToAdd, 
        handleTagsToCreate, 
        handleSave
    };
};

export default useTagHandler;
