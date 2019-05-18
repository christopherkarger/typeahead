import React from 'react';
import { List, ListItem } from '../../styled-components/List/List';
import { Button } from '../../styled-components/Button/Button';

const isEqual = (prevProps, nextProps) => {
  // rerender list if items have changed
  let campaignsHaveChanged = false;
  let channelsHaveChanged = false;
  
  if (prevProps.campaigns.length !== nextProps.campaigns.length ||
      prevProps.channels.length !== nextProps.channels.length ) {
        return false;
  }

  prevProps.campaigns.forEach((campaign,index) => {
    if (campaign.campaign !== nextProps.campaigns[index].campaign) {
      campaignsHaveChanged = true;
    }
  });

  prevProps.channels.forEach((channel,index) => {
    if (channel !== nextProps.channels[index]) {
      channelsHaveChanged = true;
    }
  });

  if (!channelsHaveChanged && !campaignsHaveChanged) {
    return true;
  } else {
    return false;
  }

} 

const FindAsYouType = React.memo(props => {
  console.log('Render List')
  return (
    <List>
      {
        props.campaigns.length > 0 ? props.campaigns.map((item,index) => {
          return (
          <ListItem key={'campaigns' + index}>
            <Button type="Button" onClick={() => props.clickedCampaign(index)}>{ item.campaign }</Button>
          </ListItem>
          )
        }) : null
      }
      {
        props.channels.length > 0 ? props.channels.map((item,index) => {
          return (
          <ListItem key={'channel' + index}>
            <Button type="Button" onClick={() => props.clickedChannel(index)}>{ item }</Button>
          </ListItem>)
        }) : null
      }
    </List>
  )
}, isEqual);

export default FindAsYouType;
