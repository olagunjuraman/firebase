const list = document.querySelector('ul');
const form = document.querySelector('form');
const li = document.querySelector('li');

const addRecipe = (recipe, id)=>{
    
    let html = `
    <li data-id= ${id}>
     <div>${recipe.name}</div>
     <div>${recipe.created_at.toDate()}</div>
     <button class= 'btn'>Delete</button>
    </li>
    
    `
    list.innerHTML += html
    console.log(html);
}



//get document
// db.collection('recipes').get().then(snapshot => {
//   snapshot.docs.forEach(doc =>{
//      addRecipe(doc.data(), doc.id);
//   })
// }).catch(err => {
//     console.log(err)
// });
const deleteRecipe = (id) =>{
    const recipes = document.querySelectorAll('li');
    recipes.forEach(recipe => {
        if(recipe.getAttribute('data-id') === id){
            recipe.remove();
        }
    })
}

db.collection('recipes').onSnapshot((snapshot) => {
     snapshot.docChanges().forEach((change) => {
         const doc = change.doc;
         if(change.type === 'added'){
             addRecipe(doc.data(), doc.id);
         }else if (change.type === 'removed'){
            deleteRecipe(doc.id);
         }
     })
})
//add document

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const time = new Date(19/10/2009);
    const recipe = {
        name: form.recipe.value,
        created_at: time
    }

    db.collection('recipes').add(recipe).then(()=>{
        console.log('added');   
    })
});

//delete document

list.addEventListener('click', (e)=> {
    if(e.target.tagName == 'BUTTON'){
    const id = e.target.parentElement.getAttribute('data-id');
    db.collection('recipes').doc(id).delete().then(()=>{
        console.log('deleted');
    })
    }
  
})