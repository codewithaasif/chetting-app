const socket = io()

let username;
const textarea = document.querySelector("#textarea");
const msgarea = document.querySelector(".message_area");
                 
do {
    username = prompt('please enter your name')
} while (!username);


textarea.addEventListener('keyup',(e)=>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value)
        
    }
})

function sendMessage(msg){
    let pylod = {
        user:username,
        message:msg.trim()
    }

    //append
    appendmessage(pylod,'outgoing')

    textarea.value=''
        scroll()

    //send to server
    socket.emit('message',pylod)


}

function appendmessage(pylod,type){
    const maindiv = document.createElement('div');
    const classname = type;
    maindiv.classList.add(type, 'message')

    let markup = `
                    <h4>${pylod.user}</h4>
                    <p>${pylod.message}</p>
                `;
    
    maindiv.innerHTML = markup;
    msgarea.appendChild(maindiv)
}

//recive message
socket.on('message',(msg)=>{
    appendmessage(msg,'incomming')
    scroll()
})

function scroll(){
    msgarea.scrollTop = msgarea.scrollHeight
}