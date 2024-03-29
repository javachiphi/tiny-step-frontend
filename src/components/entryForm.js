import React, { useState, useEffect } from 'react'
import { Box, Typography, Textarea, Button, Card } from '@mui/joy'
import { useAuthToken } from '../context/tokenProvider'
import { useNavigate, useLocation } from 'react-router-dom'
import useEntry from '../api/useEntry'
import useTagHandler from '../api/useTagHandler'
import MultiSelect from '../pages/tablePage/multiSelect'
import { getToday } from '../utils/helpers'
import useCombinedTags from '../api/useCombinedTags'
import { useTheme } from '@mui/joy/styles'
import { useSnackbar } from '../context/snackbarProvider'
import useInputState from '../api/useInputState'

export default function EntryForm({ mode, entry, onClose, setDataChanged }) {
  const [observation, handleObservationChange, setObservation] =
    useInputState('')
  const [solution, handleSolutionChange, setSolution] = useInputState('')
  const [mindOptions, setMindOptions] = useState([])
  const [situOptions, setSituOptions] = useState([])
  const { showSnackbar } = useSnackbar()
  const location = useLocation()

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
        if (location.pathname === '/reflect') {
          showSnackbar()
        }
      })
    } else {
      handleSave('create', null, observation, solution, tagsData).then(
        (data) => {
          if (data) {
            navigate(`/reflect`, {
              state: { newEntryId: data.id, newEntryTags: data.tags },
            })
          }
        },
      )
    }
  }

  const formId = mode === 'edit' ? entry && entry.id : 'create'
  const editExistingTags = mode === 'edit' ? entryTags?.tags : []

  // mandatory to provide situation. if not,cannot create.
  const noSituationSelected =
    tagsData.situation.tagIdsToAdd.length === 0 &&
    tagsData.situation.tagsToCreate.length === 0
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
              disabled={observation === '' || noSituationSelected}
              sx={{ padding: '10px' }}
            >
              Save
            </Button>
          </div>
          <Textarea
            minRows={5}
            value={observation}
            onChange={handleObservationChange}
            placeholder={'Observation'}
            sx={{ backgroundColor: '#fdf5eb', marginTop: '20px' }}
          />
          {combinedTagsLoading || (entryTagsLoading && mode === 'edit') ? (
            <Typography variant='body-sm'>Loading...</Typography>
          ) : (
            <MultiSelect
              options={situOptions}
              tagType='situation'
              defaultValues={editExistingTags}
              onSelectionChange={handleMultiSelectChange}
              setOptions={setSituOptions}
              mode='formVersion'
            />
          )}
          {showAdditionalFields && (
            <Box sx={{ marginTop: '20px' }}>
              {combinedTagsLoading || (entryTagsLoading && mode === 'edit') ? (
                <Typography variant='body-sm'>Loading...</Typography>
              ) : (
                <MultiSelect
                  options={mindOptions}
                  tagType='mind'
                  defaultValues={editExistingTags}
                  onSelectionChange={handleMultiSelectChange}
                  setOptions={setMindOptions}
                  mode='formVersion'
                />
              )}
              <Textarea
                minRows={1}
                value={solution}
                onChange={handleSolutionChange}
                placeholder={'Reflect: what will you do about it?'}
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
