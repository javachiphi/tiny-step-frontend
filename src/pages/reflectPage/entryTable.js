
import React , {useState } from "react";
import { useAuthToken } from "../../components/useAuthToken";
import { Table, Tooltip } from "@mui/joy";
import axios from "axios";
import { BACKEND_URL } from "../../constants";
import EntryRow from "./entryRow";
import useTagHandler from "../../api/useTagHandler";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { styledTable } from "./entryTableStyles";


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
    <Table 
      variant="soft"
      sx={styledTable}
    >
      <thead>
        <tr>
            <th style={{ width: '5%' }}>Date</th>
            <th className="mobile-width-30">Observation</th>   
            <th style={{ width: '20%' }}>
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
            <th className="hide-on-mobile" style={{ width: '5%' }}>Action</th>
            <th>Awareness</th>
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
