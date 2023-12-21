import React, {useState} from "react";
import { Textarea } from "@mui/joy";
import SaveCancelDropDown from "./saveCancelDropdown";
import EditDeleteDropDown from "../components/EditDeleteDropdown";

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

    const editing = selectedEntry && selectedEntry.id === row.id;
    const rowId = row && row.id;

    const handleChange = (e, field) => {
        if (field === 'observation') {
            setObservation(e.target.value);
        } else if (field === 'solution') {
            setSolution(e.target.value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('entry row handle submit')
        console.log()
        onSave(rowId, observation, solution);
        setSelectedEntry(null);
    };

    return(
        <tr>
            <td>{row.tags.map((tag) => (
            <div key={tag.id}>{tag.note}</div>
        ))}
        ...
            </td>
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
                )
                }
            </td>   
     </tr>
    )
}