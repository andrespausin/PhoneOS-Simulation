let fecha = new Date();
let hour = fecha.getHours();
let minute = fecha.getMinutes();
const memoria = 8000;
const rom = 64000;

// Función que formatea la hora
const setTime = (hour, minute) => {
    let time = hour + ':' + minute;
    if(minute >= 0 & minute <= 9){
        if(hour >= 0 & hour <= 9){
            time = '0' + hour + ':' + '0' + minute;
        }else{
            time = hour + ':0' + minute;
        } 
    }
    if(hour >= 0 & hour <= 9){
        if(minute >= 0 & minute <= 9){
            time = '0' + hour + ':' + '0' + minute;
        }else{
            time = '0' + hour + ':' + minute;
        }
    }
    return time;
}

document.getElementById("Hora").innerHTML = setTime(hour, minute);

//SetInterval que actualiza la hora cada 60 segundos
setInterval(() => {
    let newDate = new Date();
    let hour = newDate.getHours();
    let minute = newDate.getMinutes();
    document.getElementById('Hora').innerHTML = setTime(hour, minute);
}, 60000);

//SetInterval que disminuye la batería del teléfono cada 6 segundos
const minusBattery = setInterval(()=>{
    const telefono = document.getElementById('telefono');
    const element = document.getElementById('battery');
    const hour = document.getElementById('Hora');
    const info = document.getElementById('info');
    const apps = document.getElementById('apps');
    let battery = element.textContent.split('%')[0];
    battery -= 1;
    if(battery == 20){
        window.alert('La batería se está agotando, deberías cargar el celular');
    }

    if(battery == 10){
        window.alert('La batería está muy baja, recuerda cargar el celular');
    }
    if(battery == 0){
        clearInterval(minusBattery);
        window.alert('La batería se ha agotado, debería cargarlo');
        telefono.setAttribute('style', 'background-color: #000;');
        info.setAttribute("style", "opacity: 0%;");
        apps.setAttribute("style", "opacity: 0%;");
        element.setAttribute("style", "color: #000;");
        hour.setAttribute("style", "color: #000;");
    }
    element.innerHTML = battery + '%';    

}, 6000);

//Método que permite carga el teléfono
const charging = () => {
    let element = document.getElementById("cargar");
    element.addEventListener("click", (e) => {
        if(element.checked){

            const telefono = document.getElementById("telefono");
            const battery = document.getElementById("battery");
            const hour = document.getElementById("Hora");
            const info = document.getElementById("info");
            const apps = document.getElementById("apps");
            let actual = parseInt(battery.textContent.split("%")[0]);
            
            setInterval(() => {      
                console.log(actual + 1);
                actual += 1;
        
                if (actual == 1) {

                    telefono.setAttribute("style", "background-color: antiquewhite;");
                    info.setAttribute("style", "opacity: 100%;");
                    apps.setAttribute("style", "opacity: 100%;");
                    element.setAttribute("style", "color: #fff;");
                    hour.setAttribute("style", "color: #fff;");
                    battery.setAttribute("style", "color: #fff;");
                }

                if(actual >= 100){
                    clearInterval(this);
                    actual -= 1;
                }
        
                battery.innerHTML = actual + "%";
            }, 1000);
        // <ust fix this bug, it doesn't get inside the conditional
        }else {
            minusBattery;
        }      
    });
  };
  
// Backend

const aplicaciones = [
    {
        'id':1,
        'name':'Google Chrome',
        'memory':1025, //Los números se representan en MB
        'rom': 1580,//Memoria ROM o de ALmacenamiento en MB
        
    },
    {
        'id':2,
        'name':'Gmail',
        'memory': 580,
        'rom': 897,
    },
    {
        'id': 3,
        'name': 'Instagram',
        'memory': 1890,
        'rom': 3456,
    },
    {
        'id': 4,
        'name': 'Spotify',
        'memory': 1540,
        'rom': 2540,
    },
    {
        'id': 5,
        'name': 'Netflix',
        'memory': 3450,
        'rom': 4098,
    },
    {
        'id': 6,
        'name': 'Settings',
        'memory': 350,
        'rom': 570,
    },
    {
        'id': 7,
        'name': 'TikTok',
        'memory': 2000,
        'rom': 3987,
    },
    {
        'id': 8,
        'name': 'WhatsApp',
        'memory': 1350,
        'rom': 10098,
    },
    {
        'id': 9,
        'name': 'Youtube',
        'memory': 2780,
        'rom': 2590,
    },
]

let appsActivas = [];
let appsEsper = [];

const insertProcess = (aplicaciones) => {
    const tbody = document.getElementById("body");
    for(let i = 0; i < aplicaciones.length; i++){
      const tr = document.createElement("tr");
      const id = document.createElement("td");
      const name = document.createElement("td");
      const ramConsum = document.createElement("td");
      const romConsum = document.createElement("td");
  
      id.innerHTML = aplicaciones[i].id;
      name.innerHTML = aplicaciones[i].name;
      ramConsum.innerHTML = aplicaciones[i].memory;
      romConsum.innerHTML = aplicaciones[i].rom;
  
      tr.appendChild(id);
      tr.appendChild(name);
      tr.appendChild(ramConsum);
      tr.appendChild(romConsum);
  
      tbody.appendChild(tr);    
    }
}

const clickApp = () => {
    let id;
    let element = document.getElementsByClassName('aplicacion');
    for(let i = 0; i < element.length; i++){
        element[i].addEventListener('click', () => {
            id = element[i].id;
            const app = aplicaciones[i];
            if(totalRamConsumed(appsActivas) + app.memory < memoria && !verficarApp(app, appsActivas)){
                appsActivas.push(app);
                insertDinamic(app);
                llenarProgreso();
            }else{
                if(totalRamConsumed(appsActivas) + app.memory < memoria){
                    alert('La app ya está activa');
                }else{
                    alert('No hay espacio suficiente en la Memoria RAM');
                }
                
            }
        })
    }
    
}

const insertDinamic = (app) => {
    const body = document.getElementById('cuerpo');
    const tr = document.createElement('tr');
    let name = document.createElement('td');
    let status = document.createElement('td');

    name.innerHTML = app.name;
    status.innerHTML = 'Activo';

    tr.appendChild(name);
    tr.appendChild(status);
    body.appendChild(tr); 
}

const totalRamConsumed = (appsActivas) => {
    let result = 0;
    if(appsActivas.length != 0){
        for(let i = 0; i < appsActivas.length; i++){
            result += appsActivas[i].memory;    
        }
                
    }
    return result;
}

const verficarApp = (app, appsActivas) => {
    let result = false;
    for(let i = 0; i < appsActivas.length; i++){
        if(app.name === appsActivas[i].name){
            result = true;
        }
    }
    return result;
}


const reset = () => {
    const element =  document.getElementById('reset');
    const cuerpo = document.getElementById('cuerpo');
    const hijos = cuerpo.children;
    element.addEventListener('click', () => {
        while(cuerpo.firstChild){
            cuerpo.removeChild(cuerpo.firstChild)
        }
        vaciarProgreso();
        appsActivas = [];
    })
}

const llenarProgreso = () => {
    let actual = (totalRamConsumed(appsActivas) / memoria) * 100;
    const porc = document.getElementById('percentRAM');
    porc.setAttribute('style', 'width:' + actual + '%;');
}

const vaciarProgreso = () => {
    const porc = document.getElementById('percentRAM');
    porc.setAttribute('style', 'width: 0%;');
}

const llenarRom = () => {
    const mem = document.getElementById('percentROM');
    let result = 0;
    for(let i = 0; i < aplicaciones.length; i++){
        result += aplicaciones[i].rom;
    }
    const actual = (result / rom) * 100;
    mem.setAttribute('style', 'width:' + actual + '%');
}

  //Llamado de funciones
charging();

insertProcess(aplicaciones);

clickApp();

reset();

llenarRom();
