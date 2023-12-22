
import React , {useState } from "react";
import { useAuthToken } from "../../components/useAuthToken";
import { Table } from "@mui/joy";
import axios from "axios";
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

    const handleSave = (entryId, observation, solution, tags, tagsToCreate) => {
        
        if(tagsToCreate.length > 0){
            const createTagPromises = tagsToCreate.map(item => {
                const data = { note: item.label, type: item.tagType };
                return createData("tags", data, jwtToken)
                .catch(error => {
                    console.error('Error creating tag:', item, error);
                    return null; 
                });
            });

            Promise.all(createTagPromises)
                .then((responses) => {
                    console.log('promise all', tags)
                    const newlyCreatedTagsId = responses.map(response => response.id);
                    let combined = [...newlyCreatedTagsId, ...tags];

                console.log('combined', combined)

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
                    // Handle the successful update of the entry
                    console.log('Entry updated:', updateResponse);
                    setDataChanged(true);
                })
                .catch(error => {
                    // Handle any errors that occurred during tag creation or entry update
                    console.error('Error in creating tags or updating entry:', error);
                });
        }
        else { // no new tags to create. just add tags 
            
            axios.put(`${BACKEND_URL}/entries/${entryId}`, {
                observation: observation,
                solution: solution,
                tagId: tags 
            }, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                }
            })
            .then((response) => {
                setDataChanged(true);
                console.log('response', response); 
                
                // Further actions on success
            })
            .catch((error) => {
                console.error(error);
                // Handle errors
            });
        }


        // if there is tags to create, then add to the entry 
        // axios. call create tags 
        // then call update entry with new tags  (use let )
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
