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


