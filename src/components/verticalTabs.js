import * as React from 'react';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';



export function TabTitle({data}) {
    console.log('tab title data', data)
    return (
      <TabList>
        {data && data.map((item, index) => {
            return (<Tab key={index}>{item.label} {item.count}</Tab>)
        })}
      </TabList>
    )
}

