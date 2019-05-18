import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import convertData from './utils/convertData';
import filterChannels from './utils/filterChannels';
import filterCampaigns from './utils/filterCampaigns';
import { Input } from './styled-components/Input/Input';
import { Form } from './styled-components/Form/Form';
import { Wrapper } from './styled-components/Wrapper/Wrapper';
import { Text } from './styled-components/Text/Text';
import FindAsYouType from './components/FindAsYouType/FindAsYouType';

const App = () => {
  const [data, setData] = useState({});
  const [filteredChannels, setFilteredChannels] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showList, setShowList] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [impressions, setImpressions] = useState(0);
 
  const inputRef = useRef();

  // Did mount
  useEffect(() => {
    inputRef.current.focus();
    axios.get('http://www.mocky.io/v2/5cd93aeb300000b721c014b0').then(response => {
      setData(convertData(response.data.split('\n')));
    }).catch(error => {
      console.log('error');
    });
  }, []);

  const filterAggregate = (e) => {
    const currentInputVal = e.target.value;
    setInputValue(currentInputVal);
  
    const newFilteredCampaigns = currentInputVal.length ? 
      filterCampaigns({ data, currentInputVal }) : [];

    const newFilteredChannels = currentInputVal.length ?
      filterChannels({ data, currentInputVal }) : [];

    if (currentInputVal.length === 0 || 
      (newFilteredCampaigns.length === 0 && newFilteredChannels.length === 0) ) { 
        setClicks(0);
        setImpressions(0); 
    }

    setFilteredCampaigns(newFilteredCampaigns);
    setFilteredChannels(newFilteredChannels);
    setShowList(newFilteredCampaigns.length > 0 || newFilteredChannels.length > 0);

  };

  const setChannelOrCampaign = ({ value, clicks, impressions }) => {
    setClicks(clicks);
    setImpressions(impressions);
    setInputValue(value);
    setShowList(false);
  }

  const clickedCampaign = (index) => {
    const campaign = filteredCampaigns[index];
    setChannelOrCampaign({
      value: campaign.campaign,
      clicks: campaign.clicks,
      impressions: campaign.impressions 
    });
  };

  const clickedChannel = (index) => {
    const channel = data.channels[filteredChannels[index]];
    setChannelOrCampaign({
      value: filteredChannels[index],
      clicks: channel.clicks,
      impressions: channel.impressions
    });
  };
  
  return (
    <Wrapper>
      <Text>Choose channel or campaign:</Text>
      <Form onSubmit={(e) => e.preventDefault() }>
        <Input ref={inputRef} type="text" value={inputValue} onChange={filterAggregate}  />
        <Text>Clicks: { clicks } Impressions: { impressions }</Text>
        { showList ? <FindAsYouType 
          campaigns={filteredCampaigns} 
          channels={filteredChannels}
          clickedCampaign={clickedCampaign}
          clickedChannel={clickedChannel} 
        /> : null }
      </Form>
    </Wrapper>
  );
  
}

export default App;
