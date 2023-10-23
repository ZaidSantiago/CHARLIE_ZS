import bot from './assets/bot.svg'
import user from './assets/user.svg'

const form = document.querySelector('form')
const chatContainer = document.querySelector('#chat_container')



let loadInterval

function loader(element) {
    element.textContent = ''

    loadInterval = setInterval(() => {
        // Update the text content of the loading indicator
        element.textContent += '.';

        // If the loading indicator has reached three dots, reset it
        if (element.textContent === '....') {
            element.textContent = '';
        }
    }, 300);
}

function typeText(element, texts) {
    let index = 0
    var msg = new SpeechSynthesisUtterance();
    msg.rate = 3;
    msg.text = texts;
    msg.volume = 1;
    console.log(msg)
    window.speechSynthesis.speak(msg);

    
    
    let interval = setInterval(() => {
        if (index < texts.length) {
            element.innerHTML += texts.charAt(index)
            index++
            
        } else {
            clearInterval(interval)
            if (element.innerHTML.toLowerCase().includes("t.a.p")) {
              console.log("test")
            }
        }
    }, 40)
}

// generate unique ID for each message div of bot
// necessary for typing text effect for that specific reply
// without unique ID, typing text will work on every element
function generateUniqueId() {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);

    return `id-${timestamp}-${hexadecimalString}`;
}

function chatStripe(isAi, value, uniqueId) {
    return (
        `
        <div class="wrapper ${isAi && 'ai'}">
            <div class="chat">
                <div class="profile">
                    <img 
                      src=${isAi ? bot : user} 
                      alt="${isAi ? 'bot' : 'user'}" 
                    />
                </div>
                <div class="message" id=${uniqueId}>${value}</div>
            </div>
        </div>
    `
    )
}
const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  //user's chatstripe
  chatContainer.innerHTML += chatStripe(false, data.get('prompt'));

  form.reset();

  //bot's chatstripe
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true, " ", uniqueId);

  chatContainer.scrollTop = chatContainer.scrollHeight;
  const messageDiv = document.getElementById(uniqueId);

  loader(messageDiv)
  

  // fetch data from server

  const response = await fetch('https://charlie-9b40.onrender.com/', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      prompt: data.get('prompt')
    })
  })

  clearInterval(loadInterval);
  messageDiv.innerHTML = '';

  if(response.ok) {
    const data = await response.json();
    const parsedData = data.bot.trim();

    typeText(messageDiv, parsedData);
    if (chatContainer.innerHTML.includes("hi") || chatContainer.innerHTML.includes("Hi"))  {
      console.log("hi");
    }
     if (chatContainer.innerHTML.includes("youtube")) {
      alert("Youtube commands are not supported yet.");
    }
    if (chatContainer.innerHTML.includes("smith") || chatContainer.innerHTML.includes("Smith")) {
      console.log('smith triggered')
      window.open('http://smithcsrobot.weebly.com/');
    }
    if (chatContainer.innerHTML.includes("riley") || chatContainer.innerHTML.includes("Riley")) {
      console.log('Riley triggered')
      window.open('https://docs.google.com/document/d/1F9oJiHEYS4PZlm9YnIu5rggM_f9cigHPBA1B5solzTw/edit?usp=sharing');
    }
    if (chatContainer.innerHTML.includes("lance") || chatContainer.innerHTML.includes("Lance")) {
      console.log('Lance triggered')
      window.open('https://docs.google.com/document/d/1wLyonAcoEwN7iDoNn1ucDn8Axw_5uXWqqIGK7RF7vGM/edit?usp=sharing');
    }
    if (chatContainer.innerHTML.includes("jaycoby") || chatContainer.innerHTML.includes("Jaycoby")) {
      console.log('Jaycoby triggered')
      window.open('https://docs.google.com/document/d/1iLLLc8X2czZC94hkxvbPym3DImLHaWUMOoDhsVGDE7M/edit?usp=sharing');
    }
    if (chatContainer.innerHTML.includes("myself") || chatContainer.innerHTML.includes("Myself")) {
      console.log('charlie image triggered')
      window.open('https://i.pinimg.com/originals/de/23/83/de238328593da21dbf9185ed3f7d991d.gif');
    }
    
     if (chatContainer.innerHTML.includes("location")) {
      alert("Location services are not supported yet.");
    }
    
     if (chatContainer.innerHTML.includes("canelo") || chatContainer.innerHTML.includes("Canelo")) {
      console.log('canelo triggered')
      window.open('https://www.youtube.com/watch?v=6HoyuPW9vcw');
    }
    if (chatContainer.innerHTML.includes("kevin") || chatContainer.innerHTML.includes("Kevin")) {
      console.log('kevin triggered')
      window.open('https://docs.google.com/document/d/1mv5BO5E1iXFZohhFx8n0D5WZh7qC3aBmJ8lKjjP_bY4/edit?usp=sharing');
    }
  } else {
    const err = await response.text();

    messageDiv.innerHTML = "Something went wrong";

    alert(err);
  }
}
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new window.SpeechRecognition();
recognition.interimResults = true;

let p = document.querySelector('.promptBox')

var msg = new SpeechSynthesisUtterance();

    

recognition.addEventListener('result', (e) => {
    const text = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript.toLowerCase())
    .join('')
    console.log(text);
    p.innerHTML = text;
    
   }
)

recognition.addEventListener('end', (e)=>{
  if (document.querySelector('.promptBox').innerHTML === "" || document.querySelector('.promptBox').innerHTML === " ") {
    alert("Please ask a prompt prior to submitting!")
  }
  else {
  handleSubmit(e)
  document.querySelector('.promptBox').innerHTML = ""
  }
})

recognition.start();

form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    handleSubmit(e);
  }
})


console.log("Joel Iyalla vs African")