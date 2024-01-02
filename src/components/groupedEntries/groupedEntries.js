import React, { useEffect, useState } from 'react'
import EntryList from './entryList'
import { Tabs, TabPanel, TabList, Tab, Skeleton, Typography } from '@mui/joy'
import TagDetails from './tagDetails'
import useUserTags from '../../api/useUserTags'

const styledTab = {
  '&.Mui-selected, &&:hover': {
    backgroundColor: '#F4E6D4',
  },
}

export default function GroupedEntries({ tagType, newEntryId, newEntryTags }) {
  const [data, setData] = useState(null)
  const { userTags, loading: userTagsloading } = useUserTags({ tagType })
  const [dataChanged, setDataChanged] = useState(false)
  const [selectedTabIndex, setSelectedTabIndex] = useState(null)

  useEffect(() => {
    if (userTagsloading === false && userTags.length > 0) {
      setData(userTags)
      setSelectedTabIndex(userTags[0].id)
    }

    if (dataChanged === true) {
      // refreshuserTags() // need to check if this needs to be fixed
      setDataChanged(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userTags, dataChanged, tagType])

  // initialize selected tab (first tag) if came from entry form
  useEffect(() => {
    if (newEntryId && newEntryTags && data) {
      if (newEntryTags.length > 0) {
        const firstTag = newEntryTags.filter(
          (item) => item.type === 'situation',
        )[0]
        console.log('first tag set up', firstTag)
        setSelectedTabIndex(firstTag.id)
      }
    }
  }, [newEntryId, newEntryTags, data])

  const handleTabChange = (event, newValue) => {
    setSelectedTabIndex(newValue)
  }

  if (userTagsloading) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <Tabs
        color='primary'
        value={selectedTabIndex}
        onChange={handleTabChange}
        aria-label='Vertical tabs'
        orientation='vertical'
      >
        <TabList>
          {data &&
            data.map((item, index) => {
              return (
                <Tab sx={styledTab} key={item.id} value={item.id}>
                  <Typography variant='body'>
                    {item.note} {item.count}
                  </Typography>
                </Tab>
              )
            })}
        </TabList>
        {data &&
          data.map((tag, index) => {
            const tagDataType = tag.type
            if (tagDataType === tagType) {
              return (
                <>
                  {selectedTabIndex === tag.id && (
                    <TabPanel
                      key={tag.id}
                      value={selectedTabIndex}
                      index={tag.id}
                      className='tab-panel-width'
                    >
                      <>
                        <TagDetails
                          tag={tag}
                          tagType={tagType}
                          tagId={selectedTabIndex}
                          setDataChanged={setDataChanged}
                        />
                        <EntryList
                          tagType={tagType}
                          tagId={selectedTabIndex}
                          setDataChanged={setDataChanged}
                          newEntryId={newEntryId}
                        />
                      </>
                    </TabPanel>
                  )}
                </>
              )
            }
            return null
          })}
      </Tabs>
    </div>
  )
}
