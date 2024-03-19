// Save each layer folder as an image

if (!Object.keys) {
    Object.keys = (function () {
      'use strict';
      var hasOwnProperty = Object.prototype.hasOwnProperty,
          hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
          dontEnums = [
            'toString',
            'toLocaleString',
            'valueOf',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'constructor'
          ],
  
          dontEnumsLength = dontEnums.length;
  
      return function (obj) {
        if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
          throw new TypeError('Object.keys called on non-object');
        }
  
        var result = [], prop, i;
  
        for (prop in obj) {
          if (hasOwnProperty.call(obj, prop)) {
            result.push(prop);
          }
        }
  
        if (hasDontEnumBug) {
          for (i = 0; i < dontEnumsLength; i++) {
            if (hasOwnProperty.call(obj, dontEnums)) {
              result.push(dontEnums);
            }
          }
        }
        return result;
      };
    }());
  }

function trim(str) {
    return str.replace(/^\s+/,'').replace(/\s+$/,'');
}



function makeLayerSetVisible(idx_on) {
    
    var doc = app.activeDocument;
    var layerFolders = doc.layerSets; // Get all layer folders
    for (var i = 0; i < layerFolders.length; i++) {
        layerFolders[i].visible = false;
    }

    layerFolders[idx_on].visible = true;

    return trim(layerFolders[idx_on].name);
}

function nameCheck() {
    
    var doc = app.activeDocument;
    var layerFolders = doc.layerSets; // Get all layer folders

    if(!layerFolders.length)
    {
        alert("This document has no layer folders to convert into images");
        return false;
    }

    var noNameCount = 0;
    for (var i = 0; i < layerFolders.length; i++) {
        if(!layerFolders[i].name || !trim(layerFolders[i].name)) {
            ++noNameCount;
        }        
    }

    if(noNameCount)
    {
        alert(noNameCount + ' layer folders have no name - please give them unique names before continuing');
        return false;
    }


    var names = {};
    var duplicateNames = {};
    for (var i = 0; i < layerFolders.length; i++) {
        var nameToSeek = trim(layerFolders[i].name);

        if(!names[nameToSeek])
        {
            names[nameToSeek] = true;
        }
        else
        {
            duplicateNames[nameToSeek] = true;
        }
    }

    if(Object.keys(duplicateNames).length)
    {
        var ar = Object.keys(duplicateNames);
        var nameList = "";
        for(var i = 0; i<ar.length; ++i)
        {
            nameList += "'"+ar[i]+"'";
            if(i < ar.length-1)
            {
                nameList += "\n";
            }
        }

        alert("Layer folders must have unique names for this script to work.  The following folder names are not unique:\n" + nameList)
        return false;
    }
    
    return true;
}

function saveLayerFoldersAsImages() {
    var doc = app.activeDocument;

    if(!doc)
    {
        alert("Please open the document you want to mint the frames from layersets (layer folders) from. Aborting.");
        return;
    }

    var layerFolders = doc.layerSets; // Get all layer folders

    if(!nameCheck()) {
        alert("layersets (layer folders) do not all have unique names.  aborting.");
        return;
    }

    var prefix = prompt("what prefix do you want these images to be saved as? (will be saved into the same directory as the source file.)", '');
    if(!prefix) {
        alert("no valid prefix - aborting.");
        return;
    }

    for(var i=0; i<layerFolders.length; ++i)
    {
        folderName = makeLayerSetVisible(i);

        var saveOptions = new ExportOptionsSaveForWeb();
        saveOptions.format = SaveDocumentType.PNG;
        saveOptions.PNG8 = false;
        saveOptions.quality = 100;
        var saveFile = new File(doc.path + "/" + prefix + folderName + ".png");
        doc.exportDocument(saveFile, ExportType.SAVEFORWEB, saveOptions);
    }

    alert("done.");
}

// Call the function
saveLayerFoldersAsImages();
