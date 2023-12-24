
import React , {useState } from "react";
import { useAuthToken } from "../../components/useAuthToken";
import { Table } from "@mui/joy";
import axios from "axios";
import { BACKEND_URL } from "../../constants";
import EntryRow from "./entryRow";
import { createData } from "../../api/apiService";
import useTagHandler from "../../api/useTagHandler";

export default function TableEntryList({data, setDataChanged}) {
    const jwtToken = useAuthToken();
    const [selectedEntry, setSelectedEntry] = useState(null);
    const { handleSave } = useTagHandler(jwtToken, setDataChanged);
    const handleEdit = (entry) => {
        console.log('entry', entry)
        setSelectedEntry(entry);
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
  
  return (
    <form onSubmit={(e) => {console.log('table form'); e.preventDefault()}}>
    <Table sx={{ maxWidth: '900px' }}>
      <thead>
        <tr>
            <th>Observation</th>   
            <th>Solution</th>   
            <th>Action</th>
            <th>Situation</th>
            <th>Mind</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (  
            <EntryRow 
                key={row.id}
                row={row} 
                onEdit={handleEdit}
                onSave={handleSave}
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
