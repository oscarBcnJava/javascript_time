var hora12=false;
var hora,minutos,segundos=0;
var dim=false;
var horaMax=0;
//obtiene elemento de DOM
var getElem = function(element){
	return document.getElementById(element).innerHTML;	
}
//asigna valor a elemento en DOM
var setElem = function(element,value){	
	document.getElementById(element).innerHTML = value;	
}
/*
 * Controla si estamos en modo 12h o 24h y limita la cantidad de horas máximas y el cambio display AM PM y 24h
 *
 */
function controlAM_PM(){
	if (horaMax === 12 && hora > 12) {
		hora = hora - 12;
		dim = true;
	}
	if (horaMax === 24 && dim) {
		hora += 12;
		if (hora === 24) hora = 0;
		dim = false;
	}
	if (horaMax === 12 && !dim) setElem('tipoHora','AM');
	else if (horaMax === 12 && dim) setElem('tipoHora','PM');
	else if (horaMax === 24) setElem('tipoHora','24h');	
	
}

/*visualización*/
function display() {
	hora12 ? horaMax = 12 : horaMax = 24;
	hora = parseInt(getElem('hora'), 10);	
	minutos = parseInt(getElem('minutos'), 10);
	segundos = parseInt(getElem('segundos'), 10);
	controlAM_PM();
	/*ciclo*/
	segundos += 1;
	if (hora > 9) {
		hora = hora.toString();
	} else hora = "0" + hora.toString();
	setElem('hora',hora);
	if (segundos === 60) {
		segundos = 0;
		minutos++;
		if (minutos === 60) {
			minutos = 0;
			hora++;
			if (hora === 24) hora = 0;
			/*de 0 a 9 añadimos un cero para crear dos cifras en las horas*/
			if (hora < 10) {
				hora = "0" + hora;
			}
			setElem('hora',hora);
		}
		/*de 0 a 9 añadimos un cero para crear dos cifras en los minutos*/
		if (minutos < 10) {
			minutos = "0" + minutos;
		}
		setElem('minutos',minutos);
	}
	/*de 0 a 9 añadimos un cero para crear dos cifras en segundos*/
	if (segundos < 10) {
		segundos = "0" + segundos;
	}
	
        setElem('segundos',segundos);
}

/*ejecución de función de manera repetitiva, cada segundo */
document.onload = setInterval(function reloj() {display();}, 1000);

/*
hora,minutos y segundos a cero
*/
function reset(){
	hora12=false;
	var time = ['hora','minutos','segundos'];
	for each (var item in time){
		setElem(item,'00');
	}
	
}

/*
Ajuste manual hora y minutos
incHora-> incremento o decremento horas desde html
incMin-> incremento o decremento minutos desde html
*/
function ajuste(incHora,incMin){
	//ajuste hora
	hora = parseInt(getElem('hora'),10);
	hora = hora + incHora;
	if (horaMax===12 && hora>12) {			
		hora=1;
		dim=!dim;
	}
	if (horaMax===12 && hora<1) {
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
	minutos = parseInt(getElem('minutos'),10);
	minutos = minutos + incMin;
	if (minutos>59) minutos=0;
	if (minutos<0) minutos=59;
	if (minutos>9) {
		minutos = minutos.toString();
	}	
	else {
		minutos = "0" + minutos.toString();
	}
    setElem('minutos',minutos);			
}

/*
Ajuste hora pc local
*/
function ajusteLocal(){
	var time = new Date();
	var horaLocal = time.getHours();
	var minutosLocales = time.getMinutes();
	var segundosLocales = time.getSeconds();
	setElem('hora', (horaLocal<10)?"0"+horaLocal:horaLocal);
	setElem('minutos',(minutosLocales<10)?"0"+minutosLocales:minutosLocales);
	setElem('segundos',(segundosLocales<10)?"0"+segundosLocales:segundosLocales);	
	dim= false;
}

/*
Control hora AM/PM o 24h
*/
function tipoHora(){
	var tipoHora = getElem('12h');
	if (tipoHora==="12h") {
		hora12=true;
		setElem('12h','24h');
	}
	else if (tipoHora==="24h") {
		controlAM_PM();
		hora12=false;
		setElem('12h','12h');
		
	}
}

/*
Oculta reloj
*/
function oculta(){
	var visibility = getElem('oculta');
	if (visibility==="Oculta") {
		document.getElementById("panelReloj").style.visibility ="collapse";
		setElem('oculta','Muestra');
	} else if (visibility==="Muestra"){
		document.getElementById("panelReloj").style.visibility ="visible";
		setElem('oculta','Oculta');
	}
	
}
