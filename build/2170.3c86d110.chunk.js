(self.webpackChunkstrapi=self.webpackChunkstrapi||[]).push([[2170],{22131:function(x,B,a){(function(e,s){x.exports=s(a(67294))})(this,function(e){return function(s){var d={};function t(r){if(d[r])return d[r].exports;var n=d[r]={i:r,l:!1,exports:{}};return s[r].call(n.exports,n,n.exports,t),n.l=!0,n.exports}return t.m=s,t.c=d,t.d=function(r,n,i){t.o(r,n)||Object.defineProperty(r,n,{enumerable:!0,get:i})},t.r=function(r){typeof Symbol!="undefined"&&Symbol.toStringTag&&Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(r,"__esModule",{value:!0})},t.t=function(r,n){if(1&n&&(r=t(r)),8&n||4&n&&typeof r=="object"&&r&&r.__esModule)return r;var i=Object.create(null);if(t.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:r}),2&n&&typeof r!="string")for(var l in r)t.d(i,l,function(E){return r[E]}.bind(null,l));return i},t.n=function(r){var n=r&&r.__esModule?function(){return r.default}:function(){return r};return t.d(n,"a",n),n},t.o=function(r,n){return Object.prototype.hasOwnProperty.call(r,n)},t.p="",t(t.s=110)}({0:function(s,d){s.exports=e},110:function(s,d,t){"use strict";t.r(d);var r=t(0);function n(){return(n=Object.assign||function(i){for(var l=1;l<arguments.length;l++){var E=arguments[l];for(var c in E)Object.prototype.hasOwnProperty.call(E,c)&&(i[c]=E[c])}return i}).apply(this,arguments)}d.default=function(i){return r.createElement("svg",n({width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},i),r.createElement("path",{d:"M15.224 15.508l-2.213 4.65a.6.6 0 01-.977.155l-3.542-3.739a.6.6 0 00-.357-.182l-5.107-.668a.6.6 0 01-.449-.881l2.462-4.524a.6.6 0 00.062-.396L4.16 4.86a.6.6 0 01.7-.7l5.063.943a.6.6 0 00.396-.062l4.524-2.462a.6.6 0 01.881.45l.668 5.106a.6.6 0 00.182.357l3.739 3.542a.601.601 0 01-.155.977l-4.65 2.213a.6.6 0 00-.284.284zm.797 1.927l1.414-1.414 4.243 4.242-1.415 1.415-4.242-4.243z",fill:"#212134"}))}}})})},72170:(x,B,a)=>{"use strict";a.r(B),a.d(B,{default:()=>Z});var e=a(67294),s=a(78862),d=a.n(s),t=a(5493),r=a.n(t),n=a(49425),i=a.n(n),l=a(91767),E=a.n(l),c=a(9008),ce=a.n(c),F=a(22131),H=a.n(F),m=a(19408),de=a.n(m),u=a(60985),ue=a.n(u),O=a(85104),he=a.n(O),j=a(84734),z=a.n(j),Y=a(84040),G=a.n(Y),g=a(9925),_e=a.n(g),V=a(66526),$=a.n(V),X=a(43257),_=a.n(X),h=a(11402),Ee=a.n(h),J=a(27102),N=a.n(J),y=a(46202);const S="https://api.chartbrew.com",R="https://app.chartbrew.com";function Q(){const[f,M]=(0,e.useState)(S),[L,D]=(0,e.useState)(R),[v,U]=(0,e.useState)(""),[q,w]=(0,e.useState)(!1),[T,C]=(0,e.useState)(!1),[b,I]=(0,e.useState)(!1),[W,ee]=(0,e.useState)({}),[P,K]=(0,e.useState)(""),[te,p]=(0,e.useState)(!1),[k,A]=(0,e.useState)(!1),[ae,ne]=(0,e.useState)(!1);(0,e.useEffect)(()=>{(0,y.G)().then(o=>{M(o.host),D(o.clientHost),U(o.token),A(o.hasToken)})},[]);const re=()=>!f||f.indexOf("http")===-1||!v||!L,oe=()=>{M(S),D(R)},le=()=>{C(!1),I(!1),w(!0),(0,y.I)({clientHost:L,host:f,token:v}).then(()=>fetch(`${f}/user/relog`,{method:"POST",headers:new Headers({accept:"application/json",authorization:`Bearer ${v}`})})).then(o=>{if(!o.ok)throw new Error(400);return o.json()}).then(o=>{C(!0),w(!1),ee(o)}).catch(()=>{C(!1),I(!0),w(!1)})},se=()=>{!P||(p(!0),(0,y.I)({strapiToken:P}).then(o=>{p(!1),A(o.hasToken),K("")}).catch(()=>p(!1)))},ie=()=>{p(!0),(0,y.I)({strapiToken:!1}).then(o=>{p(!1),A(o.hasToken)}).catch(()=>p(!1))};return e.createElement("div",null,e.createElement(s.HeaderLayout,{title:"Chartbrew Setup",subtitle:"Connect to Chartbrew to start visualizing your Strapi data",primaryAction:e.createElement(u.LinkButton,{endIcon:e.createElement(_(),null),href:"https://chartbrew.com?utm_source=strapi_plugin",target:"_blank",rel:"noopener noreferrer"},"Learn more about Chartbrew")}),e.createElement(c.Stack,{spacing:8},e.createElement(s.ContentLayout,null,e.createElement(t.Box,{padding:6,paddingLeft:8,paddingRight:8,shadow:"filterShadow",background:"neutral0"},e.createElement(t.Box,{paddingTop:2},e.createElement(n.Typography,{variant:"beta"},"Get started with Chartbrew")),e.createElement(t.Box,null,e.createElement(n.Typography,{variant:"omega"},"Learn how to get started with Chartbrew using the managed service or by self-hosting")),e.createElement(t.Box,{paddingTop:6},e.createElement(h.TabGroup,{label:"Two ways to get started with Chartbrew",id:"tabs",variant:"simple"},e.createElement(h.Tabs,null,e.createElement(h.Tab,null,"Managed service"),e.createElement(h.Tab,null,"Self-hosting")),e.createElement(h.TabPanels,null,e.createElement(h.TabPanel,null,e.createElement(t.Box,{color:"neutral800",padding:4,background:"neutral0"},e.createElement(t.Box,null,e.createElement(n.Typography,null,"While using the managed service, all you have to do is to create an account at chartbrew.com and then follow the instructions to create an API key: ")),e.createElement(t.Box,{paddingTop:2},e.createElement(u.LinkButton,{href:"https://app.chartbrew.com/signup",target:"_blank",rel:"noopener",endIcon:e.createElement(_(),null),variant:"tertiary"},"1. Create an account and activate your 30-day trial here ")),e.createElement(t.Box,{paddingTop:2},e.createElement(u.LinkButton,{href:"https://chartbrew.com/blog/how-to-create-api-keys-in-chartbrew/",target:"_blank",rel:"noopener",endIcon:e.createElement(_(),null),variant:"tertiary"},"2. How to get your Chartbrew API key ")))),e.createElement(h.TabPanel,null,e.createElement(t.Box,{color:"neutral800",padding:4,background:"neutral0"},e.createElement(t.Box,null,e.createElement(n.Typography,null,"Chartbrew can be self-hosted in a number of ways. You can use the Docker image, a VPS, or plaforms like Heroku and Vercel. Below are some links to get you started: ")),e.createElement(t.Box,{paddingTop:2},e.createElement(u.LinkButton,{href:"https://github.com/chartbrew/chartbrew?utm_source=strapi-plugin",target:"_blank",rel:"noopener",endIcon:e.createElement(_(),null),variant:"tertiary"},"Chartbrew on GitHub ")),e.createElement(t.Box,{paddingTop:2},e.createElement(u.LinkButton,{href:"https://docs.chartbrew.com/deployment/#run-the-application-with-docker?utm_source=strapi-plugin",target:"_blank",rel:"noopener",endIcon:e.createElement(_(),null),variant:"tertiary"},"Run Chartbrew using the Docker image ")),e.createElement(t.Box,{paddingTop:2},e.createElement(u.LinkButton,{href:"https://chartbrew.com/blog/how-to-deploy-chartbrew-on-heroku-and-vercel?utm_source=strapi-plugin",target:"_blank",rel:"noopener",endIcon:e.createElement(_(),null),variant:"tertiary"},"Deploy Chartbrew on Heroku & Vercel ")),e.createElement(t.Box,{paddingTop:2},e.createElement(u.LinkButton,{href:"https://chartbrew.com/blog/how-to-create-api-keys-in-chartbrew/",target:"_blank",rel:"noopener",endIcon:e.createElement(_(),null),variant:"tertiary"},"How to get your Chartbrew API key "))))))))),e.createElement(s.ContentLayout,null,e.createElement(t.Box,{padding:6,paddingLeft:8,paddingRight:8,shadow:"filterShadow",background:"neutral0"},e.createElement(t.Box,{paddingTop:2},e.createElement(n.Typography,{variant:"beta"},"Connect to Chartbrew")),e.createElement(t.Box,null,e.createElement(n.Typography,{variant:"omega"},"You can change this to your own instance of Chartbrew, or use the managed service to not have to host the platform yourself.")),e.createElement(t.Box,{paddingTop:4},e.createElement(l.Field,{name:"host"},e.createElement(c.Stack,{spacing:1},e.createElement(l.FieldLabel,null,"Chartbrew application host (frontend URL)"),e.createElement(l.FieldInput,{type:"text",placeholder:"Enter your Chartbrew application host",value:L,onChange:o=>D(o.target.value)})))),e.createElement(t.Box,{paddingTop:4},e.createElement(l.Field,{name:"host"},e.createElement(c.Stack,{spacing:1},e.createElement(l.FieldLabel,null,"Chartbrew API host (backend URL)"),e.createElement(l.FieldInput,{type:"text",placeholder:"Enter your Chartbrew API host",value:f,onChange:o=>M(o.target.value)})))),e.createElement(t.Box,{paddingTop:4},e.createElement(m.Button,{variant:"tertiary",endIcon:e.createElement(H(),null),onClick:oe,size:"S"},"Use managed Chartbrew address")),e.createElement(t.Box,{paddingTop:4},e.createElement(l.Field,{name:"token"},e.createElement(c.Stack,{spacing:1},e.createElement(l.FieldLabel,null,"Chartbrew API Token - ",e.createElement(O.Link,{href:"https://chartbrew.com/blog/how-to-create-api-keys-in-chartbrew/",isExternal:!0}," How to generate an API Token")),e.createElement(l.FieldInput,{type:"password",placeholder:"Enter your Chartbrew API Token",value:v,onChange:o=>U(o.target.value)})))),e.createElement(t.Box,{paddingTop:4},e.createElement(c.Stack,{horizontal:!0,spacing:2},e.createElement(m.Button,{variant:T&&"success-light"||b&&"danger-light"||"default",disabled:re(),loading:q,endIcon:T&&e.createElement(z(),null)||b&&e.createElement(G(),null)||null,onClick:le},"Save and check the connection"),W.id&&e.createElement(u.LinkButton,{variant:"secondary",endIcon:e.createElement($(),null),to:`/plugins/${N()}`},"Continue to your dashboard"))),b&&e.createElement(t.Box,{paddingTop:4},e.createElement(g.Alert,{closeLabel:"Close alert",title:"Authentication failed",variant:"danger",onClose:()=>I(!1)},"Something went wrong with the authentication. Please check the host and token are correct and try again.")),T&&e.createElement(t.Box,{paddingTop:4},e.createElement(g.Alert,{closeLabel:"Close alert",title:`Welcome ${W.name}!`,variant:"success",onClose:()=>C(!1)},"Successfully authenticated with Chartbrew. Head over to your dashboard to get started. ")),ae&&e.createElement(t.Box,{paddingTop:4},e.createElement(g.Alert,{closeLabel:"Close alert",title:"Chartbrew might not be able to create charts",variant:"default",onClose:()=>ne(!1)},"It seems you are running Strapi on your local machine and you are connecting to a Chartbrew instance that is hosted on an external server. You might not be able to create new visualizations from your Strapi data, but you can create the charts in Chartbrew and then see them in your Strapi dashboard. ")))),e.createElement(s.ContentLayout,null,!k&&e.createElement(t.Box,{padding:6,paddingLeft:8,paddingRight:8,shadow:"filterShadow",background:"neutral0"},e.createElement(t.Box,{paddingTop:2},e.createElement(n.Typography,{variant:"delta"},"Allow Chartbrew to create charts from Strapi data")),e.createElement(t.Box,null,e.createElement(n.Typography,{variant:"omega"},"Create a Read-only API token and enter it in the field below. ",e.createElement(O.Link,{to:"/settings/api-tokens"},"Click here to create an API token "))),e.createElement(t.Box,{paddingTop:4},e.createElement(l.Field,{name:"host"},e.createElement(c.Stack,{spacing:1},e.createElement(l.FieldLabel,null,"Strapi API Token"),e.createElement(l.FieldInput,{type:"password",placeholder:"Enter a Strapi Read-Only token here",value:P,onChange:o=>K(o.target.value)})),e.createElement(n.Typography,{variant:"pi"},"You will not be able to see this token after you save it. "))),e.createElement(t.Box,{paddingTop:4},e.createElement(m.Button,{variant:T&&"success-light"||b&&"danger-light"||"default",disabled:!P&&!k,loading:te,onClick:se},"Save token"))),k&&e.createElement(t.Box,{padding:6,paddingLeft:8,paddingRight:8,shadow:"filterShadow",background:"neutral0"},e.createElement(t.Box,{paddingTop:2},e.createElement(n.Typography,{variant:"delta"},"Chartbrew can now create charts from your Strapi data")),e.createElement(t.Box,null,e.createElement(n.Typography,{variant:"omega"},"Chartbrew uses your Strapi API token to create charts automatically from your Strapi dashboard. You can disallow this option by clicking the remove button below. ")),e.createElement(t.Box,{paddingTop:4},e.createElement(m.Button,{variant:"danger-light",onClick:ie},"Remove Chartbrew's access ")),e.createElement(t.Box,{paddingTop:4},e.createElement(g.Alert,{closeLabel:"Close alert",title:"A note on Chartbrew's access",variant:"default"},e.createElement("p",null,"All existing charts will still have read access for your Strapi data. When removing the access, this will only be applied to future charts. To stop existing charts from reading the data, please head over to the Chartbrew app and remove the charts from there. ")))))))}const Z=(0,e.memo)(Q)}}]);
