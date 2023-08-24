import {saveForm, getEstudiante,ongetEstudiante, EliminarEstudiante,EditarEstudiante,ActualizarEstudiante} from './firebase.js'

const Lista=document.getElementById('lista')

const openModal = document.getElementById('openRegisterModal')
const modal = document.getElementById('modal')
const closeModal = document.getElementById('closeRegisterModal')
/*const studentRef = firebase.database().ref(students)*/

const showRegisterModal = () => {
    modal.classList.toggle('is-active')
}

openModal.addEventListener('click', showRegisterModal)
closeModal.addEventListener('click', showRegisterModal)

let Editar = false;
let id = "";

function curriculum(){
    window.location.assign='https://drive.google.com/drive/u/1/my-drive'
}

window.addEventListener('DOMContentLoaded', async()=>{
    //onst querySnapshot = await getEstudiante()

    ongetEstudiante((querySnapshot)=>{

        let html=''

        querySnapshot.forEach(doc=> {
            const listar =doc.data()
             html +=`
             <div class="columns">
             <div class="column">
               ${listar.nombre}
             </div>
             <div class="column">
             ${listar.plataforma}
             </div>
             <div class="column">
             ${listar.estado}
             </div>
             <div class="column">
             <button class='btn-delete' data-id="${doc.id}">Eliminar</button>
             <button class='btn-edit' data-id="${doc.id}">Editar</button>
             </div>
           </div>
                    `;
                    
             
        });
    
        Lista.innerHTML=html;
        const btnEliminiar=Lista.querySelectorAll('.btn-delete')
        

        btnEliminiar.forEach(btn=>{
            btn.addEventListener('click', ({target:{dataset}})=>{
                EliminarEstudiante(dataset.id)
            })
        })

        const btnEditar=Lista.querySelectorAll('.btn-edit')
        btnEditar.forEach((btn)=>{
            btn.addEventListener('click', async (e)=>{

                const documento = await EditarEstudiante(e.target.dataset.id)
                console.log(documento.data())
                const juego = documento.data()

                registerForm['Nombre'].value = juego.nombre
                registerForm['Plataforma'].value = juego.plataforma
                registerForm['Estado'].value = juego.estado

                Editar = true
                id = documento.id;
                

                registerForm['Registrar'].innerText = 'Actualizar'
                
            })
            btn.addEventListener('click',showRegisterModal)
            
        })

    });

})


const registerForm = document.getElementById('register-form')
registerForm.addEventListener('submit',(e) =>{
    e.preventDefault()
    
    const nombre = registerForm['Nombre']
    const  plataforma = registerForm['Plataforma']
    const  estado = registerForm['Estado']

    
    if(!Editar){
        saveForm(nombre.value, plataforma.value, estado.value);
    }else{
        
        ActualizarEstudiante(id,{
            nombre: nombre.value,
            plataforma: plataforma.value,
            estado: estado.value
        });
        Editar = false
    }
    registerForm.reset();

});


