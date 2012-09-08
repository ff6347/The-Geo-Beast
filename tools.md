---
layout: page
title: Tools
---  
<br>  
![buffer](asset/buffer.png)  
![buffer](asset/buffer.png)  
##The GeoCommons GeoJson Bookmarklet  
<p>To get your data into AE we need them in a format called <a href="http://www.geojson.org">GeoJson</a>. If we use <a href="http://geocommons.com">geocommons</a> to create this data there is a hidden feature to get them as GeoJson.</p><br>  
<p>A dataset has always an url like this:<br>
	http://geocommons.com/overlays/228815<br><br>
	the thing we need is the number. In this case 228815. This has to be inserted into another url like this:<br>
	http://geocommons.com/overlays/228815/features.json?geojson=1 <br><br>  
  With this url you will get a pure GeoJson file from that dataset.</p><br> 
 <p>To make this a bit easier my good friend <a href="http://twitter.com/PDXIII">@PDXIII</a> wrote a bookmarklet for us. So just follow the instructions below if you want to do this the easy way.</p>  

----------------  

<p>1. Drag the button below into your bookmark bar for getting the bookmarklet</p>
<button><a href="javascript:(function(){var currURL=document.URL;var dataSetID=currURL.match('([0-9]+)');var dataSetURL='http://geocommons.com/overlays/'+dataSetID[0]+'/features.json?geojson=1';dataSetJSON=window.open(dataSetURL,'GeoCommonsJSON');}());">The-Geo-Beast Bookmarklet</a></button>
<p>2. Then visit <a href="http://geocommons.com/">GeoCommons.org</a> and choose a dataset <strong>(not a map!)</strong>.</p>
<p>3. Then hit the bookmarklet an the GeoJson file will oben in a new window.</p>
<p>4. Now hit "save as ..." to save the GeoJson or copy &amp; paste into your favorite text editor.</p>
<p>5. Have fun!</p>


##The Processing OBJ Exporter  
creating obj from GEOJson for AE 2012  
get it [here-->](https://github.com/downloads/fabiantheblind/The-Geo-Beast/GeoJsonToWavefrontOBJ.zip)
@author fabiantheblind   
using processing libraries:  
<a href="http://n-e-r-v-o-u-s.com/tools/obj.php">n-e-r-v-o-u-s obj export</a><br>
<code>import nervoussystem.obj.*;</code>

<a href="https://github.com/agoransson/JSON-processing">JSON 4 processing</a><br>
<code>import org.json.*;</code>


###YOUR OPTIONS
- Hit 'o' or 'O' for .obj export (this will also write a report)  
- Hit 'i' or 'I' for to write an .jpg file of that view  
- Hit 'r' or 'R' for the report  

####Define your filename in this way:
it has to be the exact name without extension  

<code>String GEOJsonFilename = "countries.geo";</code>

####HOW TO MAP LAT LON TO A EQUIRECTANGULAR MAP
- latitude is y  
-- latitude = +90 || y = 0   
-- latitude = -90 || y = 180  

- longitude is x  
-- longitude  -180 || x = 0  
-- longitude  +180 || x = 360  

So the coordiantae space has to be pushed into the center and the latitude has to be reversed to fit the AE and the Processing coord space. The base size is 360 width x 180 height.
