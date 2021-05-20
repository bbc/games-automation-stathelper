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
    } = {}, debug = false ) => {
    let bucketString;
    
    const debugOut = (arguements, message = "") => {
      if(debug) {
          console.log(`${arguements.callee.name} ${message}`);
      }
  }
    if (actionType && actionName) {
      debugOut(arguments, `actionType: ${actionType}, actionName: ${actionName}`);
      stat.creationId = `${actionName}~${actionType}`;
      debugOut(arguments, `creationId to use in stat string: ${stat.creationId}`);
    }

    if (campaignId) {
      debugOut(arguments, `campaignId: ${campaignId}`);
      stat.campaignId = campaignId;
      debugOut(arguments, `campaignId to use in stat string: ${stat.campaignId}`);
    }

    if (creationId) {
      debugOut(arguments, `Value passed in for creationId: ${creationId}`);
      stat.creationId = creationId;
      debugOut(arguments, `creationId to use in stat string: ${stat.creationId}`);
    }

    if (variant) {
      debugOut(arguments, `Value passed in for variant: ${variant}`);
      stat.variant = variant;
      debugOut(arguments, `variant to use in stat string: ${stat.variant}`);
    }

    if (format) {
      debugOut(arguments, `Value passed in for format: ${format}`);
      stat.format = format;
      debugOut(arguments, `format to use in stat string: ${stat.format}`);
    }
  
    if (generalPlacement) {
      debugOut(arguments, `Value passed in for generalPlacement: ${generalPlacement}`);
      stat.generalPlacement = generalPlacement;
      debugOut(arguments, `generalPlacement to use in stat string: ${stat.generalPlacement}`);
    }

    if (detailedPlacement) {
      debugOut(arguments, `Value passed in for detailedPlacement: ${detailedPlacement}`);
      stat.detailedPlacement = detailedPlacement;
      debugOut(arguments, `detailedPlacement to use in stat string: ${stat.detailedPlacement}`);
    }

    if (advertiserId) {
      debugOut(arguments, `Value passed in for advetriserId: ${advertisedId}`);
      stat.advertiserId = advertiserId;
      debugOut(arguments, `advertiserId to use in stat string: ${stat.advertisedId}`);
    }
    
    if(url) {
      debugOut(arguments, `Value passed in for url: ${url}`);
      stat.url = url;
      debugOut(arguments, `url to use in stat string: ${stat.url}`);
    }

    if(counterName) {
      debugOut(arguments, `Value passed in for counterName: ${counterName}`);
      stat.counterName = counterName;
      debugOut(arguments, `counterName to use in stat string: ${stat.counterName}`);
    }

    if (screenName) {
      debugOut(arguments, `Value passed in for screenName: ${screenName}`);
      stat.screenName = screenName;
      debugOut(arguments, `screenName to use in stat string: ${stat.screenName}`);
    }

    if(bucket) {
      debugOut(arguments, `Value passed in for bucket: ${bucket}`);
      stat.bucket = bucket;
      debugOut(arguments, `bucket to use in stat string: ${stat.bucket}`);
    }
  
    const setGeneralPlacement = (generalPlacement, screenName) => {
      if (screenName === "") {
        debugOut(arguments, `General placement to use: ${generalPlacement}.page`);
        return `${generalPlacement}.page`;
      } else {
        debugOut(arguments, `General placement to use: ${generalPlacement}.${screen}.page`)
        return `${generalPlacement}.${screen}.page`;
      }
    };
  
    const setCountername = (countername, screenName) => {
      if (screenName === "") {
        debugOut(arguments, `General placement to use: ${generalPlacement}.page`)
        return `${countername}.page`;
      } else {
        debugOut(arguments, `General placement to use: ${countername}.${screen}.page`)
        return `${countername}.${screen}.page`;
      }
    };
  
    if (stat.bucket === "testGames") {
      bucketString = `s=${599452}`;
    } else if (stat.bucket === "prodGames") {
      bucketString = `s=${598261}`;
    }
  
    const counternameString = setCountername(stat.counterName, stat.screenName);
    const statString = `[${stat.campaignId}]-[${stat.creationId}]-[${stat.variant}]-[${stat.format}]-[${setGeneralPlacement(stat.generalPlacement, stat.screenName)}]-[${stat.detailedPlacement}]-[${stat.advertiserId}]-[${stat.url}]`;
    const newStatData = {
      bucket: bucketString,
      stat: statString,
      counterName: `p=${counternameString}`,
      event: `echo_event=${stat.event}`,
    };
    return newStatData;
  };