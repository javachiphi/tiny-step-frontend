import React, { useEffect, useState } from 'react'
import { fetchData } from '../../api/apiService'
import { useAuthToken } from '../../components/useAuthToken'
import TableEntryList from './entryTable'
import { Button, Sheet, Typography, Box, Chip } from '@mui/joy'
import Add from '@mui/icons-material/Add'
import { Link } from 'react-router-dom'
import ToggleButton from '../../components/toggleButton'
import PageTitle from '../../components/pageTitle'

const rowsPerPage = 10

export default function ReflectPage() {
  const [entries, setEntries] = useState([])
  const [dataChanged, setDataChanged] = useState(false)
  const jwtToken = useAuthToken()
  const [checked, setChecked] = useState(false)

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(null)

  useEffect(() => {
    if (!jwtToken) return

    const endpoint = checked
      ? `entries/filtered?page=${page}&limit=${rowsPerPage}`
      : `entries?page=${page}&limit=${rowsPerPage}`

    fetchData(endpoint, jwtToken).then((data) => {
      console.log('fetched data', data)
      setEntries(data?.rows || [])
      setTotalPages(data?.totalPages || null)
    })

    if (dataChanged) {
      setDataChanged(false)
    }
  }, [jwtToken, dataChanged, checked, page])

  const handleChecked = (event) => {
    setChecked(event.target.checked)
  }

  const handleChangePage = (newPage) => {
    setPage(newPage)
  }

  if (!jwtToken) {
    return <div>Loading...</div>
  }

  const label = checked === true ? 'View Incomplete' : 'View All'
  return (
    <div>
      <PageTitle title='Reflect' />
      {/* <h1 className="text-center">Reflect Page</h1> */}
      <HowToDescription />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px' }}
        >
          <div style={{ display: 'flex', alignSelf: 'flex-end', gap: '10px' }}>
            <Typography sx={{ alignSelf: 'center' }}> {label}</Typography>
            <ToggleButton checked={checked} handleChecked={handleChecked} />
          </div>
          <Button
            color='primary'
            sx={{ alignSelf: 'flex-end' }}
            component={Link}
            to='/create'
            startDecorator={<Add />}
          >
            Add
          </Button>
        </div>
        <Box variant='outlined'>
          <Sheet
            className='table-container'
            sx={{ height: 700, overflow: 'auto' }}
          >
            <TableEntryList
              entries={entries}
              setDataChanged={setDataChanged}
              page={page}
              totalPages={totalPages}
              onChangePage={handleChangePage}
            />
          </Sheet>
        </Box>
      </div>
    </div>
  )
}

function HowToDescription() {
  return (
    <>
      <Typography sx={{ fontWeight: 700 }}>How To</Typography>
      <ol>
        <li>
          Add Solution and Awareness tags <Chip color='primary'>Situation</Chip>{' '}
          <Chip color='neutral'>Mind</Chip>
        </li>
        <li>View results in checklist page.</li>
      </ol>
    </>
  )
}

// step 1. Add Solution and Awareness tags (situation, mind).
