import React, {useEffect, useState} from 'react';
import { Box, Chip, styled, Select, Option } from '@mui/joy';
import OptionModal from './optionModal';
import  useCombinedTags from '../../api/useCombinedTags';

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
  const { combinedTags, loading: combinedTagsLoading } = useCombinedTags();
  const [openModal, setOpenModal] = useState(false);
  const [newOption, setNewOption] = useState('');
  const [options, setOptions] = useState([]);
 
  useEffect(() => {
    if(combinedTags){
            const filtered = combinedTags
                .filter((item) => item.type === tagType)
                .map(({ id, note }) => ({ id: id, label: note }));
            setOptions(filtered);
        }
    
  },[combinedTags, tagType, defaultValues])

  const handleChange = (event, newValue) => {
    if (event && event.target.innerText === '+ Create an Option') {
      setOpenModal(true);
    }

    const extractTagIds = 
      newValue.filter(item => Number.isInteger(item))


    const extractCreate = newValue
      .filter(item => !Number.isInteger(item) && item !== 'noOption')
      .map(item => ({ note: item, type: tagType }))
      
    onTagsToCreateChange(extractCreate);
    onTagIdsChange(extractTagIds);
  };


  const handleAddOption = () => {
    if (newOption) {
      setOptions([...options, { id: newOption, label: newOption }]);
      setNewOption('');
    }
    setOpenModal(false);
  };

  if(combinedTagsLoading){
    return <div>Loading combinedTags...</div>
  }


  const initialIds = defaultValues && defaultValues.map(item => item.id)
  const placeholder = tagType === "mind" ? "Select your tendency(mind)" : "Select your situation"
  const addLabel = tagType === "mind" ? "+ Add tendency(mind)" : "+ Add situation"
  return (
    <>
    { options.length > 0 && defaultValues ?
    (
      <>
      <Select 
        defaultValue={initialIds}
        multiple
        placeholder={placeholder}
        variant="outlined"
        onChange={handleChange}
        renderValue={(selected) => {
          if (selected.length > 1) {
            return (
              <Box sx={{ display: 'flex', gap: '0.25rem' }}>
                <WrappedChip variant="soft" color={tagType === "situation" ? "primary" : "neutral"}>
                  {selected[0].label}
                </WrappedChip>
                <WrappedChip color={tagType === "situation" ? "primary" : "neutral"}>
                  + {selected.length - 1}
                 </WrappedChip>
              </Box>
            );
          } else {
            return (
              <Box sx={{ display: 'flex', gap: '0.25rem' }}>
                {selected.map((selectedOption, index) => (
                  <WrappedChip key={index} variant="soft" color={tagType === "situation" ? "primary" : "neutral"}>
                    {selectedOption.label}
                  </WrappedChip>
                ))}
              </Box>
            );
          }
        }}
        
        sx={{
          minWidth: '12rem',
        }}
        slotProps={{
          listbox: {
            sx: {
              width: '100%',
            },
          },
        }}
      >
        <Option       
          value={"noOption"}
          >
            {addLabel}
          </Option>
        {options && options.map((option, index) => {
        return(
          <Option 
            key={index}
            value={option.id}
          >
            {option.label}
          </Option>
        )
      }
        )}
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




