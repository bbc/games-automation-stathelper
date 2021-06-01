export const formatStatConfig = (
  stat, 
  { actionName, 
    actionType, 
    campaignId, 
    creationId, 
    variant, 
    format, 
    generalPlacement, 
    detailedPlacement,  
    advertiserId, 
    url, 
    countername, 
    screenName, 
    bucket, 
  } = {} ) => {
  let bucketString;
  
  if (actionType && actionName) {
    stat.creationId = `${actionName}~${actionType}`;
  }

  if (campaignId) {
    stat.campaignId = campaignId;
  }

  if (creationId) {
    stat.creationId = creationId;
  }

  if (variant) {
    stat.variant = variant;
  }

  if (format) {
    stat.format = format;
  }

  if (generalPlacement) {
    stat.generalPlacement = generalPlacement;
  }

  if (detailedPlacement) {
    stat.detailedPlacement = detailedPlacement;
  }

  if (advertiserId) {
    stat.advertiserId = advertiserId;
  }
  
  if(url) {
    stat.url = url;
  }

  if(countername) {
    stat.countername = countername;
  }

  if (screenName) {
    stat.screenName = screenName;
  }

  if(bucket) {
    stat.bucket = bucket;
  }

  const setGeneralPlacement = (generalPlacement, screenName) => {
    if (screenName === "") {
        return `${generalPlacement}.page`;
    } else {
        return `${generalPlacement}.${screenName}.page`;
    }
  };

  const setCountername = (countername, screenName) => {
    if (screenName === "") {
      return `${countername}.page`;
    } else {
      return `${countername}.${screenName}.page`;
    }
  };

  if (stat.bucket === "testGames") {
    bucketString = `s=${599452}`;
  } else if (stat.bucket === "prodGames") {
    bucketString = `s=${598261}`;
  }

  const counternameString = setCountername(stat.countername, stat.screenName);
  const statString = `[${stat.campaignId}]-[${stat.creationId}]-[${stat.variant}]-[${stat.format}]-[${setGeneralPlacement(stat.generalPlacement, stat.screenName)}]-[${stat.detailedPlacement}]-[${stat.advertiserId}]-[${stat.url}]`;
  const newStatData = {
    bucket: bucketString,
    stat: statString,
    counterName: `p=${counternameString}`,
    event: `echo_event=${stat.event}`,
  };
  return newStatData;
};