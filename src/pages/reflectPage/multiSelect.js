import React, { useEffect, useState } from 'react'
import { Box, Chip, styled, Select, Option } from '@mui/joy'
import OptionModal from './optionModal'

export const WrappedChip = styled(Chip)(({ theme }) => ({
  '& .MuiChip-label': {
    overflow: 'hidden',
    maxWidth: '15ch', //
    textOverflow: 'ellipsis', // Add ellipsis for very long values
  },
}))

export default function MultiSelect({
  options,
  tagType,
  onSelectionChange,
  defaultValues,
  setOptions,
  mode,
}) {
  const [openModal, setOpenModal] = useState(false)
  const [newOption, setNewOption] = useState('')
  const [selectedValues, setSelectedValues] = useState(
    defaultValues.map((item) => item.id),
  )

  const addLabel =
    tagType === 'mind' ? '+ Add tendency(mind)' : '+ Add situation'

  const handleChange = (event, newValue) => {
    if (event && event.target.innerText === addLabel) {
      setOpenModal(true)
    }
    setSelectedValues(newValue)
    onSelectionChange(tagType, newValue)
  }

  const handleAddOption = () => {
    if (newOption) {
      const newOptions = [...options, { id: newOption, label: newOption }]

      setOptions(newOptions)
      setSelectedValues([...selectedValues, newOption])
      onSelectionChange(tagType, [...selectedValues, newOption])
      setNewOption('')
    }
    setOpenModal(false)
  }

  const initialIds = defaultValues && defaultValues.map((item) => item.id)
  const placeholder =
    tagType === 'mind' ? 'Select your tendency(mind)' : 'Select your situation'

  const renderValueFormVersion = (selected, tagType) => {
    return (
      <Box sx={{ display: 'flex', gap: '0.25rem' }}>
        {selected
          .filter((selectedOption, index) => selectedOption.label !== addLabel)
          .map((selectedOption, index) => (
            <WrappedChip
              key={index}
              variant='soft'
              color={tagType === 'situation' ? 'primary' : 'neutral'}
            >
              {selectedOption.label}
            </WrappedChip>
          ))}
      </Box>
    )
  }

  const renderValueTableVersion = (selected, tagType) => {
    const selectedItems = selected.filter(
      (selectedOption, index) => selectedOption.label !== addLabel,
    )
    if (selectedItems.length > 1) {
      return (
        <Box sx={{ display: 'flex', gap: '0.25rem' }}>
          <WrappedChip
            variant='soft'
            color={tagType === 'situation' ? 'primary' : 'neutral'}
          >
            {selectedItems[0].label}
          </WrappedChip>
          <WrappedChip color={tagType === 'situation' ? 'primary' : 'neutral'}>
            + {selectedItems.length - 1}
          </WrappedChip>
        </Box>
      )
    } else {
      return (
        <Box sx={{ display: 'flex', gap: '0.25rem' }}>
          {selectedItems.map((selectedOption, index) => (
            <WrappedChip
              key={index}
              variant='soft'
              color={tagType === 'situation' ? 'primary' : 'neutral'}
            >
              {selectedOption.label}
            </WrappedChip>
          ))}
        </Box>
      )
    }
  }

  return (
    <>
      {options && (
        <>
          <Select
            color='primary'
            value={selectedValues}
            multiple
            placeholder={placeholder}
            variant='outlined'
            onChange={handleChange}
            // renderValue={(selected) => renderValue(selected, tagType)}
            renderValue={
              mode === 'tableVersion'
                ? (selected) => renderValueTableVersion(selected, tagType)
                : (selected) => renderValueFormVersion(selected, tagType)
            }
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
            {options &&
              options.map((option, index) => {
                return (
                  <Option key={index} value={option.id}>
                    {option.label}
                  </Option>
                )
              })}
            <Option value={'noOption'}>{addLabel}</Option>
          </Select>
          <OptionModal
            open={openModal}
            setOpen={setOpenModal}
            newOption={newOption}
            setNewOption={setNewOption}
            handleAddOption={handleAddOption}
          />
        </>
      )}
    </>
  )
}
