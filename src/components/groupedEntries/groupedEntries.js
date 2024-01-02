import React, { useEffect, useState } from 'react'
import EntryList from './entryList'
import { Tabs, TabPanel, TabList, Tab } from '@mui/joy'
import useGroupTags from '../../api/useGroupTags'
import TagDetails from './tagDetails'

const styledTab = {
  '&.Mui-selected, &&:hover': {
    backgroundColor: '#F4E6D4',
  },
}

export default function GroupedEntries({ tagType, newEntryId, newEntryTags }) {
  const [data, setData] = useState(null)
  const {
    groupTags,
    refreshGroupTags,
    loading: groupTagsloading,
  } = useGroupTags()
  const [dataChanged, setDataChanged] = useState(false)
  const [selectedTabIndex, setSelectedTabIndex] = useState(0)

  useEffect(() => {
    if (groupTagsloading === false && groupTags.length > 0) {
      const filtered = groupTags.filter((item) => item.type === tagType)
      setData(filtered)
      setSelectedTabIndex(filtered[0].id)
    }

    if (dataChanged === true) {
      refreshGroupTags()
      setDataChanged(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupTags, dataChanged, tagType])

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
    console.log('handleTabChange', newValue)
    setSelectedTabIndex(newValue)
  }

  if (groupTagsloading) {
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
                  {item.note} {item.count}
                </Tab>
              )
            })}
        </TabList>
        {/* switch tab key and tab panel key and value to */}
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
                          setDataChanged={setDataChanged}
                        />
                        <EntryList
                          entries={tag.entries}
                          tagType={tagType}
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
