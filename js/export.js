//copia el contenido de las cookies que hay en la pagina web al clipboard
document.getElementById('export').addEventListener('click',async function(){
    
    let content=document.getElementById('text10').value;
    
    navigator.clipboard.writeText(content)

})

//pone en el textcontainer la cookie en formato JSON
addEventListener('DOMContentLoaded', async function(){
    let tab=await getCurrentTab()
    let cookies=await getcookies(tab.url)
    let finalcontent=tojson(cookies)
    if(finalcontent==='[]'){

    
        finalcontent='There are no cookies here'
    }
    document.getElementById('text10').value=finalcontent;
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

