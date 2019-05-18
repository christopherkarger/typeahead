const convertData = (data) => {
  const convertedData = [];
  const uniqueCampaigns = [];
  const channels = {};

  data.forEach( (item,index) => {
    const itemArr = item.split(',');
    // Skip first item
    if (index > 0) {
      const clicks = parseInt(itemArr[2]);
      const impressions = parseInt(itemArr[3]);
      const indexPos = uniqueCampaigns.indexOf(itemArr[0]);
      
      if (indexPos === -1) {
        uniqueCampaigns.push(itemArr[0]);
      
        convertedData.push({
          campaign: itemArr[0],
          channel: itemArr[1],
          clicks,
          impressions
        });
      } else {
        convertedData[indexPos].clicks += clicks;
        convertedData[indexPos].impressions += impressions; 
      }
      
      if (!channels.hasOwnProperty(itemArr[1])) {
        channels[itemArr[1]] = {
          clicks: 0,
          impressions: 0
        }
      }

      channels[itemArr[1]].clicks += clicks;
      channels[itemArr[1]].impressions += impressions;

    }
  });

  return {
    convertedData,
    channels
  };
};

export default convertData;