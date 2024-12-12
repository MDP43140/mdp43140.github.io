"use strict";
window.addEventListener("load",_ => {
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
	window.retheme=()=>{
		document.body.classList.toggle("light");
		if (document.body.className.indexOf("light") > -1){
			rethemeBtn.innerText = "🌘️";
		} else {
			rethemeBtn.innerText = "☀️";
		}
	}
	window.addEventListener("scroll",()=>{
		let currScrlPos = window.pageYOffset;
		if (prevScrlPos > currScrlPos){navbar.style.top = "0%";navbar_unlock = false}
		else {navbar.style.top = "-100%";navbar_unlock = true}
		prevScrlPos = currScrlPos;
	});
	window.addEventListener("mousemove",e=>{
		if(e.clientY < 40){navbar.style.top = "0%"}
		else if(navbar_unlock){navbar.style.top = "-100%"}
	});
	//searchInput.onkeyup=e=>{if(e.which == 13){e.preventDefault();submitSearch.click();searchInput.value = ''}};

	// Simple fast memoize
	window.memoize=(f,h)=>{const c={__proto__:null};h=h??JSON.stringify;return(...a)=>{const k=h(a);return c[k]||(c[k]=f(...a))}}

	// Text scrambler effect
	class TextScramble{constructor(e){this.el=e,this.chars="!<>\\/[]{}-_—=+*^?#",this.update=this.update.bind(this),this.isCompleteNewText=!1,memoize&&(this.oldNewTextCacheKey="",this.randomText=memoize(this.randomText.bind(this),(e=>e)))}setText(e){const t=Math.random,s=this.el.innerText,h=Math.max(s.length,e.length),i=new Promise((e=>this.resolve=e));this.oldNewTextCacheKey=s+","+e,this.queue=[];for(let i=0;i<h;i++){const h=~~(10*t());this.queue.push({from:s[i]||"",to:e[i]||"",start:h,end:h+~~(10*t())})}return clearTimeout(this.frameRequest),this.frame=0,this.isCompleteNewText=!1,this.update(),i}update(){this.el.innerHTML=this.randomText(this.oldNewTextCacheKey+this.frame),this.isCompleteNewText?(this.isCompleteNewText=!1,this.resolve()):(this.frameRequest=setTimeout((()=>requestAnimationFrame(this.update)),50),this.frame++)}randomText(){let e="",t=0;const s=this.queue.length,h=Math.random;for(let i=0;i<s;i++){let{from:s,to:a,start:r,end:o,char:m}=this.queue[i];this.frame>=o?(t++,e+=a):this.frame>=r?((!m||h()<.3)&&(this.queue[i].char=m=this.chars[~~(Math.random()*this.chars.length)]),e+=`<span style="opacity: 0.4">${m}</span>`):e+=s}return t===s&&(this.isCompleteNewText=!0),e}}

	// Header text scramble
	const header__title = document.body.querySelector("header > .header__title");
	const header__desc  = document.body.querySelector("header > .header__desc");
	const ts__headerTitle = new TextScramble(header__title);
	const ts__headerDesc  = new TextScramble(header__desc);
	header__title.innerText = "";
	header__desc.innerText = "";
	document.head.querySelector("title").textContent = "MDP website"
	ts__headerTitle.setText("MDP website").then(() => {
		setTimeout(()=>{
			ts__headerTitle.setText("MDP43140's website");
			document.head.querySelector("title").textContent = "MDP43140's website"
		},500)
		ts__headerDesc.setText("Hey there!").then(() => {
			setTimeout(()=>{
				ts__headerDesc.setText("Welcome to my website!",header__desc)
			},500)
		});
	});

	// Ripple Effect
	(()=>{"use strict";for(let e of document.querySelectorAll("button, nav#bar > a")){let t,o,n=0,i=e,r=e=>{if(n>1||t)return;n++,t=setTimeout((()=>t=null),50),o=i.getBoundingClientRect();let r={el:document.createElement("div")},l=e.pageX?e.pageX-o.left:o.width/2,a=e.pageY?e.pageY-o.top:o.height/2;r.el.style=`pointer-events:none;top:${a}px;left:${l}px;position:absolute;opacity:.4;background:#888;border-radius:50%;width:5px;height:5px`,r.tmp0=`scale(${Math.max(i.offsetWidth,i.offsetHeight)/2})`,r.el.animate([{transform:r.tmp0}],{duration:400,easing:"ease-out"}).onfinish=e=>{r.el.style.transform=r.tmp0,r.dA=1},i.append(r.el),r.removeEl=e=>{clearTimeout(r.removeElTimeout),r.dA?(window.removeEventListener("pointerup",r.removeEl),i.removeEventListener("keyup",r.removeEl),r.el.animate([{opacity:0}],{duration:200,easing:"ease-out"}).onfinish=e=>{r.el.remove(),r=null,n--}):r.removeElTimeout=setTimeout((e=>{r.removeEl()}))},window.addEventListener("pointerup",r.removeEl),i.addEventListener("keyup",r.removeEl)};e.style.position="relative",e.style.overflow="hidden",e.addEventListener("pointerdown",r),e.addEventListener("keydown",r)}})();

	// (oversimplified) Edge lighting effect, by Hyperplexed
	const edgeLightingEls = document.querySelectorAll("body > nav#bar > a")
	document.querySelector("body > nav#bar").onmousemove = e => {
		for (const el of edgeLightingEls){
			const rect = el.getBoundingClientRect();
			el.style.setProperty("--cursor-x",`${e.clientX - rect.left}px`);
			el.style.setProperty("--cursor-y",`${e.clientY - rect.top }px`);
		};
	}

	// example: https://epsi-rns.github.io /desktop/2018/05/04/openbox-config.html
	// gets triggered every time the specific element goes visible/offscreen
	// TODO: flashing/glitching animation?
	const effects = ['slideup']; // for now, only a simple slideup gets used
	const observer = new IntersectionObserver(ii => ii.forEach(i => {
		const el = i.target;
		let animate = el.dataset.animateonscroll;
		if (effects.includes(animate)){
			animate = 'animate__' + animate;
			if (i.isIntersecting)
				el.classList.add(animate);
			else
				el.classList.remove(animate);
		}
	}));
	document.body.querySelectorAll("[data-animateonscroll]").forEach(iii => observer.observe(iii));

});