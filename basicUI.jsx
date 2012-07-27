var win = (win instanceof Panel) ? win : win = new Window('palette',  uiStrings.paneltitle,[325,74,605,666]); 
var w = buildUI(); 
if (w != null) { 
w.show(); 
} 

function buildUI() { 
if (win != null) { 

win.jsonGroup = win.add('panel', [14,14,265,143], '1. Load and Inspect Geodata', {borderStyle: "etched"}); 

win.selectJsonFileBtn = win.jsonGroup.add('button', [8,25,242,51], 'Select a GeoJson File'); 
win.jsonFileConsoleTxt = win.jsonGroup.add('edittext', [9,57,239,107], ''); 
win.jsonFileConsoleTxt.justify = 'left'; 


win.compGroup = win.add('panel', [14,154,265,243], '2. Comp Settings', {borderStyle: "etched"}); 

win.compNameTxt = win.compGroup.add('edittext', [9,17,239,37], 'New Geo Comp'); 
win.compNameTxt.justify = 'left'; 
win.scalePulldown = win.compGroup.add('dropdownlist', [9,48,239,68], ["1", "2", "3"]); 

win.layerGroup = win.add('panel', [14,254,265,543], '3. Define Layer Styles', {borderStyle: "etched"}); 
win.pointSelectorPulldown = win.layerGroup.add('dropdownlist', [9,18,239,40], ["1", "2", "3"]); 

win.findMarkerBtn = win.layerGroup.add('button', [8,45,122,73], 'search'); 
win.createMarkerBtn = win.layerGroup.add('button', [128,45,242,73], 'create'); 
win.markerSelectorPulldown = win.layerGroup.add('dropdownlist', [9,78,239,100], ["1", "2", "3"]); 
win.separatorLabel = win.layerGroup.add('statictext', [9,107,239,127], '---------------------------'); 
win.separatorLabel.justify = 'right'; 





win.lineStringSelectorPulldown = win.layerGroup.add('dropdownlist', [9,128,239,150], ["1", "2", "3"]); 
win.polygonSelectorPulldown = win.layerGroup.add('dropdownlist', [9,158,239,180], ["1", "2", "3"]); 
win.multiPolygonSelectorPulldown = win.layerGroup.add('dropdownlist', [9,188,239,210], ["1", "2", "3"]); 


win.SingleLayerChkBx = win.layerGroup.add('checkbox', [18,219,138,239], 'Single Layer?'); 
win.SingleLayerChkBx.value = false; 
win.useShapesChkBx = win.layerGroup.add('checkbox', [138,219,248,241], 'Use Shapes?'); 
win.useShapesChkBx.value = false; 
win.doFillChkbx = win.layerGroup.add('checkbox', [18,249,138,269], 'do Fill?'); 
win.doFillChkbx.value = false; 
win.doStrokeChkBx = win.layerGroup.add('checkbox', [138,249,248,269], 'do Stroke?'); 
win.doStrokeChkBx.value = false; 




win.runMainScript = win.add('button', [52,549,266,575], uiStrings.buttonTextRunMainScript); 

win.getHelpBtn = win.add('button', [12,549,46,575], '?');


win.selectJsonFileBtn.onClick = function () {this.parent.parent.close(1)}; 
win.createMarkerBtn.onClick = function () {this.parent.parent.close(1)}; 
win.findMarkerBtn.onClick = function () {this.parent.parent.close(1)}; 
win.getHelpBtn.onClick = function () {this.parent.close(1)}; 
win.runMainScript.onClick = function () {this.parent.close(1)}; 

} 
return win 
} 