
import React , {useState } from "react";
import { useAuthToken } from "../../components/useAuthToken";
import { Table } from "@mui/joy";
import axios, { all } from "axios";
import { BACKEND_URL } from "../../constants";
import EntryRow from "./entryRow";
import { createData } from "../../api/apiService";




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

    const handleSave = (entryId, observation, solution, tagsData) => {

        let allCreateTagPromises = [];
        let allTagIds = [];

        Object.keys(tagsData).forEach((tagType) => {
            const {tagIdsToAdd, tagsToCreate} = tagsData[tagType];

            allTagIds.push(...tagIdsToAdd);

            const createTagPromises = tagsToCreate.map(item => {
                return createData("tags", item, jwtToken)
                .catch(error => {
                    console.error('Error creating tag:', item, error);
                    return null; 
                });
            });

            allCreateTagPromises.push(...createTagPromises);
        });

        Promise.all(allCreateTagPromises)
            .then((responses) => {
                const newlyCreatedTagsId 
                    = responses
                        .filter(response => response !== null)
                        .map(response => response.id);

                let combined = [...allTagIds, ...newlyCreatedTagsId];

                return axios.put(`${BACKEND_URL}/entries/${entryId}`, {
                    observation: observation,
                    solution: solution,
                    tagId: combined // call combined instead

                }, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    }
                })
                })
            .then(updateResponse => {
                console.log('Entry updated:', updateResponse);
                setDataChanged(true);
            })
            .catch(error => {
                console.error('Error in creating tags or updating entry:', error);
            });
    };
  
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
