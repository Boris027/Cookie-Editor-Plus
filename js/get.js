let cookies=''
let number=0;
//checks if the extension is in the advanced mode
let option=localStorage.getItem('ButtonvalueAdvanced')

document.addEventListener('DOMContentLoaded',async function(){
    let tab=await getCurrentTab()
    console.log(tab)

    cookies=await getcookies(tab.url)
    console.log(cookies)

    order(cookies)


   //recorre el array y genera visualmente las cookies en el html

   if(cookies.length===0){
    const container=document.getElementById('container')
    const div=document.createElement('div')
    container.style.display='flex'
    container.style.justifyContent='center'
    container.style.alignItems='center'
    const interior2=document.createElement('p')
    interior2.classList.add('nocookies')
    interior2.textContent=`Cookie Editor+ can't display cookies for this page.`

    div.appendChild(interior2)
    container.appendChild(div)
   }

   cookies.map(c=>{

    const container=document.getElementById('container')
    const div=document.createElement('div')
    div.classList.add('accordion-item')
    const h2=document.createElement('h2')
    h2.classList.add('accordion-header');
    const button=document.createElement('button')
    button.classList.add('accordion-button')
    button.classList.add('collapsed')
    button.textContent = c.name;  // Añadir texto al botón
    button.setAttribute('type','button')
    button.setAttribute('data-bs-toggle','collapse')
    button.setAttribute('data-bs-target','#collapse'+number)
    button.setAttribute('aria-expanded','false')
    button.setAttribute('aria-controls','collapse'+number)
    const divcontenido=document.createElement('div')
    divcontenido.classList.add('accordion-collapse')
    divcontenido.classList.add('collapse')
    //divcontenido.classList.add('show')
    divcontenido.setAttribute('aria-labelledby','heading'+number)
    divcontenido.setAttribute('data-bs-parent','#container')
    divcontenido.id='collapse'+number
    const divcontenidofinal=document.createElement('div')
    divcontenidofinal.classList.add('accordion-body')
    const interior=document.createElement('p')
    //interior.textContent=c.value
    interior.textContent='Name'
    const input=document.createElement('input')
    input.id='input1'+number
    input.value=c.name
    const interior2=document.createElement('p')
    interior2.textContent='Value'
    const input2=document.createElement('textarea')
    input2.id='input2'+number
    input2.value=c.value
    const buttondiv=document.createElement('div')
    buttondiv.classList.add('buttons')
    const buttonsave=document.createElement('img')
    buttonsave.classList.add('save')
    buttonsave.title='Save'
    buttonsave.id=+''+number
    buttonsave.src='../img/save.png'
    const buttondelete=document.createElement('img')
    buttondelete.classList.add('delete')
    buttondelete.title='Delete'
    buttondelete.id=''+number
    buttondelete.src='../img/delete.png'


   

    h2.appendChild(button)
    div.appendChild(h2)
    divcontenidofinal.appendChild(interior)
    divcontenidofinal.appendChild(input)
    divcontenidofinal.appendChild(interior2)
    divcontenidofinal.appendChild(input2)
    //divcontenidofinal.appendChild(buttonsave)
    //divcontenidofinal.appendChild(buttondelete)

    if(option==='true'){
        const interior3=document.createElement('p')
        interior3.textContent='Domain'
        const input3=document.createElement('input')
        input3.value=c.domain
        divcontenidofinal.appendChild(interior3)
        divcontenidofinal.appendChild(input3)

        const interior4=document.createElement('p')
        interior4.textContent='Path'
        const input4=document.createElement('input')
        input4.value=c.path
        divcontenidofinal.appendChild(interior4)
        divcontenidofinal.appendChild(input4)


        const interior5=document.createElement('p')
        interior5.textContent='Expiration Date'
        const input5=document.createElement('input')
        input5.value=new Date(c.expirationDate)
        divcontenidofinal.appendChild(interior5)
        divcontenidofinal.appendChild(input5)

        const interior6=document.createElement('p')
        interior6.textContent='Same Site'
        const input6=document.createElement('input')
        input6.value=c.sameSite
        divcontenidofinal.appendChild(interior6)
        divcontenidofinal.appendChild(input6)
        divcontenidofinal.appendChild(interior6)
        divcontenidofinal.appendChild(input6)
    }


    buttondiv.appendChild(buttonsave)
    buttondiv.appendChild(buttondelete)
    divcontenidofinal.appendChild(buttondiv)
    divcontenido.appendChild(divcontenidofinal)
    div.appendChild(divcontenido)


    

    container.appendChild(div)
    number+=1;
   })

   

   



})


//controla cuando alguien le da a guardar una cookie o eliminarla
document.getElementById('container').addEventListener('click',async function(){

    //boton de guardado de las cookies
    if (event.target && event.target.classList.contains('save')) {

        // Encuentra el id del boton al que se le da click
        let number1 = event.target.id;

        const input1=document.getElementById('input1'+number1).value
        const input2=document.getElementById('input2'+number1).value

        //filtra por si la cookie ya existia o no
        let cookie=cookies[parseInt(number1)]
        if(cookie!==undefined){

            await clearcookie(cookie.name)
            cookie.name=input1
            cookie.value=input2
            await setcookies(cookie)
            window.location.reload()
        }else{

            let tab=await getCurrentTab()
            let url=new URL(tab.url)
            const domain=url.hostname
            cookie={
                domain: domain,
                hostOnly: true,
                httpOnly: false,
                name: input1,
                path: "/",
                sameSite: "unspecified",
                secure: false,
                session: true,
                storeId: "0",
                value: input2
            }

            
            console.log(cookie)
            await setcookies(cookie)
            window.location.reload()
        }
        



    }

    //boton de eliminar la cookie
    else if(event.target && event.target.classList.contains('delete')){
        let number1 = event.target.id;

        let cookie=cookies[parseInt(number1)]

        if(cookie!==undefined){
            await clearcookie(cookie.name)
        }

        
        window.location.reload()
    }
    
    
})



//controla cuando se da al boton de añadir una cookie
document.getElementById('plus').addEventListener('click',function(){
    const container=document.getElementById('container')
    const div=document.createElement('div')
    div.classList.add('accordion-item')
    const h2=document.createElement('h2')
    h2.classList.add('accordion-header');
    const button=document.createElement('button')
    button.classList.add('accordion-button')
    button.classList.add('collapsed')
    button.textContent = '';  // Añadir texto al botón
    button.setAttribute('type','button')
    button.setAttribute('data-bs-toggle','collapse')
    button.setAttribute('data-bs-target','#collapse'+number)
    button.setAttribute('aria-expanded','true')
    button.setAttribute('aria-controls','collapse'+number)
    const divcontenido=document.createElement('div')
    divcontenido.classList.add('accordion-collapse')
    divcontenido.classList.add('collapse')
    divcontenido.classList.add('show')
    //divcontenido.classList.add('show')
    divcontenido.setAttribute('aria-labelledby','heading'+number)
    divcontenido.setAttribute('data-bs-parent','#container')
    divcontenido.id='collapse'+number
    const divcontenidofinal=document.createElement('div')
    divcontenidofinal.classList.add('accordion-body')
    const interior=document.createElement('p')
    //interior.textContent=c.value
    interior.textContent='Name'
    const input=document.createElement('input')
    input.id='input1'+number
    input.value=''
    const interior2=document.createElement('p')
    interior2.textContent='Value'
    const input2=document.createElement('textarea')
    input2.id='input2'+number
    input2.value=''
    const buttondiv=document.createElement('div')
    buttondiv.classList.add('buttons')
    const buttonsave=document.createElement('img')
    buttonsave.classList.add('save')
    buttonsave.title='Save'
    buttonsave.id=+''+number
    buttonsave.src='../img/save.png'
    const buttondelete=document.createElement('img')
    buttondelete.classList.add('delete')
    buttondelete.title='Delete'
    buttondelete.id=''+number
    buttondelete.src='../img/delete.png'

    h2.appendChild(button)
    div.appendChild(h2)
    divcontenidofinal.appendChild(interior)
    divcontenidofinal.appendChild(input)
    divcontenidofinal.appendChild(interior2)
    divcontenidofinal.appendChild(input2)
    //divcontenidofinal.appendChild(buttonsave)
    //divcontenidofinal.appendChild(buttondelete)
    buttondiv.appendChild(buttonsave)
    buttondiv.appendChild(buttondelete)
    divcontenidofinal.appendChild(buttondiv)
    divcontenido.appendChild(divcontenidofinal)
    div.appendChild(divcontenido)

    container.appendChild(div)
    number+=1;
   
    //baja abajo del todo de la página
    window.scrollTo(0, document.body.scrollHeight);

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


//pone la cookie
async function setcookies(c){
    console.log('cookie')
    console.log(c)
    
    let tab=await getCurrentTab()
    
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
    
}


//elimina la cookie
async function clearcookie(c){

    let tab=await getCurrentTab()

    let cookies=await getcookies(tab.url)
    console.log(cookies)
    console.log(c)
    //elimina las cookies
    chrome.cookies.remove({url:tab.url, name:c}, function (details) {
        console.log(details)
    })
    
    

    
}
    

//ordenar array
function order(c){

    c.sort((a,b)=>{
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    })

    console.log(c)
}