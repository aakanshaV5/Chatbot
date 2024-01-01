const chatInput =  document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox= document.querySelector(".chatbox");
const chatbotToggler= document.querySelector(".chatbot-toggler");

let userMessage;
const API_KEY="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";
const inputInitHeight=chatInput.scrollHeight;
const createChatLi =(message , className) =>{
    const chatLi=document.createElement("li");
    chatLi.classList.add("chat" , className);
    let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML=chatContent;
return chatLi;

}
const generateResponse = (incomingChatLi) =>
{
    const API_URL="https://api.openai.com/v1/chat/completions";
    const messageElement= incomingChatLi.querySelector("p");
    const requestOptions={
        method:"POST",
        headers:
        {
"Content-Type":"application/json",
"Authorization": `Bearer ${API_KEY}`

        },
        body: JSON.stringify({
                model:"gpt-3.5-turbo",
                messages:[
                  
                    {"role": "user", "content": userMessage}
                    
                ]
            

        })

    }
    fetch(API_URL , requestOptions).then(res => res.json()).then(data => { 
        messageElement.textContent= data.choices[0].message.content;
    }).catch((error) => {
        messageElement.classList.add("error");
        messageElement.textContent= "Oops!Something went wrong,try again!";

    }).finally(() => chatbox.scrollTo(0 , chatbox.scrollHeight));
}
const handleChat = () => {
    userMessage= chatInput.value.trim();
    if(!userMessage) return;
    chatInput.style.height= `${chatInput.scrollHeight}px`;
    //users mssg to chatbox
    chatbox.appendChild(createChatLi(userMessage ,"outgoing"));
    chatbox.scrollTo(0 , chatbox.scrollHeight);
    setTimeout(()=>{
        const incomingChatLi= createChatLi("generating....", "incoming")
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0 , chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
    document.getElementById("mango").value="";

}
chatInput.addEventListener("input" , () => {

    chatInput.style.height= `${inputInitHeight}px`;
    chatInput.style.height= `${chatInput.scrollHeight}px`;

});
chatInput.addEventListener("keydown" , (e) => {

    if(e.key=== "Enter" && !e.shiftkey && window.innerWidth > 800)
    {
        e.preventDefault();
        handleChat();

    }
});

chatbotToggler.addEventListener("click" , () => document.body.classList.toggle("show-chatbot"));
sendChatBtn.addEventListener("click" ,handleChat);
function removetext(){
    console.log("hello")
   
    
}