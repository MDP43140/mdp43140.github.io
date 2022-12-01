let navbar_unlock,
		prevScrlPos = window.pageYOffset,
		navbar = document.querySelector("nav#bar");
/*if (window.matchMedia("(prefers-color-scheme:dark)").matches){
		document.body.className=document.body.className.replace("bright","");
		rethemeBtn.innerText = "🌘️";
} else {
	document.body.className += " bright";
	rethemeBtn.innerText = "☀️";
};*/
retheme=()=>{
	document.body.classList.toggle("bright");
	if (document.body.className.indexOf("bright") > -1){
		rethemeBtn.innerText = "🌘️";
	} else {
		rethemeBtn.innerText = "☀️";
	}
}
window.onscroll=()=>{
let currScrlPos = window.pageYOffset;
  if (prevScrlPos > currScrlPos){navbar.style.top = 0;navbar_unlock = 0}
  else {navbar.style.top = "-50px";navbar_unlock = 1}
  prevScrlPos = currScrlPos;
}
/* Bug Fixed: Scroll Down, Then Little bit up, Then Move Mouse. */
window.onmousemove=()=>{
	if(window.event.clientY < 46){navbar.style = "top:0"}
	else if(window.event.clientY > 46 && navbar_unlock){navbar.style.top = "-50px"}
}
//searchInput.onkeyup=e=>{if(e.which == 13){e.preventDefault();submitSearch.click();searchInput.value = ''}};

// Simple fast memoize
window.memoize=f=>{let k,c=Object.create(null);return(...a)=>{k=JSON.stringify(a);return(c[k]=c[k]||f(...a))}};

// Scramble text (optionally depends on memoize to reduce lag)
window.scrambleText=(()=>{let e,t,s="";return this.rndTxt=memoize((function(){for(s="",e=0;e<this.queue.length;e++){let{from:i,to:h,start:r,end:u,char:a}=this.queue[e];this.frame>=u?(t++,s+=h):this.frame>=r?((!a||Math.random()<.3)&&(this.queue[e].char=a="!<>\\/[]{}-_—=+*^?#"[~~(18*Math.random())]),s+=`<span style="opacity: 0.4">${a}</span>`):s+=i}return s})),this.modQueue=memoize(((t,s)=>{let i;for(this.queue=[],e=0,length=Math.max(t.length,s.length);e<length;e++)i=~~(10*Math.random()),this.queue.push({from:t[e]||"",to:s[e]||"",start:i,end:i+~~(10*Math.random())})})),this.update=e=>{t=0,this.el.innerHTML=this.rndTxt(e+this.frame),t===this.queue.length?this.resolve():(this.frameRequest=setTimeout((()=>requestAnimationFrame(this.update)),50),this.frame++)},this.clearQueue=()=>{this.queue=[],clearTimeout(this.frameRequest)},this.setText=(e,t)=>{this.el=t,this.frame=0,this.promise=new Promise((e=>this.resolve=e));let s=t.innerText;return this.modQueue(s,e),clearTimeout(this.frameRequest),this.update(s+e),this.promise},this.setText.clearQueue=this.clearQueue,this.setText})();

// Header animation
document.querySelector("section#home header.header > .header__title").innerText = "";
document.querySelector("section#home header.header > .header__desc").innerText = "";
scrambleText("MDP Website",document.querySelector("section#home header.header > .header__title")).then(()=>{
	scrambleText("Welcome To My Website.",document.querySelector("section#home header.header > .header__desc"))
});

// Ripple Effect
(()=>{"use strict";for(let e of document.querySelectorAll("button, nav#bar > a")){let t,o,n=0,i=e,r=e=>{if(n>1||t)return;n++,t=setTimeout((()=>t=null),50),o=i.getBoundingClientRect();let r={el:document.createElement("div")},l=e.pageX?e.pageX-o.left:o.width/2,a=e.pageY?e.pageY-o.top:o.height/2;r.el.style=`pointer-events:none;top:${a}px;left:${l}px;position:absolute;opacity:.4;background:#888;border-radius:50%;width:5px;height:5px`,r.tmp0=`scale(${Math.max(i.offsetWidth,i.offsetHeight)/2})`,r.el.animate([{transform:r.tmp0}],{duration:400,easing:"ease-out"}).onfinish=e=>{r.el.style.transform=r.tmp0,r.dA=1},i.append(r.el),r.removeEl=e=>{clearTimeout(r.removeElTimeout),r.dA?(window.removeEventListener("pointerup",r.removeEl),i.removeEventListener("keyup",r.removeEl),r.el.animate([{opacity:0}],{duration:200,easing:"ease-out"}).onfinish=e=>{r.el.remove(),r=null,n--}):r.removeElTimeout=setTimeout((e=>{r.removeEl()}))},window.addEventListener("pointerup",r.removeEl),i.addEventListener("keyup",r.removeEl)};e.style.position="relative",e.style.overflow="hidden",e.addEventListener("pointerdown",r),e.addEventListener("keydown",r)}})();

// Edge lighting Cool effect by Hyperplexed
document.querySelector("body > section > nav#bar").onmousemove = e => {
	for(const card of document.querySelectorAll("body > section > nav#bar > a")){
		const rect = card.getBoundingClientRect(),
					x = e.clientX - rect.left,
					y = e.clientY - rect.top;
		card.style.setProperty("--cursor-x",`${x}px`);
		card.style.setProperty("--cursor-y",`${y}px`);
	};
}