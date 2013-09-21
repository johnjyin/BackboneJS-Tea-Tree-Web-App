BackboneJS-Tea-Tree-Web-App
===========================

This web application is based on Backbone.js with following features:

- is one MVC SPAs having Backbone nested views, collection, and models
- have data CRUD operations
- whenever one Model's data change, all the Views bound automatically re-render 
- be integrate with RESTful services based on Slim framework (PHP version)
- use XMLHttpRequest object to upload picture data to web server
- user can drag & drop image file and upload it to web server by HTML 5 APIs: FormData, FileReader
- is one Responsive Web Design (RWD) application by CSS3 Media Queries 
- is one modular Backbone app which loading JS code as-needed by RequireJS

Here is the folder structure:
   - TeaTree-Backbone-Database.sql 
   - \ teatree-backbone \ [ the basic backbone web app: Tea Tree ]
   - \ teatree-backbone-requirejs \ [ Tea Tree web app ( modular version ) ]
   - \ teatree-jqm \ [ Tea Tree web app ( mobilized by jQuery Mobile ) ]

You just need set up XAMPP on u local computer, which install one MYSQL database and table 'ct_tbl_tea' by TeaTree-Backbone-Database.sql

Before you try to run each apps, I do suggest you look through following related of my blogs: 
<a href="http://www.ebizdesigner.com/website-building/backbone/item/49-backbone-client-side-mvc-tree.html" target="_blank">
Backbone MV* App: Tea Tree</a> on www.ebizdesigner.com:
- <a href="http://www.ebizdesigner.com/website-building/backbone/item/49-backbone-client-side-mvc-tree.html" target="_black">Basic Infrastructure</a>
- <a href="http://www.ebizdesigner.com/website-building/backbone/item/51-backbonejs-mvc-app-tea-tree-part-2.html" target="_blank">CRUD Operations</a>
- <a href="http://www.ebizdesigner.com/website-building/backbone/item/52-backbonejs-mvc-app-tea-tree-part-3.html" target="_blank">Upload Pictures</a>
- <a href="http://www.ebizdesigner.com/website-building/backbone/item/54-backbone-mvc-teatree-modular-by-requirejs.html" target="_blank">Modular by RequireJS</a>
- <a href="http://www.ebizdesigner.com/website-building/backbone/item/55-backbone-mobile-web-app-teatree-jquerymobile.html" target="_blank">Mobilized by jQM</a>

I share this series apps with everybody, and very happen to hear it could be a little help. 
Any questions or issues, please feedback to me so as it could have better helps to others.
