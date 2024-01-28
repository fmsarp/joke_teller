const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


// disable/enable button
function toggleButton() {
    button.disabled = !button.disabled;
}


// passing joke to VoiceRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: '***',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// get jokes from joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming'
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // text-to-sepeach
        tellMe(joke);

        // disable button
        toggleButton();

    } catch (error) {
        // catch errors here
        console.log('whoops', error);
    }
}

// event listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
