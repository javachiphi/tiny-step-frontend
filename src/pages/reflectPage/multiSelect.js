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
  const [initialSelect, setInitialSelect] = useState([]);
 
  
  useEffect(() => {
    if(formattedData){
      const filteredData = formattedData
          .filter((item) => item.type === tagType)
          .map(({ id, label }) => ({ id, label }));
      setOptions(filteredData);
  }

  const selectValues
        = defaultValues
          .filter(item => item.type === tagType)
          .map(item => ({ id: item.id, label: item.note }))  
        //  .map(item => JSON.stringify(item));

          console.log('selectValues', selectValues)

  setInitialSelect(selectValues);

  },[formattedData, tagType, defaultValues])

  const handleChange = (event, newValue) => {
    if (event && event.target.innerText === '+ Create an Option') {
      setOpenModal(true);
    }

    const parsedValue = newValue.map(item => JSON.parse(item))
    const extractTagIds = parsedValue.filter(item => Number.isInteger(item.id)).map(item => item.id)
    const extractCreate = parsedValue.filter(item => item.action === 'create')

    onTagsToCreateChange(extractCreate);
    onTagIdsChange(extractTagIds);
  };


  const handleAddOption = () => {
    if (newOption) {
      setOptions([...options, { id: `create-${newOption}`, label: newOption, action: 'create', tagType: tagType }]);
      setNewOption('');
    }
    setOpenModal(false);
  };

  
  return (
    <>
    <Select 
      multiple
      size="sm"
      defaultValue={initialSelect}
      onChange={handleChange}
      renderValue={(selected) => 
       { 
        console.log('selected', selected)
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
       }
      }
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
      {options && options.map((option) => (
        <Option 
          key={option.id}
          value={JSON.stringify(option)}
        >
          {option.label}
        </Option>
      )
      )}
      <Option       
        value={JSON.stringify({
            id: "noOption",
            label: "+ Create an Option"
          })}
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
  );
}


