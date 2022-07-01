const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
    {
        image: 'https://images.unsplash.com/photo-1526034332220-067b0f400e06?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=406&q=80',
        text: "I'm Thirsty"
    },
    {
        image: 'https://images.unsplash.com/photo-1529973565457-a60a2ccf750d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        text: "I'm Hungry"
    },
    {
        image: 'https://images.unsplash.com/photo-1470777639313-60af88918203?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        text: "I'm Tired"
    },
    {
        image: 'https://images.unsplash.com/photo-1609840534277-88833ef3ddeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        text: "I'm Hurt"
    },
    {
        image: 'https://images.unsplash.com/photo-1524117074681-31bd4de22ad3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
        text: "I'm Happy"
    },
    {
        image: 'https://images.unsplash.com/photo-1503525537183-c84679c9147f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        text: "I'm Angry"
    },
    {
        image: 'https://images.unsplash.com/photo-1597176116047-876a32798fcc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
        text: "I'm Sad"
    },
    {
        image: 'https://images.unsplash.com/photo-1565239500265-bd02167453ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        text: "I'm Scared"
    },
    {
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80',
        text: 'I Want To Go Outside'
    },
    {
        image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        text: 'I Want To Go Home'
    },
    {
        image: 'https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80',
        text: 'I Want To Go To School'
    },
    {
        image: 'https://images.unsplash.com/photo-1593100126453-19b562a800c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=867&q=80',
        text: 'I Want To Go To Grandmas'
    }
];

data.forEach(createBox);

// Create speech Boxes
function createBox(item) {
    const box = document.createElement('div');

    const { image, text } = item;

    box.classList.add('box');
    box.innerHTML = `
        <img src="${image}" alt="${text}" />
        <p class="info">${text}</p>
    `;

    box.addEventListener('click', () => {
        setTextMessage(text);
        speakText();

        // Add active effect
        box.classList.add('active');
        setTimeout(() => box.classList.remove('active'), 800)
    })

    main.appendChild(box)
}

// Init speech synthesis
const message = new SpeechSynthesisUtterance();


// Store voices
let voices = [];

function getVoices() {
    voices = speechSynthesis.getVoices();

    voices.forEach(voice => {
        const option = document.createElement('option');

        option.value = voice.name;
        option.innerText = `${voice.name} ${voice.lang}`;

        voicesSelect.appendChild(option);
    })
}

// Set Text
function setTextMessage(text) {
    message.text = text;
}

// Speak Text
function speakText() {
    speechSynthesis.speak(message);
}

// Set Voice
function setVoice(e) {
    message.voice = voices.find(voice => voice.name === e.target.value)
}

// Voices Changed
speechSynthesis.addEventListener('voiceschanged', getVoices)

// Toggle Text Box
toggleBtn.addEventListener('click', () => document.getElementById('text-box').classList.toggle('show'));

// Close Text Box using button
closeBtn.addEventListener('click', () => document.getElementById('text-box').classList.remove('show'));

// Change Voice
voicesSelect.addEventListener('change', setVoice);

// Read Text Button
readBtn.addEventListener('click', () => {
    setTextMessage(textarea.value);
    speakText();
})

getVoices();