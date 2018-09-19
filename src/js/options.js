/*  
    options.js - openinfigma module

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

// Saves options to Chrome storage
function saveOptions() {
  var files = document.getElementById("file").checked;
  var tab = document.getElementById("close").checked;
  storage.set({ OIFCloseTab: tab, OIFLinkType: files }, function () {
    // Update status to let user know options were saved
    var status = document.getElementById("status");
    status.textContent = "Options saved.";
    setTimeout(function () {
      status.textContent = "";
    }, 750);
  });
}

// Restores radio state using the preferences
function restoreOptions() {
  storage.get({ OIFCloseTab: false, OIFLinkType: true }, function (items) {
    document.getElementById("close").checked = items.OIFCloseTab;
    document.getElementById("file").checked = items.OIFLinkType;
    document.getElementById("proto").checked = !items.OIFLinkType;
  });
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("save").addEventListener("click", saveOptions);