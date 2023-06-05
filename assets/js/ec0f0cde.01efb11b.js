"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[777],{9290:function(e,a,t){t.r(a),t.d(a,{assets:function(){return p},contentTitle:function(){return o},default:function(){return d},frontMatter:function(){return s},metadata:function(){return r},toc:function(){return c}});var n=t(3117),i=(t(7294),t(3905));const s={},o="v0.2.0 Dependencies",r={permalink:"/nexus-package-manager/blog/2023_04_24_dependencies",editUrl:"https://github.com/keneanung/nexus-package-manager/edit/development/website/blog/blog/2023_04_24_dependencies.md",source:"@site/blog/2023_04_24_dependencies.md",title:"v0.2.0 Dependencies",description:"I'm happy to announce that the project reached a huge milestone. It now handles dependencies of packages that are listed in package repository.",date:"2023-06-05T13:56:30.000Z",formattedDate:"June 5, 2023",tags:[],readingTime:1.355,hasTruncateMarker:!1,authors:[],frontMatter:{},prevItem:{title:"v0.1.0: MVP",permalink:"/nexus-package-manager/blog/2022_10_23_mvp"},nextItem:{title:"v0.2.1 & v0.2.2 Bugfix for Disappearing Actions",permalink:"/nexus-package-manager/blog/2023_06_05_disappearing_actions"}},p={authorsImageUrls:[]},c=[{value:"Handling dependencies",id:"handling-dependencies",level:2},{value:"UI improvements",id:"ui-improvements",level:2},{value:"Closing words",id:"closing-words",level:2}],l={toc:c},g="wrapper";function d(e){let{components:a,...s}=e;return(0,i.kt)(g,(0,n.Z)({},l,s,{components:a,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"I'm happy to announce that the project reached a huge milestone. It now handles dependencies of packages that are ",(0,i.kt)("a",{parentName:"p",href:"https://keneanung.github.io/nexus-package-repository/"},"listed in package repository"),"."),(0,i.kt)("h2",{id:"handling-dependencies"},"Handling dependencies"),(0,i.kt)("p",null,"Whenever the package manager installs a package, it checks, whether it has other packages that are required for it to function correctly. These packages are first searched in the local package list. If they are installed, the package manager proceeds to install the original package as normal. If a dependency is not installed, the package manager will first install the dependency, before proceeding with the actual requested package installation."),(0,i.kt)("p",null,'The package manager will also make sure, that dependencies are listed in the correct order. This makes sure that the initialization of a package is only attempted when all dependencies are already initialized. No more documenting "and make sure package A is above package B". This happens both after the installation and update of a package.'),(0,i.kt)("h2",{id:"ui-improvements"},"UI improvements"),(0,i.kt)("p",null,"The UI also got some improvements. You can now show package details within the window, including version, description, dependencies and a link to the website."),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"package detail view",src:t(8707).Z,width:"386",height:"484"})),(0,i.kt)("p",null,"The UI main page got some layout imprvements by using icons instead of text for buttons, which makes the page much cleaner."),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"package list view",src:t(2351).Z,width:"379",height:"481"})),(0,i.kt)("h2",{id:"closing-words"},"Closing words"),(0,i.kt)("p",null,"If these features got you interested, please feel free to either ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/keneanung/nexus-package-repository/issues/new?assignees=&labels=new+package&template=new_package.yml&title=%5BPackage%5D%3A+"},"open an issue about including your package")," in the package listing or contact me on the Achaea or Nexus discrod if you need more information. You can also send me a direct message."),(0,i.kt)("p",null,"If you like the project, please consider leaving a star on the ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/keneanung/nexus-package-manager"},"GitHub project")," and ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/sponsors/keneanung"},"sponsoring me"),"."))}d.isMDXComponent=!0},8707:function(e,a,t){a.Z=t.p+"assets/images/detail_page-78b4a6740a57a19127a3465599fa1e12.png"},2351:function(e,a,t){a.Z=t.p+"assets/images/package_listing-27e49b83cfa747c79cde724cbe7f48a4.png"}}]);