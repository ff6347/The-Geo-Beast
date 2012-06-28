	//  _______ _    _ ______ 
	// |__   __| |  | |  ____|
	//    | |  | |__| | |__   
	//    | |  |  __  |  __|  
	//    | |  | |  | | |____ 
	//    |_|  |_|  |_|______|
	                       
	                       
	//   _____ ______ ____  
	//  / ____|  ____/ __ \ 
	// | |  __| |__ | |  | |
	// | | |_ |  __|| |  | |
	// | |__| | |___| |__| |
	//  \_____|______\____/ 
	                     
	                     
	//  ____  ______           _____ _______ 
	// |  _ \|  ____|   /\    / ____|__   __|
	// | |_) | |__     /  \  | (___    | |   
	// |  _ <|  __|   / /\ \  \___ \   | |   
	// | |_) | |____ / ____ \ ____) |  | |   
	// |____/|______/_/    \_\_____/   |_|   
	                                      
	
	// Copyright (c)  2012 
	// Fabian "fabiantheblind" Morón Zirfas  
	// Permission is hereby granted, free of charge, to any 
	// person obtaining a copy of this software and associated
	// documentation files (the "Software"), to deal in the Software
	// without restriction, including without limitation the rights 
	// to use, copy, modify, merge, publish, distribute, sublicense,
	// and/or sell copies of the Software, and to  permit persons to 
	// whom the Software is furnished to do so, subject to 
	// the following conditions:  
	// The above copyright notice and this permission notice
	// shall be included in all copies or substantial portions of the Software.  
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
	// IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF  CONTRACT,
	// TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTIO
	// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.  
	
	// see also http://www.opensource.org/licenses/mit-license.php
	

{

mainScript();

function mainScript(){

	app.beginUndoGroup("Unleash The Geo Beast");

	// this will hold all settings and be created by the UI
	var meta = {

		"ch" : 180,
		"cw" : 360,
		"factor" : 3,
		"dur" : 10,
		"fps" : 25,
		"curComp" : null,
		"threedee" : true,

		"file": null, 

		"GEOJSONObject" : null,
		"GeoObjectsList" 		: null,

		"doPoints" 		: true,
		"pointLayerType"		: 2,
		"doLines" 		: true,
		"lineLayerType"			: 1,
		"doPolygons" 		: true,
		"polygonLayerType"		: 0, 
		"doMultiPolygons" 	: true,
		"multiPolygonLyerType" 	: 0, 
	};


	meta.file = selectJsonFile();

	if(meta.file == null){ alert("file is null");return};
	meta.GEOJSONObject = readinGeoJSONFile(meta.file);
	if(meta.GEOJSONObject == null) {alert("Geo json is null");return};
	meta.GeoObjectsList = isolateTypes(meta);

	if(meta.GeoObjectsList == null){alert("Isolation of Features went wrong"); return};
	meta.curComp = app.project.items.addComp(
					shortenName("new comp"), 
					(meta.cw * meta.factor), 
					(meta.ch * meta.factor), 
					1,/*aspect ratio*/
					meta.dur, 
					meta.fps);
	if(meta.curComp == null){alert("comp is null"); return};

	resetView(meta.curComp);



	if(meta.doPoints == true){
		for(var i = 0; i < meta.GeoObjectsList.points.length;i++){
			drawPoints(meta, meta.GeoObjectsList.points[i], "Point " + i);
		};
	};


	if(meta.doLines==true){
		for(var i = 0; i < meta.GeoObjectsList.lineStrings.length;i++){

			drawLineStrings(meta, meta.GeoObjectsList.lineStrings[i], "LineString " + i);
		};

	};



    app.endUndoGroup();


};

function drawLineStrings(meta, lineString, name){


if(meta.lineLayerType == 0){
	var newLSLayer = meta.curComp.layers.addSolid([1,1,1], name , meta.curComp.width, meta.curComp.height, 1, meta.curComp.duration);
	}else if(meta.lineLayerType == 1 ){
	var newLSLayer = meta.curComp.layers.addShape();
		newLSLayer.name = name;
        newLSLayer.anchorPoint.setValue([meta.curComp.width/2,meta.curComp.height/2]);

	};
	// alert(lineString.toSource());


	addPath(meta, newLSLayer, lineString, false, name, 1);


};


/**
 * adds a path to a layer 
 * taken from http://www.redefinery.com/ae/fundamentals/masks/
 * great resource
 * edited to use also shapelayers
 */ 

function addPath(meta, layer, path ,closePath, name ,type){



	pt = new Array();

	for(var j =0; j < path.length;j++){

		var x = (path[j][0])* meta.factor + (meta.curComp.width/2);
		var y = (path[j][1]* -1)* meta.factor + (meta.curComp.height/2);

    // in here the bounding box should be calculated
		pt.push([x,y]);
	}; // close coords loop




	var masksGroup = null;

if(layer instanceof ShapeLayer ){

  masksGroup = layer("ADBE Root Vectors Group"); // Get the PropertyGroup for the shape
  }else {
  masksGroup = layer("ADBE Mask Parade"); // Get the PropertyGroup for the masks
};

if (masksGroup != null){

  var mask = null;
  var shapeGroup = null;
  if(layer instanceof ShapeLayer){
    mask = masksGroup.addProperty("ADBE Vector Shape - Group");
  }else {
    mask = masksGroup.addProperty("ADBE Mask Atom");       // Create a new mask
  };
  
  if (mask != null){

      mask.name = name;

    var s = new Shape();// new shape object
    if (s != null){
            s.vertices = pt;                        // put the path verticies into the shape
            s.closed = closePath;                        // The close attribute defaults to true 
            if(layer instanceof ShapeLayer){
            maskShape = mask.property("ADBE Vector Shape");
            }else {   
            maskShape = mask.property("ADBE Mask Shape");  // Get the Mask Shape property for the mask
            };

            maskShape.setValue(s);                   // Change the mask shape (not keyframed)
        };
    };


	if(layer instanceof ShapeLayer){
		if(type == 0){
			var fill = masksGroup.addProperty("ADBE Vector Graphic - Fill");
	    		fill.property("ADBE Vector Fill Color").setValue([0,0,0]);
	    		fill.name = "fill";
		}else{
			var stroke = masksGroup.addProperty("ADBE Vector Graphic - Stroke");
				stroke.property( "ADBE Vector Stroke Color").setValue([0,0,0]);
  				stroke.name = "stroke";


		};
	};

};



};



function drawPoints(meta, position , name ){

 var x = (position[0]) * meta.factor + ( meta.curComp.width / 2);
 var y = (position[1]) * meta.factor + ( meta.curComp.height / 2);
var newLayer =  null;
if(meta.pointLayerType == 0){
	newLayer = meta.curComp.layers.addSolid([1,1,1], name , 50, 50, 1, meta.curComp.duration);
} else if (meta.pointLayerType == 1 ){
	newLayer = meta.curComp.layers.addLight(name,[x,y]);
}else if(meta.pointLayerType == 2 ){

	newLayer = meta.curComp.layers.addText(name);
};

if(meta.threedee == true){
	newLayer.threeDLayer = true;
};

if(meta.pointLayerType != 1){ 
	setLayerPosition(meta.threedee , newLayer ,x,y);
};

};



function setLayerPosition(threedee, layer, x, y ){

    // thanx redifinery http://www.redefinery.com/ae/fundamentals/layers/
    if((threedee == true) || (layer instanceof LightLayer) ){
      layer.position.setValue ([x,y,0]);
      }else{
      layer.position.setValue ([x,y]);
    };

};



// ------------ utilities ------------
  function shortenName(str) {
    var res = "";
    if (parseFloat(app.version) < 10.0) {

      res = str.substr(0, 26);
    } else {

      res = str;

    };

    return res;
  };


/**
 *  this resets the view 
 *
 */ 
  function resetView(comp){

    var duration = comp.workAreaDuration;
    comp.workAreaDuration = (1 / comp.frameRate) * 5; // ae needs at least 2 frames for previewing 
    comp.ramPreviewTest(1.0, 1.0, 0); // i think this is where the CS4 Problems start 
    comp.workAreaDuration = duration;
    comp.resolutionFactor = [4, 4];

  };


// ------------ FILE HANDLING ------------
function selectJsonFile(){
        var jsonfile = File.openDialog("Select a jsonfile", "*.json", false);
        if (jsonfile != null) {
         return jsonfile;
        } else {
          alert("Error file is null");
		return null;
        };


};

  function readinGeoJSONFile(theFile) {

    // var textFile = File.openDialog("Select a text file to import.", "*.*",false);
    // var path = ((new File($.fileName)).path);
    var textFile = theFile; //;File( path+"/world_geo_json/" + THESELECTEDFILE);
    if (textFile != null) {
      var textLines = new Array();
      textFile.open("r", "TEXT", "????");
      while (!textFile.eof) {
        textLines[textLines.length] = textFile.readln();
      };
      textFile.close();
    };

    if (!textLines) {
      alert("there are no lines in your file or something went terribly wrong.");
      return;
    };
    var str = textLines.join("");
    var reg = new RegExp("\n|\r", "g");
    str.replace(reg, " ");
    // alert(str);
    // normaly this should not use eval
    // but i dont want to incorporate the JSON lib
    var obj = eval("(" + str + ")"); // evaluate the JSON code
    // if(obj === Object){alert("eval worked")}else{alert("eval error")};
    return obj;
  };

// ------------ end of file handling ------------







function isolateTypes(meta){
	// var GEOJSONObject = meta.GEOJSONObject;
	var features = meta.GEOJSONObject.features;
      var GeoObjectsList = {

      		"points": [],
      		"lineStrings" :[],
      		"polygons" : [],
      		"MultiPolygons": [] 
      };


    for (var i in features) {
      var geometry = features[i].geometry;
      // alert(geometry.toSource());
      if (geometry != null) {

        var patternGC = "GeometryCollection";
        regGC = new RegExp(patternGC);
        var type = geometry.type;



        if (regGC.test(type) == true) {
          	alert("GM COLL");
          	var geometries = geometry.geometries;
          	for (var j = 0; j < geometries.length; j++) {
            getLocationsByType( geometries[j], GeoObjectsList,meta.doPoints, meta.doLines,meta.doPolygons, meta.doMultiPolygons);
          }; // close J LOOP
        /* CLOSE REG TEST FOR GMCollection */ 
        } else {

        // this is simple geometry no geometry collection
         getLocationsByType( geometry,  GeoObjectsList, meta.doPoints, meta.doLines,meta.doPolygons, meta.doMultiPolygons);

        }; // test for collection




      }else{
      	alert("geometry == null");
      }; // geometry is not null
    }; // end of i loop



return GeoObjectsList;

};

  function getLocationsByType(geometry , GeoObjectList, checkForPoints,checkForLines,checkForPolys, checkForMultiPolys) {

    var coords = null;
    if (geometry.hasOwnProperty("coordinates")) {
      var type = geometry.type;
      var pattern = "";
      coords = geometry.coordinates;
    // ------------ CHECK 4 POINTS ------------
    if((checkForPoints)){

          pattern = "Point";
          var regPnt = new RegExp(pattern, "g");
          if (regPnt.test(type)    == true) {
          	GeoObjectList.points.push(coords);

            // getPointType(ALLSettings, coords, feature , type);
          }; // end POINT}
    };// end type 0 dont draw

    // ------------ CHECK 4 LINSTRINGs ------------
    if(checkForLines){
          pattern = "LineString";
          var regLn = new RegExp(pattern, "g");
          if (regLn.test(type)     == true) {
          	GeoObjectList.lineStrings.push(coords);

            // getLingStringType(ALLSettings, coords, feature, counter, type);
          }; // end LINESTRING
    };// end type 0 dont draw

    // ------------ CHECK 4 POLYGON ------------
    if(checkForPolys){
          pattern = "Polygon";
          var regPol = new RegExp(pattern, "g");
          if (regPol.test(type)    == true)  {
          	GeoObjectList.polygons.push(coords);

            // getPolygonType(ALLSettings, coords, type );
          }; //end POLYGON
    };// end type 0 dont draw

    // ------------ CHECK 4 MULTIPOLYGON ------------
    if( checkForMultiPolys){
          pattern = "MultiPolygon";
          var regMPol = new RegExp(pattern, "g");
          if (regMPol.test(type)   == true) {

          	GeoObjectList.MultiPolygons.push(coords);
            // getMultiPolygonType(ALLSettings, coords, type);
          }; //end MULTIPOLYGON  
    };// end type 0 dont draw
    } else {
      alert(ERRORnogeometry);

    };
  
  };

  //END SCRIPT
}