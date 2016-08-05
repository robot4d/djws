var RightClick = {
	init: function () {
		this.FlashObjectID = "customRightClick";
		this.FlashContainerID = "flashcontent";
		this.Cache = this.FlashObjectID;
		if(window.addEventListener){
			 window.addEventListener("mousedown", this.onGeckoMouseDown(), true);
			 window.addEventListener("mouseup", this.onGeckoMouseUp(), true);
			 //window.addEventListener("mousemove", this.onGeckoMouseMove(), true);
		} else {
			document.oncontextmenu = function(){ if(window.event.srcElement.id == RightClick.FlashObjectID) { return false; } else { RightClick.Cache = "nan"; }}
			document.getElementById(this.FlashContainerID).onmousedown = RightClick.onIEMouseDown;
			document.getElementById(this.FlashContainerID).onmouseup = RightClick.onIEMouseUp;
			//document.getElementById(this.FlashContainerID).onmousemove = RightClick.onIEMouseMove;
		}
	},
	UnInit: function () { 
		if(window.RemoveEventListener){
			window.addEventListener("mousedown", null, true);
			window.RemoveEventListener("mousedown",this.onGeckoMouseDown(),true);
			window.addEventListener("mouseup", null, true);
			window.RemoveEventListener("mouseup",this.onGeckoMouseUp(),true);
			window.addEventListener("mousemove", null, true);
			window.RemoveEventListener("mousemove",this.onGeckoMouseMove(),true);
		} else {
			document.oncontextmenu = "";
			document.getElementById(this.FlashContainerID).onmousedown = "";
			document.getElementById(this.FlashContainerID).onmouseup = "";
			document.getElementById(this.FlashContainerID).onmousemove = "";
		}
	},
	killEvents: function(eventObject) {
		if(eventObject) {
			if (eventObject.stopPropagation) eventObject.stopPropagation();
			if (eventObject.preventDefault) eventObject.preventDefault();
			if (eventObject.preventCapture) eventObject.preventCapture();
	   		if (eventObject.preventBubble) eventObject.preventBubble();
		}
	},
	onGeckoMouseDown: function(ev) {
	  	return function(ev) {
	    if (ev.button != 0) {
			RightClick.killEvents(ev);
			if(ev.target.id == RightClick.FlashObjectID && RightClick.Cache == RightClick.FlashObjectID) {
	    		RightClick.call();
			}
			RightClick.Cache = ev.target.id;
		}
	  }
	},
	onGeckoMouseUp: function(ev) {
	  	return function(ev) {
	    if (ev.button != 0) {
			RightClick.killEvents(ev);
			if(ev.target.id == RightClick.FlashObjectID && RightClick.Cache == RightClick.FlashObjectID) {
	    		RightClick.callup();
			}
			
			RightClick.Cache = ev.target.id;
		}
	  }
	},
	/*onGeckoMouseMove: function(ev) {
	  	return function(ev) {
	    if (ev.button != 0) {
			RightClick.killEvents(ev);
			if(ev.target.id == RightClick.FlashObjectID && RightClick.Cache == RightClick.FlashObjectID) {
	    		RightClick.callmove();
			}
			RightClick.Cache = ev.target.id;
		}
	  }
	},*/
	onIEMouseDown: function() {
	  	if (event.button > 1) {
			if(window.event.srcElement.id == RightClick.FlashObjectID && RightClick.Cache == RightClick.FlashObjectID) {
				RightClick.call(); 
			}
			document.getElementById(RightClick.FlashContainerID).setCapture();
			if(window.event.srcElement.id){
				RightClick.Cache = window.event.srcElement.id;
			}
		}
	},
	onIEMouseUp: function() {
	
	  	if (event.button > 1) {
			if(window.event.srcElement.id == RightClick.FlashObjectID && RightClick.Cache == RightClick.FlashObjectID) {
				RightClick.callup(); 
			}
			document.getElementById(RightClick.FlashContainerID).releaseCapture();
		}
	},
	/*onIEMouseMove: function() {
	
	  	if (event.button > 1) {
			if(window.event.srcElement.id == RightClick.FlashObjectID && RightClick.Cache == RightClick.FlashObjectID) {
				RightClick.callmove(); 
			}
		}
	},	*/
	call: function() {
		document.getElementById(this.FlashObjectID).rightClickDown();
	},
	callmove: function() {
		document.getElementById(this.FlashObjectID).rightClickMove();
	},
	callup: function() {
		document.getElementById(this.FlashObjectID).rightClickUp();
	}
}