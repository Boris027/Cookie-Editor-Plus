//importa lo que se añade en el input a las cookies
document.getElementById('import').addEventListener('click',async function(){
    let content=document.getElementById('text10').value;
    console.log(content)
    let object=JSON.parse(content)
    
    let tab=await getCurrentTab()
    
    
    object.map(async c=>{
        console.log(c)
        await chrome.cookies.set({
            url: tab.url,
            domain: c.domain ?? null,
            expirationDate: c.expirationDate ?? null, 
            //hostOnly: c.hostonly ?? null,
            httpOnly: c.httpOnly ?? null,
            name: c.name ?? null,
            path: c.path ?? null,
            sameSite: c.sameSite ?? null,
            secure: c.secure ?? null,
            //session: c.session ?? null,
            storeId: c.storeId ?? null,
            value: c.value ?? null
        }, function(cookie) {
            console.log('Cookie establecida:', cookie);
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