var hora12=false;
		var hora,minutos,segundos=0;
		var dim=false;
		var horaMax=0;
		
	function display(){		
		hora12?horaMax=12:horaMax=24;		
		hora = parseInt(document.getElementById("hora").innerHTML,10);
		if (horaMax===12 && !dim) document.getElementById("tipoHora").innerHTML ="AM";
			else if (horaMax===12 && dim) document.getElementById("tipoHora").innerHTML ="PM";
			else if (horaMax===24) document.getElementById("tipoHora").innerHTML ="24h";
		minutos = parseInt(document.getElementById("minutos").innerHTML,10);
	    segundos = parseInt(document.getElementById("segundos").innerHTML,10); 			
		segundos += 1;
		if (horaMax===12 && hora>12) {			
			hora = hora-12;
			dim=true;			
		}
		if (horaMax===24 && dim){
			hora +=12;
			if (hora === 24) hora=0;
			dim=false;			
		}
		if (hora>9) {
					hora = hora.toString();
				}
				else hora = "0" + hora.toString();
				document.getElementById("hora").innerHTML = hora;
		if (segundos===60) {
			segundos=0;
			minutos++;
			if (minutos===60){
				minutos=0;
				hora++;
				if (hora===24) hora = 0;
				if (hora>9) {
					hora = hora.toString();
				}
				else hora = "0" + hora.toString();
				document.getElementById("hora").innerHTML = hora;
			}
		if (minutos>9) {
			minutos = minutos.toString();
		}	
		else minutos = "0" + minutos.toString();
	    document.getElementById("minutos").innerHTML = minutos;			
		}		
		if (segundos>9) {
			segundos = segundos.toString();
		}	
		else segundos = "0" + segundos.toString();
	    document.getElementById("segundos").innerHTML = segundos;	
		
	}
	function reloj(){
			display();
	} 
	
	/*
	hora,minutos y segundos a cero
	*/
	function reset(){
		hora12=false;
		document.getElementById("hora").innerHTML = "00";
		document.getElementById("minutos").innerHTML = "00";
		document.getElementById("segundos").innerHTML = "00";
	}
	
	/*
	Ajuste manual hora y minutos
	incHora-> incremento o decremento horas desde html
	incMin-> incremento o decremento minutos desde html
	*/
	function ajuste(incHora,incMin){
		//ajuste hora
		hora = parseInt(document.getElementById("hora").innerHTML,10);
		hora = hora + incHora;
		if (horaMax===12 && hora>12) {			
			hora=0;
			dim=!dim;
		}
		if (horaMax===12 && hora<0) {
			hora=12;
			dim=!dim;
		}
		if (horaMax===24 && hora>23) hora=0;
		if (horaMax===24 && hora<0) hora=23;
		if (hora>9) {
					hora = hora.toString();
				}
		else hora = "0" + hora.toString();
		document.getElementById("hora").innerHTML = hora;
	    //ajuste minutos
		minutos = parseInt(document.getElementById("minutos").innerHTML,10);
		minutos = minutos + incMin;
		if (minutos>59) minutos=0;
		if (minutos<0) minutos=59;
		if (minutos>9) {
			minutos = minutos.toString();
		}	
		else minutos = "0" + minutos.toString();
	    document.getElementById("minutos").innerHTML = minutos;			
	}
	
	/*
	Ajuste hora pc local
	*/
	function ajusteLocal(){
		var time = new Date();
		document.getElementById("hora").innerHTML = (time.getHours()<10)?"0"+time.getHours():time.getHours();
		document.getElementById("minutos").innerHTML = (time.getMinutes()<10)?"0"+time.getMinutes():time.getMinutes();
		document.getElementById("segundos").innerHTML = (time.getSeconds()<10)?"0"+time.getSeconds():time.getSeconds();
		dim= false;
	}
	
	/*
	Control hora AM/PM o 24h
	*/
	function tipoHora(){
		var tipoHora = document.getElementById("12h").innerHTML;
		if (tipoHora==="12h") {
			hora12=true;
			document.getElementById("12h").innerHTML ="24h";
		}
		else if (tipoHora==="24h") {
			hora12=false;
			document.getElementById("12h").innerHTML ="12h";
		}
	}
	
	/*
	Oculta reloj
	*/
	function oculta(){
		var visibility = document.getElementById("oculta").innerHTML;
		if (visibility==="Oculta") {
			document.getElementById("panelReloj").style.visibility ="collapse";
			document.getElementById("oculta").innerHTML = "Muestra";
		} else if (visibility==="Muestra"){
			document.getElementById("panelReloj").style.visibility ="visible";
			document.getElementById("oculta").innerHTML = "Oculta";
		}
		
	}
