const form = document.querySelector('form');
const show = document.querySelector('.show');
// const delBtn = document.querySelectorAll('button');


// db.collection('user').get().then(snapshot =>{

//     snapshot.docs.forEach((doc, id) => {
         
//         displayUser(doc, doc.id);
//     })
// });


db.collection('user').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        const doc = change.doc;
        if(change.type === 'added'){
            displayUser(doc, doc.id );
        }
        else if(change.type === 'removed'){
            const id = change.id;
            removeUser(doc.id);

        }
    })
});

function removeUser(id){
    const look = document.querySelectorAll('#look')
    look.forEach(look => {
        if(look.getAttribute('data-id') === id)
        look.remove();
    })
}

function displayUser(user, userId){
    let html = `<div data-id = ${userId} id= 'look'>
    
    <p>${user.data().name}</p>
    </p>${user.data().age}</p>
    <p>${user.data().location}</p>
    <p>${user.data().email}</p>
    <button> Delete User <button>
    
    </div>
      
    
    `
    show.innerHTML += html;
}

const createUser = (e)=>{
    e.preventDefault();
    
const user = {
    name : form.name.value,
    email: form.email.value,
    age: form.age.value,
    location: form.location.value
}

db.collection('user').add(user).then(()=>{
    console.log('added')
})
.catch((err)=> {
    console.log(err);
})

}


form.addEventListener('submit', createUser );

show.addEventListener('click',  (e)=>{
    if(e.target.tagName === 'BUTTON'){
     const id  =   e.target.parentElement.getAttribute('data-id');
    db.collection('user').doc(id).delete().then(() => {
        console.log('deleted')
    });
    }



})
