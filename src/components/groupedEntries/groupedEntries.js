import React, { useEffect, useState } from 'react'
import { Tabs, TabPanel, TabList, Tab, Typography } from '@mui/joy'
import useCombinedTags from '../../api/useCombinedTags'
import TagSection from '../tagSection'
import SkeletonTab from '../skeletonTab'

const styledTab = {
  '&.Mui-selected, &&:hover': {
    backgroundColor: '#F4E6D4',
  },
}

export default function GroupedEntries({ tagType, newEntryId, newEntryTags }) {
  const [data, setData] = useState(null)
  const { combinedTags, loading: combinedTagsLoading } = useCombinedTags()

  const [dataChanged, setDataChanged] = useState(false)
  const [selectedTabIndex, setSelectedTabIndex] = useState(null)

  useEffect(() => {
    if (
      combinedTagsLoading === false &&
      combinedTags &&
      combinedTags.length > 0
    ) {
      const filtered = combinedTags.filter((item) => item.type === tagType)
      setData(filtered)
      setSelectedTabIndex(filtered[0].id)
    }

    if (dataChanged === true) {
      // refreshuserTags() // need to check if this needs to be fixed

      setDataChanged(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [combinedTags, dataChanged, tagType])

  useEffect(() => {
    if (newEntryId && newEntryTags && data) {
      if (newEntryTags.length > 0) {
        const firstTag = newEntryTags.filter(
          (item) => item.type === 'situation',
        )[0] // once new entry is created, we default shows 'situation' tab
        if (firstTag) {
          setSelectedTabIndex(firstTag.id)
        } else {
          setSelectedTabIndex(data[0].id)
        }
      }
    }
  }, [newEntryId, newEntryTags, tagType, data])

  const handleTabChange = (event, newValue) => {
    setSelectedTabIndex(newValue)
  }

  return (
    <div>
      {combinedTagsLoading ? (
        <SkeletonTab />
      ) : (
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
                      {item.note} {item.entryCount}
                    </Typography>
                  </Tab>
                )
              })}
          </TabList>
          {data &&
            data.map((tag, index) => {
              return (
                <>
                  {selectedTabIndex === tag.id && (
                    <TabPanel
                      key={tag.id}
                      value={selectedTabIndex}
                      index={tag.id}
                      className='tab-panel-width'
                    >
                      <TagSection
                        tag={tag}
                        tagType={tagType}
                        selectedTabIndex={selectedTabIndex}
                        setDataChanged={setDataChanged}
                        newEntryId={newEntryId}
                      />
                    </TabPanel>
                  )}
                </>
              )
            })}
        </Tabs>
      )}
    </div>
  )
}
