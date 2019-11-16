const axios = require("axios");
const $ = require("cheerio");
const fs = require("fs");

/* axios.get(`https://www.benjaminmoore.com/en-us/color-overview/find-your-color/color/200/`)
    .then(result => {
        fs.writeFile('testPage.html', result.data, (err) => {
            if (err) throw err;
            console.log('Page saved!');
        });
    })
    .catch(err => console.log(err)); */

fs.readFile('testPage.html', 'utf8', (err, data) => {
    if (err) throw err;
    const results = [];
    const parsedHTML = $.load(data);
    const scripts = parsedHTML(`script[type="text/javascript"]`);
    const keys = Object.keys(scripts);
    for (let key in scripts) {
        if (scripts[key].tagName === "script") {
            const children = scripts[key].children;
            children.forEach(child => {
                if (/window.appData/.test(child.data)) {
                    //strip off extra junk first:
                    let stringToParse = child.data.replace(/^\s+window.appData = /, "");
                    stringToParse = stringToParse.replace(/;/g, "");
                    const obj = JSON.parse(stringToParse);
                    if(obj.page && obj.page.colorDetail && obj.page.colorDetail.color) {
                        results.push(obj.page.colorDetail.color);
                    }
                    
                }
            });
        }
    }

});

/* const appData = {
    "config":
    {
        "isIOS": false, "isIPhone": false, "locale": "en-us", "assetPath": "/assets/benjaminmoore/live/",
        "bmcApiKey": "5109bbbe4324fff8c2ff", "googleClientId": "AIzaSyBx3wmOJfQabk81SAU4CQdEYfZjoLSlELs",
        "freeGoogleClientId": "AIzaSyBtXRqLrygBd0Jye1TgRfSDxaptV4PiTAA", "googleMapsApiKey": "BMCgAPIKey",
        "googleAnalyticsId": "UA-2224610-1",
        "routes": {
            "colorTool": {
                "root": "/en-us/color-overview/find-your-color/",
                "collections": "/en-us/color-overview/find-your-color/color-collections/",
                "colors": "/en-us/color-overview/find-your-color/color/",
                "families": "/en-us/color-overview/find-your-color/color-families/",
                "rooms": "/en-us/color-overview/find-your-color/color-a-room/",
                "save": "/en-us/color-overview/find-your-color/color-a-room/saved-color-selections/",
                "search": "/en-us/color-overview/find-your-color/color-search/"
            },
            "storeLocator": { "root": "/en-us/store-locator" }
        },
        "social": {
            "email": "Benjamin Moore helped me choose the perfect paint colors for my home.", "emailBody": null, "singleColorFacebook": "Look at this Benjamin Moore paint color [COLOR]. Via [HANDLE]",
            "singleColorPinterest": "Look at this Benjamin Moore paint color [COLOR]. Via [HANDLE]",
            "singleColorTwitter": "Look at this [HANDLE] paint color [COLOR].", "colorCombinationFacebook": "Look at the paint color combination I created with Benjamin Moore. Via [HANDLE]. [COLOR].",
            "colorCombinationPinterest": "Look at the paint color combination I created with Benjamin Moore. Via [HANDLE]. [COLOR].",
            "colorCombinationTwitter": "Look at the paint color combination I created [HANDLE]. [COLOR].",
            "roomFacebook": "Look at the paint color combination I created with Benjamin Moore. Via [HANDLE]. [COLOR].",
            "roomPinterest": "Look at the paint color combination I created with Benjamin Moore. Via [HANDLE]. [COLOR].",
            "roomTwitter": "Look at the paint color combination I created [HANDLE]. [COLOR].", "facebookHandle": "@benjaminmoorepaints",
            "twitterHandle": "@Benjamin_Moore", "pinterestHandle": "@benjamin_moore"
        },
        "urls": {
            "dollop": "//media.benjaminmoore.com/WebServices/prod/dollops/180x180/", "bmcApi": "https://api.benjaminmoore.com/api/5109bbbe4324fff8c2ff", "sample": "http://store.benjaminmoore.com/storefront/color-samples/paint-color-samples-1-pint/prodPRM01A.html?sbcColor="
        }, "bmcWebServiceDomain": "https://www2.benjaminmoore.com", "env": "production", "facebookAppId": "188845908197661", "facebookSocialHandle": null, "twitterSocialHandle": null, "pinterestSocialHandle": null
    },
    "page": {
        "colorDetail":
        {
            "color":
            {
                "number": "200", "name": "Westminster Gold", "family": "Yellow",
                "familyURL": "/en-us/color-overview/find-your-color/color-families/yel/yellow",
                "hex": "E8CE8E", "contrastColor": "dark", "toolURL": "/en-us/color-overview/find-your-color/color/200/westminster-gold", "exteriorAvailability": "available"
            },
            "description": "This color is part of the Classic Color Collection. Surround yourself with your color favorites. These timeless, elegant, Classic Colors guarantee beautiful, usable color all the time, every time. A collection of 1,680 inspired hues that consumers and professionals have enjoyed for years, the colors in this palette are as timeless as they are forward.", "lrv": 60.55, "harmony": [{ "name": "Goes Great With", "category": null, "colors": [{ "number": "2069-20", "name": "Blackberry Wine", "family": "Purple", "familyURL": null, "hex": "49455F", "contrastColor": "light", "toolURL": "/en-us/color-overview/find-your-color/color/2069-20/blackberry-wine", "exteriorAvailability": "not recommended" }, { "number": "1450", "name": "Hampshire Rocks", "family": "Purple", "familyURL": null, "hex": "E6E1DE", "contrastColor": "dark", "toolURL": "/en-us/color-overview/find-your-color/color/1450/hampshire-rocks", "exteriorAvailability": "available" }], "colorList": ["2069-20", "1450"], "code": null, "description": null, "rows": 0, "totalColors": 0, "combination": "2069-20,1450" }, { "name": "Goes Great With", "category": null, "colors": [{ "number": "AF-515", "name": "Exhale", "family": "Blue", "familyURL": null, "hex": "A0B9C2", "contrastColor": "dark", "toolURL": "/en-us/color-overview/find-your-color/color/af-515/exhale", "exteriorAvailability": "available" }, { "number": "2123-70", "name": "Ice Mist", "family": "White", "familyURL": null, "hex": "F2F5F2", "contrastColor": "dark", "toolURL": "/en-us/color-overview/find-your-color/color/2123-70/ice-mist", "exteriorAvailability": "available" }], "colorList": ["AF-515", "2123-70"], "code": null, "description": null, "rows": 0, "totalColors": 0, "combination": "AF-515,2123-70" }], "similar": { "name": "Similar Colors", "category": null, "colors": [{ "number": "208", "name": "Da Vinci's Canvas", "family": "Yellow", "familyURL": "/en-us/color-overview/find-your-color/color-families/yel/yellow", "hex": "E1C888", "contrastColor": "dark", "toolURL": "/en-us/color-overview/find-your-color/color/208/da-vincis-canvas", "exteriorAvailability": "not recommended" }, { "number": "215", "name": "Yosemite Yellow", "family": "Yellow", "familyURL": "/en-us/color-overview/find-your-color/color-families/yel/yellow", "hex": "E2CB85", "contrastColor": "dark", "toolURL": "/en-us/color-overview/find-your-color/color/215/yosemite-yellow", "exteriorAvailability": "not recommended" }, { "number": "2152-40", "name": "Golden Tan", "family": "Yellow", "familyURL": "/en-us/color-overview/find-your-color/color-families/yel/yellow", "hex": "E1C48A", "contrastColor": "dark", "toolURL": "/en-us/color-overview/find-your-color/color/2152-40/golden-tan", "exteriorAvailability": "available" }, { "number": "179", "name": "Honeywheat", "family": "Orange", "familyURL": "/en-us/color-overview/find-your-color/color-families/ora/orange", "hex": "F7D898", "contrastColor": "dark", "toolURL": "/en-us/color-overview/find-your-color/color/179/honeywheat", "exteriorAvailability": "available" }], "colorList": ["208", "215", "2152-40", "179"], "code": null, "description": null, "rows": 0, "totalColors": 0, "combination": "208,215,2152-40,179" }, "shades": { "name": "More Shades", "category": null, "colors": [{ "number": "197", "name": "America's Heartland", "family": "Yellow", "familyURL": "/en-us/color-overview/find-your-color/color-families/yel/yellow", "hex": "F6EAC3", "contrastColor": "dark", "toolURL": "/en-us/color-overview/find-your-color/color/197/americas-heartland", "exteriorAvailability": "not recommended" }, { "number": "198", "name": "Cornsilk", "family": "Yellow", "familyURL": "/en-us/color-overview/find-your-color/color-families/yel/yellow", "hex": "F3E2B5", "contrastColor": "dark", "toolURL": "/en-us/color-overview/find-your-color/color/198/cornsilk", "exteriorAvailability": "available" }, { "number": "199", "name": "Barley", "family": "Yellow", "familyURL": "/en-us/color-overview/find-your-color/color-families/yel/yellow", "hex": "EED8A5", "contrastColor": "dark", "toolURL": "/en-us/color-overview/find-your-color/color/199/barley", "exteriorAvailability": "available" }, { "number": "201", "name": "Gold Leaf", "family": "Yellow", "familyURL": "/en-us/color-overview/find-your-color/color-families/yel/yellow", "hex": "E2C579", "contrastColor": "dark", "toolURL": "/en-us/color-overview/find-your-color/color/201/gold-leaf", "exteriorAvailability": "available" }, { "number": "202", "name": "Yellowstone", "family": "Yellow", "familyURL": "/en-us/color-overview/find-your-color/color-families/yel/yellow", "hex": "DFB967", "contrastColor": "dark", "toolURL": "/en-us/color-overview/find-your-color/color/202/yellowstone", "exteriorAvailability": "available" }, { "number": "203", "name": "Fields of Gold", "family": "Yellow", "familyURL": "/en-us/color-overview/find-your-color/color-families/yel/yellow", "hex": "CA9C43", "contrastColor": "dark", "toolURL": "/en-us/color-overview/find-your-color/color/203/fields-of-gold", "exteriorAvailability": "not recommended" }], "colorList": ["197", "198", "199", "201", "202", "203"], "code": null, "description": null, "rows": 0, "totalColors": 0, "combination": "197,198,199,201,202,203" }, "suggested": { "colors": [{ "number": "2069-20", "name": "Blackberry Wine", "family": "Purple", "familyURL": null, "hex": "49455F", "contrastColor": "light", "toolURL": "/en-us/color-overview/find-your-color/color/2069-20/blackberry-wine", "exteriorAvailability": "not recommended" }, { "number": "1450", "name": "Hampshire Rocks", "family": "Purple", "familyURL": null, "hex": "E6E1DE", "contrastColor": "dark", "toolURL": "/en-us/color-overview/find-your-color/color/1450/hampshire-rocks", "exteriorAvailability": "available" }, { "number": "AF-515", "name": "Exhale", "family": "Blue", "familyURL": null, "hex": "A0B9C2", "contrastColor": "dark", "toolURL": "/en-us/color-overview/find-your-color/color/af-515/exhale", "exteriorAvailability": "available" }, { "number": "2123-70", "name": "Ice Mist", "family": "White", "familyURL": null, "hex": "F2F5F2", "contrastColor": "dark", "toolURL": "/en-us/color-overview/find-your-color/color/2123-70/ice-mist", "exteriorAvailability": "available" }] }
        }
    },
    "settings": {}
}; */