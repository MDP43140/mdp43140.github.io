let navbar_unlock,prevScrlPos = window.pageYOffset;
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
searchInput.onkeyup=e=>{if(e.which == 13){e.preventDefault();submitSearch.click();searchInput.value = ''}};

// Ripple Effect
for(let i of document.querySelectorAll("button, #navbar a")){i.style.position="relative";i.style.overflow="hidden";i.addEventListener("click",function(e){let x,y,b,c=document.createElement("div");e.pageX&&e.pageY?(x=e.pageX-this.offsetLeft,y=e.pageY-this.offsetTop):(b=c.getBoundingClientRect(),x=b.right,y=b.bottom);c.style=`top:${y}px;left:${x}px;position:absolute;opacity:.4;background:${document.body.className.indexOf("bright")?"#000":"#fff"};border-radius:50%;width:5px;height:5px`;c.animate([{transform:'scale(99)',opacity:0}],{duration:400,easing:'ease-out'}).onfinish=x=>c.remove();this.append(c)})}
