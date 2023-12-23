import React, {useEffect, useState} from 'react';
import { Box, Chip, styled, Select, Option } from '@mui/joy';
import { useEntriesByTagData } from '../../context/entriesByTagProvider';
import OptionModal from './optionModal';

export const WrappedChip = styled(Chip)(({ theme }) => ({
  '& .MuiChip-label': {
    overflow: 'hidden',
    maxWidth: '10ch', //
    textOverflow: 'ellipsis', // Add ellipsis for very long values
  },
}));


export default function MultiSelect({
  tagType, 
  onTagIdsChange, 
  onTagsToCreateChange,
  defaultValues
}) {
  const { formattedData } = useEntriesByTagData();
  const [openModal, setOpenModal] = useState(false);
  const [newOption, setNewOption] = useState('');
  const [options, setOptions] = useState([]);
 
  
  useEffect(() => {
    if(formattedData){
            const filteredData = formattedData
                .filter((item) => item.type === tagType)
                .map(({ id, label }) => ({ id, label }));
            setOptions(filteredData);
        }
    
  },[formattedData, tagType, defaultValues])

  const handleChange = (event, newValue) => {
    if (event && event.target.innerText === '+ Create an Option') {
      setOpenModal(true);
    }

    const parsedValue = newValue.map(item => JSON.parse(item))
    const extractTagIds = parsedValue.filter(item => Number.isInteger(item.id)).map(item => item.id)
    const extractCreate = parsedValue.filter(item => item.action === 'create')
    //for extracreate, if parsed string is not integer, then it is create (it would come with label)

    onTagsToCreateChange(extractCreate);
    onTagIdsChange(extractTagIds);
  };


  const handleAddOption = () => {
    if (newOption) {
      setOptions([...options, { id: `create-${newOption}`, label: newOption, action: 'create', tagType: tagType }]);
      // for option send to only id
      // for create send label // id can be also just newOption (label)
      
      setNewOption('');
    }
    setOpenModal(false);
  };
  const initialIds = defaultValues && defaultValues.map(item => item.id)
  return (
    <>
    { options.length > 0 && defaultValues.length > 0 ?
    (
      <>
      <Select 
        defaultValue={initialIds}
        multiple
        size="sm"
        onChange={handleChange}
        renderValue={(selected) => 
         { 
          return(
          <Box sx={{ display: 'flex', gap: '0.25rem' }}>
          {selected
          .filter(option => option.label !== "+ Create an Option")
          .map((selectedOption, index) => {
              return(
                  <WrappedChip key={index} variant="soft" color="primary">
                    {selectedOption.label}
                  </WrappedChip>
                );
              })};
        </Box>
        )
         }}
        sx={{
          minWidth: '15rem',
        }}
        slotProps={{
          listbox: {
            sx: {
              width: '100%',
            },
          },
        }}
      >
        {options && options.map((option, index) => {
        return(
          <Option 
            key={index}
            value={option.id}
          >
            {option.label} {option.id}
          </Option>
        )
      }
        )}
        <Option       
          value={"noOption"}
          >
              + Create an Option
          </Option>
      </Select>
      <OptionModal
        open={openModal}
        setOpen={setOpenModal}
        newOption={newOption}
        setNewOption={setNewOption}
        handleAddOption={handleAddOption} 
      />
      </>
    ) : <div>loading...</div>
  }
    </>
  );
}






// to do to switch from json stringify to just {id: a , label: x} 
// goal is match default value
// 1. set value = item.id ;  display item.label 
//2. set default value to item id (ensure that both option value and default value match) in terms of string or id. check 
//3. handle add new option -> when add new option, set value to {id: create-{index}, label: newOption}
//4. handle change -> CREATE: if id is not integer then should send those 'label information' along with tagType (received) -format data item = {label: newOption, type: tagType}
  // add -> just simply send ids (check entryTable handleSave function)
