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

    let url=new URL(tab.url)

   
    if(cookies.length===0){
    const container=document.getElementById('container')
    const div=document.createElement('div')
    container.style.display='flex'
    container.style.justifyContent='center'
    container.style.alignItems='center'
    const interior2=document.createElement('p')
    interior2.classList.add('nocookies')
    interior2.id='nocookies'
    //interior2.textContent=`Cookie Editor+ can't display cookies for this page.`
    interior2.textContent=`There aren´t any cookies`
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
        input3.id="domain_"+number
        input3.value=c.domain
        divcontenidofinal.appendChild(interior3)
        divcontenidofinal.appendChild(input3)

        const interior4=document.createElement('p')
        interior4.textContent='Path'
        const input4=document.createElement('input')
        input4.id="Path_"+number
        input4.value=c.path
        divcontenidofinal.appendChild(interior4)
        divcontenidofinal.appendChild(input4)


        const interior5=document.createElement('p')
        interior5.textContent='Expiration Date'
        const input5=document.createElement('input')
        input5.id="date_"+number
        input5.value=new Date(c.expirationDate*1000)
        divcontenidofinal.appendChild(interior5)
        divcontenidofinal.appendChild(input5)

        const interior6=document.createElement('p')
        interior6.textContent='Same Site'
        const input6=document.createElement('select')
        input6.id="samesite_"+number
        input6.classList.add('form-select')

        const option0=document.createElement('option')
        option0.textContent='Unspecified'
        input6.appendChild(option0)
        const option1=document.createElement('option')
        option1.textContent='None'
        input6.appendChild(option1)
        const option2=document.createElement('option')
        option2.textContent='Lax'
        input6.appendChild(option2)
        const option3=document.createElement('option')
        option3.textContent='Strict'
        input6.appendChild(option3)

        if(c.sameSite==="no_restriction"){
            option1.selected=true;
        }else if(c.sameSite==="lax"){
            option2.selected=true;
        }else if(c.sameSite==="unspecified"){
            option0.selected=true;
        }else if(c.sameSite==="strict"){
            option3.selected=true;
        }

        divcontenidofinal.appendChild(interior6)
        divcontenidofinal.appendChild(input6)
        divcontenidofinal.appendChild(interior6)
        divcontenidofinal.appendChild(input6)


        const divcheck1=document.createElement('div')
        divcheck1.classList.add('checkboxitem')
        divcheck1.classList.add='form-check'
        const inputcheck1=document.createElement('input')
        inputcheck1.id="inputcheck1_"+number
        inputcheck1.classList.add('form-check-input')
        inputcheck1.type='checkbox'
        const label=document.createElement('label')
        label.classList.add('form-check-label')
        label.textContent='Host Only'

        divcheck1.appendChild(inputcheck1)
        divcheck1.appendChild(label)
        divcontenidofinal.appendChild(divcheck1)


        const divcheck2=document.createElement('div')
        divcheck2.classList.add('checkboxitem')
        divcheck2.classList.add='form-check'
        const inputcheck2=document.createElement('input')
        inputcheck2.id="inputcheck2_"+number
        inputcheck2.classList.add('form-check-input')
        inputcheck2.type='checkbox'
        const label2=document.createElement('label')
        label2.classList.add('form-check-label')
        label2.textContent='Session'

        divcheck2.appendChild(inputcheck2)
        divcheck2.appendChild(label2)
        divcontenidofinal.appendChild(divcheck2)


        const divcheck3=document.createElement('div')
        divcheck3.classList.add('checkboxitem')
        divcheck3.classList.add='form-check'
        const inputcheck3=document.createElement('input')
        inputcheck3.id="inputcheck3_"+number
        inputcheck3.classList.add('form-check-input')
        inputcheck3.type='checkbox'
        const label3=document.createElement('label')
        label3.classList.add('form-check-label')
        label3.textContent='Secure'

        divcheck3.appendChild(inputcheck3)
        divcheck3.appendChild(label3)
        divcontenidofinal.appendChild(divcheck3)


        const divcheck4=document.createElement('div')
        divcheck4.classList.add('checkboxitem')
        divcheck4.classList.add='form-check'
        const inputcheck4=document.createElement('input')
        inputcheck4.id="inputcheck4_"+number
        inputcheck4.classList.add('form-check-input')
        inputcheck4.type='checkbox'
        const label4=document.createElement('label')
        label4.classList.add('form-check-label')
        label4.textContent='Http Only'

        divcheck4.appendChild(inputcheck4)
        divcheck4.appendChild(label4)
        divcontenidofinal.appendChild(divcheck4)

        if(c.secure===true){
            inputcheck3.checked=true;
        }

        if(c.session===true){
            inputcheck2.checked=true;
            input5.disabled=true;
            input5.value='No expiration'
        }

        if(c.hostOnly===true){
            inputcheck1.checked=true;
            input3.disabled=true;
        }

        if(c.httpOnly===true){
            inputcheck4.checked=true;
        }

        

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
        
        //utilizara una opción u otra, si esta activado o no el modo avanzado
        let cookie=cookies[parseInt(number1)]
        if(option!=="true"){

        
            //filtra por si la cookie ya existia o no
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
                        //storeId: "0",
                        value: input2
                    }

                    
                    console.log(cookie)
                    try {
                        await setcookies(cookie)
                    } catch (error) {
                        console.log('error saving the cookies')
                    }
                    window.location.reload()
            }
        
        }else{
            try {
                console.log('advanced mode')
                const domain=document.getElementById('domain_'+number1).value
                const path=document.getElementById('Path_'+number1).value
                const date=new Date(document.getElementById('date_'+number1).value)
                let datefinal=date.getTime()

                const samesite=(document.getElementById('samesite_'+number1).value).toLowerCase()
                let finalsite=''
                if(samesite==='none'){
                    finalsite="no_restriction"
                }else{
                    finalsite=samesite
                }

                const hostonly=document.getElementById('inputcheck1_'+number1).checked
                const session=document.getElementById('inputcheck2_'+number1).checked
                const secure=document.getElementById('inputcheck3_'+number1).checked
                const httponly=document.getElementById('inputcheck4_'+number1).checked

                try {
                    await clearcookie(cookie.name)
                } catch (error) {
                    console.log('error while clearing cookie')
                }

                
                cookie={
                    //domain: domain,
                    hostOnly: hostonly,
                    httpOnly: httponly,
                    name: input1,
                    path: path,
                    sameSite: finalsite,
                    secure: secure,
                    session: session,
                    value: input2
                }

                if(hostonly===true){
                    let tab=await getCurrentTab()
                    let url=new URL(tab.url)
                    const domain=url.hostname
                }else{
                    cookie.domain=domain
                }

                if(!isNaN(datefinal)){
                    cookie.expirationDate=(datefinal/1000);
                }else{
                    console.log('date is NaN')
                }

                if(session===false && isNaN(datefinal)){
                    cookie.expirationDate=(Date.now()/1000)
                }

                
                
                

                console.log(cookie)
                await setcookies(cookie)
                window.location.reload()
            } catch (error) {
                console.log('error while saving cookie with advanced mode')
                window.location.reload()
                alert('Fatal error')
            }
            

        }


    }

    //controla el boton de eliminar la cookie
    else if(event.target && event.target.classList.contains('delete')){
        let number1 = event.target.id;

        let cookie=cookies[parseInt(number1)]

        if(cookie!==undefined){
            await clearcookie(cookie.name)
        }

        
        window.location.reload()
    }
    
    //controla los checkbox
    else if(event.target && event.target.classList.contains('form-check-input')){
        let id=event.target.id

        let item=document.getElementById(id)
        let word=id.split('_')

        

        if(word[0]==="inputcheck1"){
            let domain=document.getElementById('domain_'+word[1])
            if(item.checked===true){
                domain.disabled=true;
            }else{
                domain.disabled=false;
            }
        }else if(word[0]==="inputcheck2"){
            let expiration=document.getElementById('date_'+word[1])
            if(item.checked===true){
                expiration.value='No expiration'
                expiration.disabled=true;
                
            }else{
                expiration.disabled=false;

                let expirationdate=''

                try {
                    expirationdate=new Date(cookies[parseInt(word[1])].expirationDate*1000)
                } catch (error) {
                    expirationdate=NaN
                }

                console.log(expirationdate)

                if(!isNaN(expirationdate)){
                    expiration.value=expirationdate
                }else{
                    let date=new Date()
                    date.setHours(date.getHours()+1)
                    
                    expiration.value=date
                }

            }
        }


    }
    //controla el same site
    else if(event.target && event.target.classList.contains('form-select')){

        let id=event.target.id
        let item=document.getElementById(id)
        let word=id.split('_')[1]
        console.log(word)
        if(item.value==='None'){
            let inputcheck3=document.getElementById('inputcheck3_'+word).checked=true;
        }
    }
    
})



//controla cuando se da al boton de añadir una cookie
document.getElementById('plus').addEventListener('click',async function(){

    //elimina el texto de que no hay cookies o no estan disponibles y modifica el container
    try {
        let nocookies=document.getElementById('nocookies')
        nocookies.remove()
        let container=document.getElementById('container')
        container.style.display=''
        container.style.justifyContent=''
        container.style.alignItems=''
    } catch (error) {
        console.log('this page is normal or have cookies')
    }

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
    

    if(option==='true'){
        let tab=await getCurrentTab()
        let c=new URL(tab.url)
        
        const interior3=document.createElement('p')
        interior3.textContent='Domain'
        const input3=document.createElement('input')
        input3.id="domain_"+number
        input3.value=c.hostname
        divcontenidofinal.appendChild(interior3)
        divcontenidofinal.appendChild(input3)

        const interior4=document.createElement('p')
        interior4.textContent='Path'
        const input4=document.createElement('input')
        input4.id="Path_"+number
        input4.value='/'
        divcontenidofinal.appendChild(interior4)
        divcontenidofinal.appendChild(input4)


        const interior5=document.createElement('p')
        interior5.textContent='Expiration Date'
        const input5=document.createElement('input')
        input5.id="date_"+number

        let date=new Date()
        date.setHours(date.getHours()+1)
        input5.value=date

        divcontenidofinal.appendChild(interior5)
        divcontenidofinal.appendChild(input5)

        const interior6=document.createElement('p')
        interior6.textContent='Same Site'
        const input6=document.createElement('select')
        input6.id="samesite_"+number
        input6.classList.add('form-select')

        const option0=document.createElement('option')
        option0.textContent='Unspecified'
        input6.appendChild(option0)
        const option1=document.createElement('option')
        option1.textContent='None'
        input6.appendChild(option1)
        const option2=document.createElement('option')
        option2.textContent='Lax'
        input6.appendChild(option2)
        const option3=document.createElement('option')
        option3.textContent='Strict'
        input6.appendChild(option3)

        if(c.sameSite==="no_restriction"){
            option1.selected=true;
        }else if(c.sameSite==="lax"){
            option2.selected=true;
        }else if(c.sameSite==="unspecified"){
            option0.selected=true;
        }else if(c.sameSite==="strict"){
            option3.selected=true;
        }

        divcontenidofinal.appendChild(interior6)
        divcontenidofinal.appendChild(input6)
        divcontenidofinal.appendChild(interior6)
        divcontenidofinal.appendChild(input6)


        const divcheck1=document.createElement('div')
        divcheck1.classList.add('checkboxitem')
        divcheck1.classList.add='form-check'
        const inputcheck1=document.createElement('input')
        inputcheck1.id="inputcheck1_"+number
        inputcheck1.classList.add('form-check-input')
        inputcheck1.type='checkbox'
        const label=document.createElement('label')
        label.classList.add('form-check-label')
        label.textContent='Host Only'

        divcheck1.appendChild(inputcheck1)
        divcheck1.appendChild(label)
        divcontenidofinal.appendChild(divcheck1)


        const divcheck2=document.createElement('div')
        divcheck2.classList.add('checkboxitem')
        divcheck2.classList.add='form-check'
        const inputcheck2=document.createElement('input')
        inputcheck2.id="inputcheck2_"+number
        inputcheck2.classList.add('form-check-input')
        inputcheck2.type='checkbox'
        const label2=document.createElement('label')
        label2.classList.add('form-check-label')
        label2.textContent='Session'

        divcheck2.appendChild(inputcheck2)
        divcheck2.appendChild(label2)
        divcontenidofinal.appendChild(divcheck2)


        const divcheck3=document.createElement('div')
        divcheck3.classList.add('checkboxitem')
        divcheck3.classList.add='form-check'
        const inputcheck3=document.createElement('input')
        inputcheck3.id="inputcheck3_"+number
        inputcheck3.classList.add('form-check-input')
        inputcheck3.type='checkbox'
        const label3=document.createElement('label')
        label3.classList.add('form-check-label')
        label3.textContent='Secure'

        divcheck3.appendChild(inputcheck3)
        divcheck3.appendChild(label3)
        divcontenidofinal.appendChild(divcheck3)


        const divcheck4=document.createElement('div')
        divcheck4.classList.add('checkboxitem')
        divcheck4.classList.add='form-check'
        const inputcheck4=document.createElement('input')
        inputcheck4.id="inputcheck4_"+number
        inputcheck4.classList.add('form-check-input')
        inputcheck4.type='checkbox'
        const label4=document.createElement('label')
        label4.classList.add('form-check-label')
        label4.textContent='Http Only'

        divcheck4.appendChild(inputcheck4)
        divcheck4.appendChild(label4)
        divcontenidofinal.appendChild(divcheck4)

        if(c.secure===true){
            inputcheck3.checked=true;
        }

        if(c.session===true){
            inputcheck2.checked=true;
            input5.disabled=true;
            input5.value='No expiration'
        }

        if(c.hostOnly===true){
            inputcheck1.checked=true;
            input3.disabled=true;
        }

        if(c.httpOnly===true){
            inputcheck4.checked=true;
        }

        

    }

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
    //console.log('cookie')
    //console.log(c)
    
    let tab=await getCurrentTab()
    try {
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
    } catch (error) {
        console.log('error while saving cookies')
    }
        
    
}


//elimina la cookie
async function clearcookie(c){

    
        
    
        let tab=await getCurrentTab()

        let cookies=await getcookies(tab.url)
        //console.log(cookies)
        //console.log(c)
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