import React, {useState, useEffect} from "react";
import { Textarea } from "@mui/joy";
import SaveCancelDropDown from "../../components/saveCancelDropdown";
import EditDeleteDropDown from "../../components/EditDeleteDropdown";
import useTagHandler from "../../api/useTagHandler";
import { getTagIdsByType } from "../../utils/tagUtils";

import MultiSelect, {WrappedChip} from "./multiSelect";

export default function EntryRow({
    row, 
    onEdit, 
    onSave, 
    onDelete,
    selectedEntry, 
    setSelectedEntry

}) {
    const [observation, setObservation] = useState(row.observation || '' );
    const [solution, setSolution] = useState(row.solution || '');
    const { tagsData, handleTagIdsToAdd, handleTagsToCreate, handleInitialTagIds } = useTagHandler();
    
    const editing = selectedEntry && selectedEntry.id === row.id;
    const rowId = row && row.id;
    
    useEffect(() => {
        if(selectedEntry && row && selectedEntry.id === row.id){
            const tags = selectedEntry.tags;
            const situationTags = getTagIdsByType(tags, 'situation');
            const mindTags = getTagIdsByType(tags, 'mind');

            const initialState = {
                situation: { tagIdsToAdd: situationTags, tagsToCreate: [] },
                mind: { tagIdsToAdd: mindTags, tagsToCreate: [] }
            }   

            handleInitialTagIds(initialState);

        }
    },[selectedEntry])


    const handleChange = (e, field) => {
        if (field === 'observation') {
            setObservation(e.target.value);
        } else if (field === 'solution') {
            setSolution(e.target.value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave("edit", rowId, observation, solution, tagsData);
        setSelectedEntry(null);
    };

    return(
        <tr>
            <td>
                {editing ? 
                    (<Textarea
                        minRows={3}
                        value={observation}
                        onChange={(e) => handleChange(e, 'observation')}
                        placeholder={"Write your observation"}
                    />)
                : row.observation}
            </td>
            <td>
                {editing ? 
                    (<Textarea
                        minRows={3}
                        value={solution}
                        onChange={(e) => handleChange(e, 'solution')}
                        placeholder={"Write your observation"}
                    />)
                : row.solution}
            </td>
            <td>
                {editing ? 
                    (<SaveCancelDropDown 
                        onSave={(e)=> {
                             handleSubmit(e)}
                            }
                        onCancel={() => setSelectedEntry(null)}
                    />)
                : (
                    <EditDeleteDropDown 
                        onDelete={() => onDelete(row.id)}
                        onEdit={() => onEdit(row)}
                    />
                )}
            </td> 
            <td> 
            {editing ? (
                    <MultiSelect 
                        tagType="situation"
                        onTagIdsChange={(newTagIds) => handleTagIdsToAdd("situation", newTagIds)}
                        onTagsToCreateChange={(newTagsToCreate) => handleTagsToCreate("situation", newTagsToCreate)}
                        defaultValues={row.tags}
                    />
                ) : (
                    <>
                    {row.tags
                        .filter((tag) => (
                            tag.type === 'situation'
                            ))
                        .map((tag) => (
                        <WrappedChip key={tag.id}>{tag.note}</WrappedChip>
                    ))}
                    </>
                )} 
            </td> 
            <td>
            {editing ? (
                    <MultiSelect 
                        tagType="mind"
                        onTagIdsChange={(newTagIds) => handleTagIdsToAdd("mind", newTagIds)}
                        onTagsToCreateChange={(newTagsToCreate) => handleTagsToCreate("mind", newTagsToCreate)}
                        defaultValues={row.tags}
                    />
                ) : (
                    <>
                        {row.tags
                            .filter((tag) => (
                                tag.type === 'mind'
                                ))
                            .map((tag) => (
                            <WrappedChip key={tag.id}>{tag.note}</WrappedChip>
                        ))}
                    </>
                )} 
            </td> 
     </tr>
    )
}


// when add clicked, then multiselect is rendered 
// if there are tags -> then provide multiselect

