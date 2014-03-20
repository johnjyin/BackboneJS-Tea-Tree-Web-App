BackboneJS-Tea-Tree-Web-App
===========================

Click <a href="http://demo.ebizdesigner.com/teatree/" target="_blank"><B>here<B></a> to run the jQuery Mobile + Backbone app. Note: All updating functions have been disabled!

This series web apps are mainly based on Backbone.js with following features:

- MVC SPAs having Backbone nested views, collection, and models
- Have data CRUD operations
   - whenever one Model's data change, all the Views bound automatically re-render 
   - be integrate with RESTful services based on Slim framework (PHP version)
   - use XMLHttpRequest object to upload picture data to web server
- User can drag & drop image file and upload it to web server by HTML 5 APIs: FormData, FileReader
- Responsive Web Design (RWD) application by CSS3 Media Queries 
- Modular Backbone app by RequireJS, so as loading JS code as-needed
- Mobilized web app by jQuery Mobile UI
- jQuery Mobile app by jQuery Mobile + Backbone


Here is the folder structure:
   - TeaTree-Backbone-Database.sql 
   - \ teatree-backbone \ [ the basic backbone web app: Tea Tree ]
   - \ teatree-backbone-requirejs \ [ Tea Tree web app ( modular version ) ]
   - \ teatree-jqm \ [ Tea Tree mobile app ( v1.0 )( jQuery Mobile + Backbone ) ]
   - \ teatree-jqmui \ [ Tea Tree mobilized web app ( Backbone app mobilized by jQuery Mobile UI ) ]

Build a test environment:
- Install XAMPP (like 'c:\xampp')
- Create test database: ebiz-ct, and table: ct_tbl_tea, and insert the test data by TeaTree-Backbone-Database.sql
- Copy each app folder (like Tea Tree mobile app) under your XAMPP working path, like c:\xampp\htdocs

Before you run each app, I do suggest you look through following related of my blogs: 
<a href="http://www.ebizdesigner.com/website-building/backbone/item/49-backbone-client-side-mvc-tree.html" target="_blank">
Backbone MV* App: Tea Tree</a> on www.ebizdesigner.com:
- <a href="http://www.ebizdesigner.com/component/k2/item/49-backbone-client-side-mvc-tree.html" target="_black">Basic Infrastructure</a>
- <a href="http://www.ebizdesigner.com/component/k2/item/51-backbonejs-mvc-app-tea-tree-part-2.html" target="_blank">CRUD Operations</a>
- <a href="http://www.ebizdesigner.com/component/k2/item/52-backbonejs-mvc-app-tea-tree-part-3.html" target="_blank">Upload Pictures</a>
- <a href="http://www.ebizdesigner.com/component/k2/item/54-backbone-mvc-teatree-modular-by-requirejs.html" target="_blank">Modular by RequireJS</a>
- <a href="http://www.ebizdesigner.com/component/k2/item/55-backbone-mobile-web-app-teatree-jquerymobile.html" target="_blank">Mobilized by jQM</a>
- <a href="http://www.ebizdesigner.com/component/k2/item/53-backbonejs-jqm-mobile-app-tea-tree-part-6.html" target="_blank">Mobile Tea Tree App</a> 

I share this series apps with everybody, and very happen to hear it could be a little help. 
Any questions or issues, please feedback to me so as it could have better helps to others.
