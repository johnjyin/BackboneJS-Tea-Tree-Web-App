BackboneJS-Tea-Tree-Web-App
===========================

This web application is based on Backbone.js with following features:

- is one MVC SPAs having Backbone nested views, collection, and models
- have data CRUD operations
- whenever one Model's data change, all the Views bound to that Model automatically re-render 
- integrate with RESTful services based on Slim framework (PHP version)
- use XMLHttpRequest object to upload picture data to web server
- user can drag & drop image file and upload it to web server utilize HTML 5 APIs: communication, drag & drop
- is one Responsive Web Design (RWD) application by CSS3 Media Queries mechnics
- is one modular Backbone app which loading JS code as-needed by RequireJS

Here is the folders base structure:
   - TeaTree-Backbone-Database.sql 
   - \ teatree-backbone \ [one backbone basic web app: Tea Tree]
   - \ teatree-backbone-requirejs \ [Tea Tree web app (modular version)]
   - \ teatree-jqm \ [Tea Tree web app (mobilized by jQuery Mobile)]

You just need XAMPP in u local computer, and install the MYSQL database table 'ct_tbl_tea' by TeaTree-Backbone-Database.sql

Before you try to run each app, I do suggest you look through following related of my blogs: 
<a href="www.ebizdesigner.com/website-building/backbone/item/49-backbone-client-side-mvc-tree.html">
Backbone MV* App: Tea Tree</a> on www.ebizdesigner.com:
- <a href="www.ebizdesigner.com/website-building/backbone/item/49-backbone-client-side-mvc-tree.html">Basic Infrastructure</a>
- <a href="www.ebizdesigner.com/website-building/backbone/item/51-backbonejs-mvc-app-tea-tree-part-2.html">CRUD Operations</a>
- <a href="www.ebizdesigner.com/website-building/backbone/item/52-backbonejs-mvc-app-tea-tree-part-3.html">Upload Pictures</a>
- <a href="www.ebizdesigner.com/website-building/backbone/item/54-backbone-mvc-teatree-modular-by-requirejs.html">Modular by RequireJS</a>
- <a href="www.ebizdesigner.com/website-building/backbone/item/55-backbone-mobile-web-app-teatree-jquerymobile.html">Mobilized by jQM</a>

I share this series apps with everybody, and very happen to hear it could be a little help. 
Any questions or issues, please feedback to me so as it could be better help others.
