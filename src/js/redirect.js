/*  
    redirect.js - openinfigma module

    Copyright (c) 2018 
    Fabrizio Rinaldi <https://www.fabriziorinaldi.io/>, 
    Sergey Osokin <https://github.com/creold/>

    Open in Figma plugin for Chrome:
    https://www.fabriziorinaldi.io/openinfigma/

    This is free software; you can redistribute it and/or modify it under
    the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation; either version 3 of the License, or (at
    your option) any later version.

    This software is distributed in the hope that it will be useful, but
    WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
    Lesser General Public License for more details.

    See <http://www.gnu.org/licenses/>.
*/

var storage = chrome.storage.local;
var figmaAppURI = "figma://";
var loc = document.location;
var tabUrl = loc.href;
var proto = "";

// Get extension options
storage.get(["OIFStatus", "OIFCloseTab", "OIFLinkType"], function (data) {
  var statusExt = data.OIFStatus;
  var linkTab = data.OIFCloseTab;
  var linkType = data.OIFLinkType;

  if (!linkType && linkType != undefined) {
    proto = "|proto"; // If user want open Files & Prototypes
  }

  var expression = "(https:\/\/www\.figma\.com\/(file" + proto + "))\/.+/";
  var figmaRegex = new RegExp(expression);
  var match = figmaRegex.exec(tabUrl);

  // Get extension status
    if (statusExt || statusExt == undefined) {
      if (match != null) {
        loc.replace(tabUrl.replace(match[1], figmaAppURI + match[2]));
        if (linkTab) {
          setTimeout(() => {
            closeTab();
          }, 500);
        }
      }
    }
});

// Send a message to the background script
function closeTab() {
  chrome.runtime.sendMessage("closeTab");
}
