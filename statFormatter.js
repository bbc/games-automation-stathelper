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
      counterName, 
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

    if(counterName) {
      stat.counterName = counterName;
    }

    if (screenName) {
      stat.screenName = screenName;
    }

    if(bucket) {
      stat.bucket = bucket;
    }
  
    const generalPlacement = async (generalPlacement, screenName) => {
      if (screenName === "") {
          return `${generalPlacement}.page`;
      } else {
          return `${generalPlacement}.${screenName}.page`;
      }
    };
  
    const setCountername = async (countername, screenName) => {
      if (screenName === "") {
        return `${countername}.page`;
      } else {
        return `${countername}.${screen}.page`;
      }
    };
  
    if (stat.bucket === "testGames") {
      bucketString = `s=${599452}`;
    } else if (stat.bucket === "prodGames") {
      bucketString = `s=${598261}`;
    }
  
    const counternameString = await setCountername(stat.counterName, stat.screenName);
    const statString = `[${stat.campaignId}]-[${stat.creationId}]-[${stat.variant}]-[${stat.format}]-[${await generalPlacement(stat.generalPlacement, stat.screenName)}]-[${stat.detailedPlacement}]-[${stat.advertiserId}]-[${stat.url}]`;
    const newStatData = {
      bucket: bucketString,
      stat: statString,
      counterName: `p=${counternameString}`,
      event: `echo_event=${stat.event}`,
    };
    return newStatData;
  };