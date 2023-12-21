
import React , {useState } from "react";
import { useAuthToken } from "../components/useAuthToken";
import { Table } from "@mui/joy";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import EntryRow from "./entryRow";




export default function TableEntryList({data, setDataChanged}) {
    const jwtToken = useAuthToken();
    const [selectedEntry, setSelectedEntry] = useState(null);

    const handleEdit = (entry) => {
        console.log('entry', entry)
        setSelectedEntry(entry);
        // setEditing(true);
    }

    const handleDelete = (entryId) => {
        axios({
            url: `${BACKEND_URL}/entries/${entryId}`,
            method: 'delete',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            }
        })
        .then((response) => {
            setDataChanged(true);
        })
    }

    const handleSave = (entryId, observation, solution) => {
        axios.put(`${BACKEND_URL}/entries/${entryId}`, {
            observation: observation,
            solution: solution,
            // tagId: entryData.tagId
        }, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            }
        })
        .then((response) => {
            setDataChanged(true);
            console.log('response', response)
            // Further actions on success
        })
        .catch((error) => {
            console.error(error);
            // Handle errors
        });
    };
  
  return (
    <form onSubmit={(e) => {console.log('table form'); e.preventDefault()}}>
    <Table sx={{ maxWidth: '900px' }}>
      <thead>
        <tr>
            <th>Tags</th>
            <th>Observation</th>   
            <th>Solution</th>   
            <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (  
            <EntryRow 
                key={row.id}
                row={row} 
                onEdit={handleEdit}
                onSave={handleSave}
                // onSave={handleButtonClicked}
                onDelete={handleDelete}
                selectedEntry={selectedEntry}
                setSelectedEntry={setSelectedEntry}
            />
        ))}
      </tbody>
    </Table>
    </form>
  );
}
