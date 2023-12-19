
import React, {useState, useEffect } from 'react';
import { BACKEND_URL } from '../constants';
import {Button, AccordionGroup} from '@mui/joy';
import axios from 'axios';
import TagAccordion from './tagAccordion';
import ModalForm from './modalForm';
import { useAuthToken } from './useAuthToken';

export default function TagsAccorGroup(){
    const [ tags, setTags ] = useState([])
    const [openStates, setOpenStates] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTagForEdit, setSelectedTagForEdit] = useState(null);
    const [dataChanged, setDataChanged] = useState(false);
    const jwtToken = useAuthToken()


    useEffect(() => {
        if(jwtToken){
            axios.get(`${BACKEND_URL}/tags/users/my`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                }
            })
            .then((response) => {   
                const myTags = response.data;
                setTags(myTags)
                setOpenStates(Array(myTags.length).fill(false))
            })
            .catch((error)=> console.log(error))

            if(dataChanged === true){
                setDataChanged(false);
            }
        }
    },[jwtToken, dataChanged])
    

    const handleEdit = (tag) => {
        setSelectedTagForEdit(tag);
        setModalOpen(true);
    }

    const handleDelete = (tagId, tagType) => {
        console.log('hey')
        let idsToDelete = [];
        idsToDelete.push(tagId);

        axios({
            url: `${BACKEND_URL}/tags/users/my`, 
            method: 'delete',
            data: idsToDelete,
            headers: {
                Authorization: `Bearer ${jwtToken}`, // test if delete works
            }
          })
          .then((response) => {
            console.log('delete', response.data.message)
            if(tagType === 'user_generated'){
                axios.delete(`${BACKEND_URL}/tags/${tagId}`)
                .then((response) => {
                    console.log('response', response);
                })
            }

            setDataChanged(true);
          })
    }

    const toggleAll = (value) => {    
        const newOpenStates = Array(openStates.length).fill(value);
        setOpenStates(newOpenStates);
      };

    return(
    <div>
        <div>
            <Button color="neutral" variant="outlined" onClick={() => toggleAll(true)}> Open All</Button>
            <Button color="neutral" variant="outlined" onClick={() => toggleAll(false)}>Close All</Button>
        </div>
        <AccordionGroup sx={{ maxWidth: 400 }}>
            {tags.map((tag, index) => 
                <TagAccordion 
                    key={tag.user_tags.tagId+ tag.note}
                    tag={tag}
                    index={index}
                    open={openStates[index]}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    setOpen={(value) => {
                        const newOpenStates = [...openStates];
                        newOpenStates[index] = value;
                        setOpenStates(newOpenStates)
                    }}
                />
            )}
        </AccordionGroup>
        {selectedTagForEdit && (
            <ModalForm
                mode={"edit"}
                editTagData={selectedTagForEdit}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                setDataChanged={setDataChanged}
            />
        )}
    </div>)
}


