import React, { useState } from 'react'
import { IconButton, Typography, Card, Chip } from '@mui/joy'
import TagForm from '../tagForm'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import DeleteIconButton from '../DeleteIconButton'
import { deleteData } from '../../api/apiService'
import { useAuthToken } from '../../context/tokenProvider'
import { getDate } from '../../utils/helpers'
import { useTheme } from '@mui/joy/styles'

export default function TagDetails({
  tag, //main Tag
  tagType,
  setDataChanged,
}) {
  const [editing, setEditing] = useState(false)
  const jwtToken = useAuthToken()
  const theme = useTheme()
  const textColor = theme.vars.palette.colors.text
  const chipColor = tagType === 'situation' ? '#F9B917' : '#52b6de'

  const handleDelete = async () => {
    //block delete if tag has entries.
    deleteData(`tags/${tag.id}`, null, jwtToken).then((response) => {
      setDataChanged(true)
    })
  }

  return (
    <Card color='background'>
      {editing ? (
        <TagForm
          mode='edit'
          selectedTag={tag}
          tagType={tagType}
          onClose={() => setEditing(false)}
          setDataChanged={setDataChanged}
        />
      ) : (
        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <Chip sx={{ backgroundColor: chipColor }} size='lg'>
                <Typography
                  level='h3'
                  fontWeight='lg'
                  sx={{ color: textColor }}
                >
                  {tag.note.charAt(0).toUpperCase() + tag.note.slice(1)}
                </Typography>
              </Chip>
              <Typography color='neutral' level='body-xs'>
                added on {getDate(tag.created_at)}
              </Typography>
            </div>
            <div className='hide-on-mobile'>
              <IconButton onClick={() => setEditing(true)}>
                <ModeEditOutlineOutlinedIcon />
              </IconButton>
              {/* <DeleteIconButton onClick={handleDelete} /> */}
            </div>
          </div>
          {tag.description && (
            <Typography level='h5' fontWeight='lg'>
              {tag.description}
            </Typography>
          )}
        </>
      )}
    </Card>
  )
}
