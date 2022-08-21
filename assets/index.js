let navbar_unlock,
		prevScrlPos = window.pageYOffset,
		navbar = document.querySelector("nav#bar");
window.matchMedia("(prefers-color-scheme: dark)").addListener(e=>{
	if (e.matches){
		document.body.className=document.body.className.replace("bright","");
		rethemeBtn.innerText = "🌘️";
	} else {
		document.body.className += " bright";
		rethemeBtn.innerText = "☀️";
	}
});
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

// Ripple Effect
(()=>{"use strict";for(let e of document.querySelectorAll("button, nav#bar > a")){let t,o,n=0,i=e,r=e=>{if(n>1||t)return;n++,t=setTimeout((()=>t=null),50),o=i.getBoundingClientRect();let r={el:document.createElement("div")},l=e.pageX?e.pageX-o.left:o.width/2,a=e.pageY?e.pageY-o.top:o.height/2;r.el.style=`pointer-events:none;top:${a}px;left:${l}px;position:absolute;opacity:.4;background:#888;border-radius:50%;width:5px;height:5px`,r.tmp0=`scale(${Math.max(i.offsetWidth,i.offsetHeight)/2})`,r.el.animate([{transform:r.tmp0}],{duration:400,easing:"ease-out"}).onfinish=e=>{r.el.style.transform=r.tmp0,r.dA=1},i.append(r.el),r.removeEl=e=>{clearTimeout(r.removeElTimeout),r.dA?(window.removeEventListener("pointerup",r.removeEl),i.removeEventListener("keyup",r.removeEl),r.el.animate([{opacity:0}],{duration:200,easing:"ease-out"}).onfinish=e=>{r.el.remove(),r=null,n--}):r.removeElTimeout=setTimeout((e=>{r.removeEl()}))},window.addEventListener("pointerup",r.removeEl),i.addEventListener("keyup",r.removeEl)};e.style.position="relative",e.style.overflow="hidden",e.addEventListener("pointerdown",r),e.addEventListener("keydown",r)}})();