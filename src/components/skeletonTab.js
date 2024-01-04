import {
  Tabs,
  TabPanel,
  TabList,
  Tab,
  Skeleton,
  Typography,
  Accordion,
  AccordionSummary,
} from '@mui/joy'

const SkeletonTab = () => {
  return (
    <Tabs
      color='primary'
      aria-label='Vertical tabs'
      orientation='vertical'
      sx={{ minWidth: 300 }}
    >
      <TabList>
        <Tab>
          <Typography level='h3'>
            <Skeleton>Yosemite</Skeleton>
          </Typography>
        </Tab>
        <Tab disabled>
          <Typography level='h3'>
            <Skeleton>Yosemite</Skeleton>
          </Typography>
        </Tab>
        <Tab disabled>
          <Typography level='h3'>
            <Skeleton>Yosemite</Skeleton>
          </Typography>
        </Tab>
      </TabList>
      <TabPanel value={0}>
        <Skeleton
          className='tab-panel-width'
          level='body'
          variant='rectangular'
          height={150}
          sx={{ marginBottom: '20px' }}
        />

        {Array.from(new Array(5)).map((_, index) => (
          <Accordion key={index} disabled>
            <AccordionSummary>
              <Skeleton width='100%' />
            </AccordionSummary>
          </Accordion>
        ))}
      </TabPanel>
    </Tabs>
  )
}

export default SkeletonTab
