
import React , {useState } from "react";
import { useAuthToken } from "../../components/useAuthToken";
import { Table, Tooltip } from "@mui/joy";
import axios from "axios";
import { BACKEND_URL } from "../../constants";
import EntryRow from "./entryRow";
import { createData } from "../../api/apiService";
import useTagHandler from "../../api/useTagHandler";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

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
    <Table sx={{ maxWidth: '1200px' }}>
      <thead>
        <tr>
            <th style={{ width: '5%' }}>Date</th>
            <th style={{ width: '50%' }}>Observation</th>   
            <th style={{ width: '20%'}}>
              <div style={{ display: 'flex'}}>
                Solution
                <Tooltip 
                  title="Write in 1 sentence for a cleaner view on checklist." 
                  variant="soft"
                  placement="top"
                >
                  <InfoOutlinedIcon fontSize="small"/>
                </Tooltip>
              </div>
            </th>   
            <th style={{ width: '5%' }}>Action</th>
            <th>Awareness</th>
            {/* <th>Mind</th> */}
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
