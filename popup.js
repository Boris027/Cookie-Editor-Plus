
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


