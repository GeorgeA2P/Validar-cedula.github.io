const input = document.querySelector("#cedula");
const btnValidar = document.querySelector("#btnValidar");
const msg = document.querySelector(".msg");
const divMain = document.querySelector(".div-main");
let flag = false;
let field = document.querySelector("#field");

const elementP = (msg) =>{
    p = document.createElement("p");
    p.innerHTML = msg;
    p.style.display = "block";
    p.style.color = "red";
    p.style.fontSize = "13px";
    p.style.marginBottom = "5px";

    return p;
};

const verified = (msg, color)=>{

    const div = document.createElement("div");
    const div1 = document.createElement("div");
    const p = document.createElement("p");
    const btn = document.createElement("button");

    //style p
    p.innerHTML = msg;
    p.style.color = color; 
    p.style.fontSize = "2em"; 
    p.style.marginBottom = "2px"; 
    p.style.background = "transparent";

     //style btn
     btn.textContent = "Validar otra vez";
     btn.style.width = "200px";
     btn.style.background = "#e9dcf5";
     btn.style.marginLeft = "40px";
     btn.addEventListener("click", ()=>{
         div.style.display = "none";
         field.style.display = "block";
     })
    
    //style div
    div.style.background = "transparent"
    div.style.height = "100%";
    div.style.width = "40%";
    div.style.display = "flex";
    div.style.flexDirection = "column";
    div.style.justifyContent = "center";
    div.style.margin = "0 auto";

    // style div1
    div1.style.height = "100vh";
    div1.style.position = "absolute";
    div1.style.width = "100%";
    div1.style.background = "transparent"

    div.append(p);
    div.append(btn);

    div1.append(div);

    divMain.append(div1);
}

const validar = (e) =>{

    if(input.value == null || input.value.length < 11 || isNaN(input.value) && !flag ){
        msg.append(elementP("El campo no puede estar vacio, no puede ser menor de 11 caracteres y Tienen que ser caracteres numericos"));
        flag = true;
        e.preventDefault();
    }
    else if(isNaN(input.value)){
        e.preventDefault();
    }
    else{

        let idValue = [0,...input.value];
        let idValueParsed = sIntoInt(idValue);

        if(moduloDiez(idValueParsed)){
            verified("La cedula es valida", "green");
        }
        else{
            verified("La cedula no es valida", "red");
        } 
        
        e.preventDefault();
        field.style.display = "none";
        msg.removeChild(msg.firstChild);
        flag = false;
        
    }
}

const sIntoInt = (n)=>{
  
    for(let i = 0; i < n.length; i++){
        n[i] = parseInt(n[i]);       
    }
   
    return n;
}

const moduloDiez = (n)=>{

    let sum = 0;
    let mult = 0;
    let aux = 0;
    
   	for(let i = 1; i <= 10; i++){     
       if(i%2==0){
            mult = n[i] * 2;
            if(mult >= 10){
               aux = mult - 9;
                n[i] = aux;
            }
            else{
                n[i]=mult;
            }
        }
        sum+=n[i];     
        
    }

    aux = sum * 9 % 10;
    if(aux==n.at(-1)){
        return true
    }
    else{
        return false;
    }
}

btnValidar.addEventListener("click", validar);
