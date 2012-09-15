---
title: The Geo Json 2 Wavefront OBJ processing sketch
layout: post
category : blog
tags : [processing, obj, json, geojson]
---

##The Geo Json 2 Wavefront OBJ
Finally. This code was flying around for month and blocking one of my private repos only because I had so much junk in there that should not be publish to github. The problem was how to keep it clean. I didn't know how to except a file from the .gitignore.
After cleaning out the git tracking on the folder fully, I added a clean git repo. First thing to do?  
Add a .gitignore file that looks like this:  

{% highlight text %}
*.txt
*.json
*.jpg
*.csv
*.xml
*.obj
*.kml
*.kmz
*.zip
!world_map_1.jpg
!countries.geo.json
!LICENSE.txt
{% endhighlight %}  
  
Important is to call the `!LICENSE.txt` after the `*.txt` call. Or the .gitignore won't recognize the excepted file.  
Long story short. Here it is the [GeoJson2obj Repo](https://github.com/fabiantheblind/GeoJson2obj). Fork it or downlaod the [last HEAD](https://github.com/fabiantheblind/GeoJson2obj/zipball/master)  
