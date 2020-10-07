var navbar_unlock,prevScrlPos = window.pageYOffset;
function retheme(){if(document.body.className.indexOf("bright") > -1){document.body.className=document.body.className.replace("bright","")}else{document.body.className+=" bright"}}
window.onscroll = function(){
var currScrlPos = window.pageYOffset;
  if (prevScrlPos > currScrlPos){navbar.style.top = 0;navbar_unlock = false}
  else {navbar.style.top = "-50px";navbar_unlock = true}
  prevScrlPos = currScrlPos;
}
/* Bug Fixed: Scroll Down, Then Little bit up, Then Move Mouse. */
window.onmousemove = function(){
	if (window.event.clientY < 46){navbar.style = "top:0"}
	else if (window.event.clientY > 46 && navbar_unlock){navbar.style.top = "-50px"}
}

searchInput.onkeyup = function(e){
  if (e.keyCode == 13){
   e.preventDefault();
   submitSearch.click();
   searchInput.value = ''
  }
};