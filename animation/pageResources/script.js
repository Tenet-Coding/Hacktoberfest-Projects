	var v = document.createElement("video");
		v.style.opacity=0;
		v.src = "pageResources/cropped.mp4";
		v.src = "pageResources/cropped.ogv";
		v.src = "pageResources/cropped.webm";
		v.autoplay = true;
		v.muted = true;
		v.loop = true;
		document.body.appendChild(v);


		var i = document.createElement("IMG");
		i.setAttribute("class", "imgAnimation");
		i.src = "pageResources/untitlednew.png";
		i.id = "img";
		document.body.appendChild(i);

		var one = document.getElementById("one");
		var two = document.getElementById("two");
		var three = document.getElementById("three");
		var four = document.getElementById("four");
		var five = document.getElementById("five");

		var head1 = document.getElementById("head1");
		var head2 = document.getElementById("head2");
		var head22 = document.getElementById("head22");

		

		document.body.style.backgroundColor = "black";

		

		setTimeout(function(){
			v.style.opacity=0.9;
			v.style.animation = "5s anim ease";
		}, 2000);

		setTimeout(function(){ 
			document.body.removeChild(i); }, 3000);
