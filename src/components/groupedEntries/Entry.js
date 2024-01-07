import React, { useEffect } from 'react'
import { getDate } from '../../utils/helpers'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Drawer,
  Chip,
} from '@mui/joy'
import EntryForm from '../entryForm'
import EditDeleteDropDown from '../EditDeleteDropdown'
import useEntry from '../../api/useEntry'

export default function Entry({
  entry,
  open,
  setOpen,
  onDelete,
  onEdit,
  onClose,
  selectedEntry,
  openDrawerId,
  setDataChanged,
  tagType,
}) {
  // useEffect(() => {
  //   if (!openDrawerId || !entry) return
  //   if (openDrawerId === entry && entry.id) {
  //   }
  // }, [openDrawerId, entry])

  // const { entry: entryTags, loading: entryTagsLoading } = useEntry(openDrawerId)

  // const showOppositeTags = tagType === 'mind' ? 'situation' : 'mind'
  // const oppositeTags = entryTags?.tags.filter(
  //   (tag) => tag.type === showOppositeTags,
  // )
  // console.log('entrytags', entryTags)

  return (
    <Accordion
      expanded={open}
      onChange={(event, expanded) => {
        setOpen(expanded)
      }}
    >
      <AccordionSummary>
        <div
          style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'space-between',
          }}
        >
          <div className='hide-on-mobile'>
            <Typography color='neutral' level='body-sm'>
              {getDate(entry.createdAt)}
            </Typography>
          </div>
          <Typography
            fontSize='md'
            sx={{ color: !entry.solution && '#828DAB', ml: '10px' }}
          >
            {entry.solution
              ?  entry.solution.charAt(0).toUpperCase() + entry.solution.slice(1)
              : `Reflect on "${entry.observation
                  .split(/\s+/)
                  .slice(0, 5)
                  .join(' ')}..."`}
          </Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Typography sx={{ mb: 1 }} fontSize='md'>
             {entry.observation}
            </Typography>
          </div>
          <EditDeleteDropDown
            content={entry}
            onEdit={onEdit}
            onDelete={onDelete}
            contentId={entry.id}
          />
        </div>
        <Drawer
          anchor='right'
          open={entry.id === openDrawerId}
          onClose={onClose}
          size='md'
          sx={{
            display: 'flex',
            '& .MuiDrawer-content': {
              alignItems: 'center',
              backgroundColor: '#fdf5eb',
            },
          }}
        >
          {entry.id === openDrawerId && (
            <EntryForm
              mode='edit'
              entry={selectedEntry}
              onClose={onClose}
              setDataChanged={setDataChanged}
            />
          )}
        </Drawer>
      </AccordionDetails>
    </Accordion>
  )
}
