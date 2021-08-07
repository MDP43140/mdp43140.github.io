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
