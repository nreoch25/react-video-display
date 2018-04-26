export function getVast(adtag) {
  // fetch vast Xml
  return new Promise((resolve, reject) => {
    fetch(adtag).then(response => response.text()).then(response => resolve(response)).catch(error => reject(error));
  });
}

export function xmlParser(xmlString) {
  // parse the xml string and return an xmlDoc
  let parser = new DOMParser();
  let xmlDoc = parser.parseFromString(xmlString,"text/xml");
  return(xmlDoc);
}

export function xmlToJson(xmlDoc) {
  // Create the return object
  let obj = {};
  if(xmlDoc.nodeType === 1) { // element
    // do attributes
    if(xmlDoc.attributes.length > 0) {
      obj["attributes"] = {};
      for ( var j = 0; j < xmlDoc.attributes.length; j++) {
        var attribute = xmlDoc.attributes.item(j);
        obj["attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xmlDoc.nodeType === 4) {
    obj = xmlDoc.nodeValue;
  }

  // do children
	// If just one text node inside
	if (xmlDoc.hasChildNodes() && xmlDoc.childNodes.length === 1 && xmlDoc.childNodes[0].nodeType === 3) {
		obj = xmlDoc.childNodes[0].nodeValue;
	} else if (xmlDoc.hasChildNodes()) {
		for(var i = 0; i < xmlDoc.childNodes.length; i++) {
			var item = xmlDoc.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}

  // return the converted xml
  return obj;
}

export function getVideoURL(files) {
  // return the first mp4 video url
  let mp4VideoFiles = files.filter(file => file.attributes.type === "video/mp4");
  return mp4VideoFiles[0]["#cdata-section"];

}

export function getVideoCompanion(companion) {
  console.log(companion);
  let companionAd = {};
  // check if the companion is an HTMLResource
  if(typeof companion.HTMLResource !== "undefined") {
    companionAd.type = "html";
    companionAd.ad = companion.HTMLResource["#cdata-section"];
    companion.clickthrough = null;
  }
  // check if the companion is a StaticResource
  if(typeof companion.StaticResource !== "undefined") {
    companionAd.type = "static";
    companionAd.ad = companion.StaticResource["#cdata-section"];
    companionAd.clickthrough = companion.CompanionClickThrough["#cdata-section"];
  }
  return companionAd;
}

export function detectScrollPosition(win, doc) {
  return new Promise((resolve, reject) => {
    let halfViewPort = win.innerHeight / 2;
    let halfContentHeight = doc.body.clientHeight / 2;
    let scrollInterval = win.setInterval(() => {
      if((halfViewPort + win.scrollY) >= halfContentHeight) {
        win.clearInterval(scrollInterval);
        resolve();
      }
    }, 1000);
  });
}
