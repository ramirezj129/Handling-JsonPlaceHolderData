let newPost = []


document.getElementById('getOne').addEventListener('click', () => {

    btnOne = document.getElementById('getOne')
    btnOne.setAttribute('style', 'display:none')

    btnLoad = document.getElementById('btnLoad')
    btnLoad.setAttribute('style', 'display:block')

    h4 = document.getElementById('title')
    h4.setAttribute('style', 'display:block')
    $(h4).fadeOut(2000)


    function getOnePost() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {

                fetch('https://jsonplaceholder.typicode.com/posts/1')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Status: ${response.status}`);
                        }
                        else{

                            
                            btnLoad.setAttribute('style', 'display:none')
                            btnOne.setAttribute('style', 'display:block')


                            return response.json();

                        }
                    })
                    .then(data => {
                        resolve(data); 
                    })
                    .catch(error => {
                        reject(error); 
                    });
            }, 2000);
        });
    }
    
    getOnePost().then(data => {
        console.log("Data resolved returned", data)
        displayOnePost(data)
    })
    .catch(error =>{
        console.log('Error ', error)
    })


})



document.getElementById('getAll').addEventListener('click', ()=>{

    alertSuccess = document.getElementById('aSuccess')


    const data1 = new Promise((resolve,reject) =>{
        setTimeout(()=>{

           fetch('https://jsonplaceholder.typicode.com/posts') 
           .then(response => {

            if(response.ok)
                {
                    return response.json()
                }

           })
           .then(post =>{

            resolve(post)
            alertSuccess.removeAttribute('hidden')
            $(alertSuccess).fadeOut(3000)




           })
           .catch(error =>{
                reject("Error fetching", error)
           })
      



        }, 2000)

      

    }) 

    data1.then((posts) =>{
        console.log("Data being sent to function", posts)
        posts.splice(50,100)
        console.log("After Splcie", posts)
        

        displayAllPosts(posts)
    })
    .catch(error => {
        console.log("Error sending to function", error)
    })

   
})


document.getElementById('create').addEventListener('click', () =>{

    postName = document.getElementById('postName').value
    postSubj = document.getElementById('postSubject').value
    postDesc = document.getElementById('postInfo').value


    if(postName && postSubj && postDesc){
        newPost.push({Post:postName, Subject: postSubj, Description: postDesc})


        document.getElementById('postName').value   = ''   
        document.getElementById('postSubject').value = ''
        document.getElementById('postInfo').value = ''

        createNewpost()


    }


})



function displayOnePost(data){

    div = document.getElementById('tableOut')
    div.innerHTML = ''


    const out = document.getElementById('output')
    const ul = document.createElement('ul')
    const li = document.createElement('li')

    out.innerHTML = ''
  
    li.textContent = `Post: ${data.userId}, ${data.title}, ${data.body}`
    ul.appendChild(li)
    out.appendChild(ul)



}


function displayAllPosts(posts){

    const out = document.getElementById('output')
    out.innerHTML = ''

    div = document.getElementById('tableOut')
    table = document.createElement('table')
    tr =  document.createElement('tr')
    thead = document.createElement('thead')
    tbody = document.createElement('tbody')

    table.classList.add('table', 'table-bordered')
    thead.classList.add('table-info')
        
    tempArray = ['userId', 'id', 'title', 'body']

    div.innerHTML = ''


    for(let i = 0; i < tempArray.length; i++){
        th = document.createElement('th')
        th.textContent = tempArray[i]
        tr.appendChild(th)

    }

    thead.appendChild(tr)
    table.appendChild(thead)




    let postsInner = ``
    posts.forEach((items,index) =>{

        postsInner +=`
        
        <tr>
            <td>${items.userId}</td>
            <td>${items.id}</td>
            <td>${items.title}</td>
            <td>${items.body}</td>

        </tr>
        
        `

    })
    

    tbody.innerHTML = postsInner
    table.appendChild(tbody)
    div.appendChild(table)

}




function createNewpost(){
    
     const out = document.getElementById('output')
    out.innerHTML = ''

    const div1 = document.getElementById('tableOut')
    div1.innerHTML = ''

    


    const div = document.getElementById('taskOut')

    div.innerHTML = ''

    newPost.forEach((item)=>{

    
        divTop = document.createElement('div')
        divBody = document.createElement('div')
        h5 = document.createElement('h5')
        p = document.createElement('p')
        p2 = document.createElement('p')
    
        divTop.classList.add('card', 'w-75', 'mb-3')
        divBody.classList.add('card-body')
        h5.classList.add('card-title')
        p.classList.add('card-text', 'fw-light', 'fs-sm-1')
        p2.classList.add('card-text')
    
    
        h5.textContent = item.Post
        p.textContent = item.Subject
        p2.textContent = item.Description

        divBody.appendChild(h5)
        divBody.appendChild(p)
        divBody.appendChild(p2)


        divTop.appendChild(divBody)
        div.appendChild(divTop)



    })







}