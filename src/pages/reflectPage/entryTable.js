
import React , {useState } from "react";
import { useAuthToken } from "../../components/useAuthToken";
import { Table, Tooltip } from "@mui/joy";
import axios from "axios";
import { BACKEND_URL } from "../../constants";
import EntryRow from "./entryRow";
import useTagHandler from "../../api/useTagHandler";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { styledTable } from "./entryTableStyles";
import TablePagination from "./tablePagination";


const rowsPerPage = 10;

export default function TableEntryList({
  entries, 
  page,
  totalPages,
  setDataChanged,
  onChangePage,
}) {
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
  const placeholderCount = rowsPerPage - entries.length;
  return (
    <form onSubmit={(e) => {console.log('table form'); e.preventDefault()}}>
    <Table 
      variant="soft"
      sx={styledTable}
      stickyHeader
      stickyFooter
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
            <th>Awareness</th>
            <th className="hide-on-mobile" style={{ width: '5%', fontWeight: 800 }}>Reflect</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((row) => (  
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
        {placeholderCount > 0 && Array.from({ length: placeholderCount }).map((_, index) => (
          <tr key={index}>
            <td colSpan={5} />
          </tr>
        ))}
      </tbody>
      <TablePagination 
        rows={entries}
        page={page}
        totalPages={totalPages}
        onChangePage={onChangePage}
      />
    </Table>
    </form>
  );
}



