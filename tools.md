---
layout: page
title: Tools
---  
<br>  
![buffer](asset/buffer.png)  
![buffer](asset/buffer.png)  
##The GeoCommons GeoJson Bookmarklet  
<p>To get your data into AE we need them in a format called <a href="http://www.geojson.org">GeoJson</a>. If we use <a href="http://geocommons.com">geocommons</a> to create this data there is a hidden feature to get them as GeoJson.</p>
<p>A dataset has always an url like this: http://geocommons.com/overlays/228815
	<br>
	the thing we need is the number. In this case <strong>228815</strong>. This has to be inserted into another url like this: http://geocommons.com/overlays/228815/features.json?geojson=1
	<br>
  With this url you will get a pure GeoJson file from that dataset.</p>


----------------  

<div class="hero-unit">
	 <p>To make this a bit easier my good friend <a href="http://twitter.com/PDXIII">@PDXIII</a> wrote a bookmarklet for us. So just follow the instructions below if you want to do this the easy way or take a peek into <a href="https://gist.github.com/3680067">the gist of that toy</a></p>  

	<h2>How 2 do that the easy way</h2>
<ol>
	<li>Drag the button below into your bookmark bar for getting the bookmarklet</li>

<br>
<button><a href="javascript:(function(){var currURL=document.URL;var dataSetID=currURL.match('([0-9]+)');var dataSetURL='http://geocommons.com/overlays/'+dataSetID[0]+'/features.json?geojson=1';dataSetJSON=window.open(dataSetURL,'GeoCommonsJSON');}());">The-Geo-Beast Bookmarklet</a>
</button>
<br>
<br>
<li>Then visit <a href="http://geocommons.com/">GeoCommons.org</a> and choose a dataset <strong>(not a map!)</strong>.
</li>
	<li>Then hit the bookmarklet. An the GeoJson file will open in a new window.</li>

	<li>Now hit "save as ..." to save the GeoJson or copy &amp; paste into your favorite text editor.</li>

	<li>Have fun!</li>
</ol>

</div>


##The [Processing](http://processing.org) OBJ Exporter  
creating obj from GEOJson for AE 2012  
get it [here-->](https://github.com/downloads/fabiantheblind/The-Geo-Beast/GeoJsonToWavefrontOBJ.zip)  
  
author [@fabiantheblind](http://fabiantheblind.github.com)   
using processing libraries:  
<a href="http://n-e-r-v-o-u-s.com/tools/obj.php">n-e-r-v-o-u-s obj export</a><br>
<code>import nervoussystem.obj.*;</code>

<a href="https://github.com/agoransson/JSON-processing">JSON 4 processing</a><br>
<code>import org.json.*;</code>


###Your Options
- Hit 'o' or 'O' for .obj export (this will also write a report)  
- Hit 'i' or 'I' for to write an .jpg file of that view  
- Hit 'r' or 'R' for the report  

####Define your filename in this way:
it has to be the exact name without extension  

<code>String GEOJsonFilename = "countries.geo";</code>

####How To Map Lat Lon To A Equirectangular Map  
- latitude is y  
-- latitude = +90 || y = 0   
-- latitude = -90 || y = 180  

- longitude is x  
-- longitude  -180 || x = 0  
-- longitude  +180 || x = 360  

So the coordiantae space has to be pushed into the center and the latitude has to be reversed to fit the AE and the Processing coordinate space. The base size is 360 width x 180 height.
