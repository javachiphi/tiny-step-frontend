import React, {useState, useEffect} from "react";
import { Textarea } from "@mui/joy";
import SaveCancelDropDown from "../../components/saveCancelDropdown";
import EditDeleteDropDown from "../../components/EditDeleteDropdown";
import useTagHandler from "../../api/useTagHandler";
import { getDate } from "../../utils/helpers";
import useCombinedTags from "../../api/useCombinedTags";

import MultiSelect, {WrappedChip} from "./multiSelect";

export default function EntryRow({
    row, 
    onEdit, 
    onSave, 
    onDelete,
    selectedEntry, 
    setSelectedEntry

}) {
    const { combinedTags, loading: combinedTagsLoading } = useCombinedTags();
    const [observation, setObservation] = useState(row.observation || '' );
    const [solution, setSolution] = useState(row.solution || '');
    const [mindOptions, setMindOptions] = useState([]);
    const [situOptions, setSituOptions] = useState([]);

    
    const { tagsData, handleTagIdsToAdd, handleTagsToCreate, handleInitialTagIds } = useTagHandler();

    const rowId = row && row.id;
    const editing = selectedEntry && selectedEntry.id === rowId;

    useEffect(() => {
        if(selectedEntry && editing){
            handleInitialTagIds(selectedEntry);

            if(combinedTags){
                // console.log('preparing options')
                const filterMind = combinedTags
                    .filter((item) => item.type === "mind")
                    .map(item => ({id: item.id, label: item.note}))
                setMindOptions(filterMind);
    
                const filterSitu = combinedTags
                    .filter((item) => item.type === "situation")
                    .map(item => ({id: item.id, label: item.note}))
                setSituOptions(filterSitu);
            }

        }
    },[selectedEntry, combinedTags])


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

    const handleMultiSelectChange = (tagType, newValue) => {
        const extractTagIds = newValue.filter(item => Number.isInteger(item))
        const extractCreate = newValue
            .filter(item => !Number.isInteger(item) && item !== 'noOption')
            .map(item => ({ note: item, type: tagType }))   
        handleTagsToCreate(tagType, extractCreate);
        handleTagIdsToAdd(tagType, extractTagIds);
    };
    

    return(
        <tr>
            <td>{getDate(row.createdAt)}</td>
            <td>
                {editing ? 
                    (<Textarea
                        minRows={4}
                        value={observation}
                        onChange={(e) => handleChange(e, 'observation')}
                        placeholder={"Write your observation"}
                    />)
                : row.observation}
            </td>
            <td>
                {editing ? 
                    (<Textarea
                        minRows={4}
                        value={solution}
                        onChange={(e) => handleChange(e, 'solution')}
                        placeholder={"Write your observation"}
                    />)
                : row.solution}
            </td>
            <td className="hide-on-mobile">
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
                    <>
                        <MultiSelect 
                            options={situOptions}
                            tagType="situation"
                            defaultValues={row.tags}
                            onSelectionChange={handleMultiSelectChange}
                            setOptions={setSituOptions}
                            mode="tableVersion"   
                        />
                        <MultiSelect 
                             options={mindOptions}
                             tagType="mind"
                             defaultValues={row.tags}
                             onSelectionChange={handleMultiSelectChange}
                             setOptions={setMindOptions} 
                             mode="tableVersion"  
                        />
                    </>
                    ) : (
                    <>
                        {row.tags
                            .filter((tag) => (tag.type === 'situation'))
                            .map((tag) => (
                            <WrappedChip color="primary" key={tag.id}>{tag.note}</WrappedChip>))
                        }
                        {row.tags
                            .filter((tag) => (tag.type === 'mind'))
                            .map((tag) => (
                            <WrappedChip key={tag.id}>{tag.note}</WrappedChip>))
                        }
                    </>
                    )} 
            </td>  
     </tr>
    )
}



