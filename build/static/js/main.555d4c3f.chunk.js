(this["webpackJsonprandom-random"]=this["webpackJsonprandom-random"]||[]).push([[0],{13:function(t,e,a){},14:function(t,e,a){"use strict";a.r(e);var n=a(0),r=a.n(n),c=a(2),i=a.n(c),l=(a(13),a(5)),o=a(3),s=a(4),u=a(6),m=a(7),h=[{name:"Base Notes",value:["C","D","E","F","G","A","B"]},{name:"All Notes",value:["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"]},{name:"Intervals",value:["Root","Minor 2nd","Major 2nd","Minor 3rd","Major 3rd","Perfect 4th","Augmented 4th","Perfect 5th","Minor 6th","Major 6th","Minor 7th","Major 7th"]}];function d(t){return t[Math.floor(Math.random()*t.length)]}var p=function(t){Object(m.a)(a,t);var e=Object(u.a)(a);function a(){var t;Object(o.a)(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(t=e.call.apply(e,[this].concat(r))).interval=null,t.state={characters:[],timer:1,isRunning:!0,displayedCharacter:"a",isTicking:!1},t.updateCharacter=function(){var e=t.state,a=e.characters,n=e.displayedCharacter,r=d(a);if(a.length>1)for(;r===n;)r=d(a);t.setState({displayedCharacter:r,isTicking:!0}),window.setTimeout((function(){return t.setState({isTicking:!1})}),100)},t.start=function(){var e=t.state.timer;t.setState({isRunning:!0}),t.updateCharacter(),t.interval=window.setInterval((function(){t.updateCharacter()}),1e3*e)},t.stop=function(){window.clearInterval(t.interval),t.setState({isRunning:!1})},t}return Object(s.a)(a,[{key:"componentDidMount",value:function(){var t=window.localStorage.getItem("cache");t&&this.setState(JSON.parse(t))}},{key:"componentDidUpdate",value:function(t,e){var a=this.state,n=a.characters,r=a.timer;e.characters===n&&e.timer===r||window.localStorage.setItem("cache",JSON.stringify(this.state))}},{key:"render",value:function(){var t=this,e=this.state,a=e.timer,n=e.isRunning,c=e.displayedCharacter,i=e.characters,o=e.isTicking;return r.a.createElement("div",null,r.a.createElement("h1",{className:"title"},"Random Random"),!n&&r.a.createElement(r.a.Fragment,null,r.a.createElement("input",{value:i.join(", "),onChange:function(e){t.setState({characters:Object(l.a)(new Set(e.target.value.split(",").map((function(t){return t.trim()})).filter(Boolean)))})},className:"characters input",placeholder:"Characters to Randomize",type:"text"}),r.a.createElement("input",{defaultValue:a,onChange:function(e){t.setState({timer:parseInt(e.target.value,10)||0})},className:"interval input",placeholder:"Interval in Seconds",type:"number"}),r.a.createElement("button",{className:"button start",onClick:this.start,disabled:i.length<=1},"START"),r.a.createElement("h2",null,"Boilerplates"),r.a.createElement("ul",{className:"boilerplate"},h.map((function(e){return r.a.createElement("li",{onClick:function(){return t.setState({characters:e.value})}},e.name)})))),n&&r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"displayed-character ".concat(o?"tick":"")},c),r.a.createElement("button",{className:"button stop",onClick:this.stop},"STOP")))}}]),a}(r.a.Component);i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(p,null)),document.getElementById("root"))},8:function(t,e,a){t.exports=a(14)}},[[8,1,2]]]);
//# sourceMappingURL=main.555d4c3f.chunk.js.map