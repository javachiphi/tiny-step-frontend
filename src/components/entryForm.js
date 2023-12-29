import React, { useState, useEffect } from 'react'
import { Box, Typography, Textarea, Button, Card } from '@mui/joy'
import { useAuthToken } from './useAuthToken'
import { useNavigate } from 'react-router-dom'
import useEntry from '../api/useEntry'
import useTagHandler from '../api/useTagHandler'
import MultiSelect from '../pages/reflectPage/multiSelect'
import { getToday } from '../utils/helpers'
import useCombinedTags from '../api/useCombinedTags'
import { useTheme } from '@mui/joy/styles'

export default function EntryForm({ mode, entry, onClose, setDataChanged }) {
  const [observation, setObservation] = useState('')
  const [solution, setSolution] = useState('')
  const [mindOptions, setMindOptions] = useState([])
  const [situOptions, setSituOptions] = useState([])

  const jwtToken = useAuthToken()
  const navigate = useNavigate()

  const { entry: entryTags, loading: entryTagsLoading } = useEntry(
    entry && entry.id,
  )
  const { combinedTags, loading: combinedTagsLoading } = useCombinedTags()

  const [showAdditionalFields, setShowAdditionalFields] = useState(
    mode === 'edit',
  )

  const {
    tagsData,
    handleTagIdsToAdd,
    handleTagsToCreate,
    handleSave,
    handleInitialTagIds,
  } = useTagHandler(jwtToken, setDataChanged)
  const theme = useTheme()
  const primaryColor = theme.vars.palette.colors.primary.light

  useEffect(() => {
    // prepare for multiselect dropdown
    if (combinedTags) {
      console.log('preparing options')
      const filterMind = combinedTags
        .filter((item) => item.type === 'mind')
        .map((item) => ({ id: item.id, label: item.note }))
      setMindOptions(filterMind)

      const filterSitu = combinedTags
        .filter((item) => item.type === 'situation')
        .map((item) => ({ id: item.id, label: item.note }))
      setSituOptions(filterSitu)
    }
  }, [combinedTags])

  useEffect(() => {
    if (entry && entry.id) {
      setObservation(entry.observation || '')
      setSolution(entry.solution || '')
      const tags = entryTags?.tags

      if (tags) {
        handleInitialTagIds(entryTags) // display default in multiselect & iniital id set are different
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry, entryTags])

  const toggleAdditionalFields = () => {
    setShowAdditionalFields(!showAdditionalFields)
  }

  const handleChange = (e, type) => {
    const value = e.target.value
    if (type === 'observation') {
      setObservation(value)
    } else if (type === 'solution') {
      setSolution(value)
    }
  }

  const handleMultiSelectChange = (tagType, newValue) => {
    const extractTagIds = newValue.filter((item) => Number.isInteger(item))

    const extractCreate = newValue
      .filter((item) => !Number.isInteger(item) && item !== 'noOption')
      .map((item) => ({ note: item, type: tagType }))

    handleTagsToCreate(tagType, extractCreate)
    handleTagIdsToAdd(tagType, extractTagIds)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (entry && entry.id) {
      handleSave('edit', entry.id, observation, solution, tagsData).then(() => {
        setDataChanged(true)
        onClose()
      })
    } else {
      handleSave('create', null, observation, solution, tagsData).then(
        (response) => {
          if (response) {
            navigate('/reflect')
          }
        },
      )
    }
  }

  const formId = mode === 'edit' ? entry && entry.id : 'create'
  const editExistingTags = mode === 'edit' ? entryTags?.tags : []

  if (combinedTagsLoading || (entryTagsLoading && mode === 'edit')) {
    return <div>loading</div>
  }
  return (
    <Box>
      <Card
        style={{
          padding: '30px',
          width: '320px',
          marginTop: '50px',
          backgroundColor: '#fdf5eb',
        }}
      >
        <form id={formId} onSubmit={handleSubmit}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Typography
              level='h1'
              sx={{
                margin: '0 auto',
                textAlign: 'center',
                backgroundColor: '#fdf5eb',
              }}
            >
              {getToday()}
            </Typography>
            <Button
              type='submit'
              variant='outlined'
              color='neutral'
              disabled={observation === ''}
              sx={{ padding: '10px' }}
            >
              Save
            </Button>
          </div>
          <Textarea
            minRows={5}
            value={observation}
            onChange={(e) => handleChange(e, 'observation')}
            placeholder={'Observation'}
            sx={{ backgroundColor: '#fdf5eb', marginTop: '20px' }}
          />
          {showAdditionalFields && (
            <Box sx={{ marginTop: '20px' }}>
              <MultiSelect
                options={situOptions}
                tagType='situation'
                defaultValues={editExistingTags}
                onSelectionChange={handleMultiSelectChange}
                setOptions={setSituOptions}
                mode='formVersion'
              />
              <MultiSelect
                options={mindOptions}
                tagType='mind'
                defaultValues={editExistingTags}
                onSelectionChange={handleMultiSelectChange}
                setOptions={setMindOptions}
                mode='formVersion'
              />
              <Textarea
                minRows={1}
                value={solution}
                onChange={(e) => handleChange(e, 'solution')}
                placeholder={'Solution: what will you do about it?'}
                sx={{ backgroundColor: '#fdf5eb' }}
              />
            </Box>
          )}
          {mode === 'create' && !showAdditionalFields && (
            <Typography
              component='span'
              sx={{
                cursor: 'pointer',
                color: primaryColor,
                textDecoration: 'underline',
                paddingTop: '20px',
              }}
              onClick={toggleAdditionalFields}
            >
              + Show More
            </Typography>
          )}
        </form>
      </Card>
    </Box>
  )
}
