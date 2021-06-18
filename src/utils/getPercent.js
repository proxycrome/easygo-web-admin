export const getPercent = (thisData, ...otherData) => {
    let total = 0;

    otherData.forEach(item => total += item);
    return isNaN((thisData/total) * 100)? 0 : ((thisData/total) * 100).toFixed();
  }