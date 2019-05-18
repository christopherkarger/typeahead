const filterCampaigns = ({data, currentInputVal}) => {
  const campaigns = [];
  const currentInputValLowerCase = currentInputVal.toLowerCase();
  
  if (currentInputValLowerCase.length > 0) {
    data.convertedData.forEach(item => {
      if (item.campaign.toLowerCase().indexOf(currentInputValLowerCase) > -1) {
        campaigns.push(item)
      }
    });
  }
  return campaigns;
};

export default filterCampaigns;