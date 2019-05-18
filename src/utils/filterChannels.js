const filterChannels = ({data, currentInputVal}) => {
  const channels = [];
  const currentInputValLowerCase = currentInputVal.toLowerCase();
  
  if (currentInputValLowerCase.length > 0) {
    Object.keys(data.channels).forEach(key => {
      if (key.toLowerCase().indexOf(currentInputValLowerCase) > -1) {
        channels.push(key);
      }
    });
  }
  return channels;
};

export default filterChannels;