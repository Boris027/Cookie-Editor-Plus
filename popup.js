
//esta atento a cuando se le de click al boton de eliminar las cookies
document.getElementById('clear').addEventListener('click',async function(){

    let tab=await getCurrentTab()

    let cookies=await getcookies(tab.url)
    console.log(cookies)
    
    //elimina las cookies
    cookies.map(c=>{

        chrome.cookies.remove({url:tab.url, name:c.name}, function (details) {
            console.log(details)
        });
    
    })

    
})

//pone el clic activado o desactivado nada mas abrir la extension
addEventListener('DOMContentLoaded',async function(){
    //localStorage.setItem('ButtonvalueAdvanced','true')
    let item=localStorage.getItem('ButtonvalueAdvanced')
    
    if(item===null){
        //button.checked=true;
        this.localStorage.setItem('ButtonvalueAdvanced',false)
    }

    item=localStorage.getItem('ButtonvalueAdvanced')
    
    if(item==='true'){
        let button=this.document.getElementById('switchbutton')
        button.checked=true;
    }

    
})

//controla el estado del localstorage respecto a si esta activado o no las funciones avanzadas
document.getElementById('switchbutton').addEventListener('click',function(){
    let item=localStorage.getItem('ButtonvalueAdvanced')
    let value=''
    console.log(item)

      if(item==='false'){
          value='true';
      }else{
          value='false';
      }


      localStorage.setItem('ButtonvalueAdvanced',value)
  })



//consigue la tab en la que te encuentras actualmente
async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

//consigue las cookie si le pasas una url
async function getcookies(taburl) {
    let array = [];

    // Envuelve la llamada a chrome.cookies.getAll en una Promesa
    await new Promise((resolve, reject) => {
        chrome.cookies.getAll({ url: taburl }, function (cookies) {
            for (let cookie of cookies) {
                array.push(cookie);
            }
            resolve();
        });
    });

    return array;
}

//convierte a json
function tojson(object){

    return (JSON.stringify(object))
}


