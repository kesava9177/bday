const startScreen = document.getElementById('start-screen');
const character = document.getElementById('character');
const charEmoji = document.getElementById('char-emoji');
const speechBubble = document.getElementById('speech-bubble');
const messageContainer = document.getElementById('message-container');
const boingSound = document.getElementById('boing');
const winSound = document.getElementById('win-sound');
const bgMusic = document.getElementById('bg-music');

let attempts = 0;
const maxAttempts = 10;

// A mix of cute and funny emojis
const faces = [
  "🐱", "😜", "😝", "😛", "🤭",
  "🙃", "😆", "😂", "😎", "🥳"
];

const messages = [
  "Catch me!",
  "Too slow!",
  "Hehe!",
  "Missed!",
  "Whoops!",
  "Nope!",
  "Try again!",
  "Almost!",
  "Faster!",
  "Gotcha!"
];

// --- Start Game ---
function startGame() {
  startScreen.style.display = 'none';
  character.style.display = 'flex';

  bgMusic.volume = 0.3;
  bgMusic.play().catch(e => console.log("Audio play failed:", e));

  moveCharacter();
}

// --- Game Logic ---


// Handle both touch and mouse interactions
['mouseover', 'touchstart'].forEach(eventType => {
  character.addEventListener(eventType, (e) => {
    if (e.type === 'touchstart') e.preventDefault(); // Prevent ghost mouse clicks
    handleInteraction();
  });
});

function handleInteraction() {
  if (attempts >= maxAttempts) {
    endGame();
    return;
  }

  attempts++;

  // Play sound
  boingSound.currentTime = 0;
  boingSound.play();

  // Change Emoji & Message
  charEmoji.innerText = faces[Math.min(attempts - 1, faces.length - 1)];
  speechBubble.innerText = messages[Math.min(attempts - 1, messages.length - 1)];
  speechBubble.style.opacity = 1;

  // Move
  moveCharacter();

  // Hide speech bubble after a bit
  setTimeout(() => {
    speechBubble.style.opacity = 0;
  }, 800);
}

function moveCharacter() {
  const charWidth = character.offsetWidth || 150;
  const charHeight = character.offsetHeight || 150;

  const x = Math.random() * (window.innerWidth - charWidth);
  const y = Math.random() * (window.innerHeight - charHeight);

  character.style.left = `${x}px`;
  character.style.top = `${y}px`;

  // Random rotation
  const rot = (Math.random() - 0.5) * 40;
  character.style.transform = `rotate(${rot}deg)`;
}

// --- End Game ---
function endGame() {
  character.style.display = 'none';
  messageContainer.style.display = 'block';
  winSound.play();
  launchConfetti();
}

function resetGame() {
  attempts = 0;
  messageContainer.style.display = 'none';
  startScreen.style.display = 'block';
  charEmoji.innerText = "🐱"; // Reset to first emoji
}

// --- Effects ---
['mousemove', 'touchmove'].forEach(eventType => {
  document.addEventListener(eventType, (e) => {
    let clientX, clientY;
    if (e.type === 'touchmove') {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    if (Math.random() > 0.8) {
      createSparkle(clientX, clientY);
    }
  });
});

function createSparkle(x, y) {
  const sparkle = document.createElement('div');
  sparkle.classList.add('sparkle');
  sparkle.innerText = ['✨', '⭐', '💖'][Math.floor(Math.random() * 3)];
  sparkle.style.left = `${x}px`;
  sparkle.style.top = `${y}px`;
  sparkle.style.color = `hsl(${Math.random() * 360}, 100%, 80%)`;
  document.body.appendChild(sparkle);

  setTimeout(() => sparkle.remove(), 1000);
}

function launchConfetti() {
  for (let i = 0; i < 150; i++) {
    const c = document.createElement('div');
    c.classList.add('confetti');
    c.style.left = Math.random() * 100 + 'vw';
    c.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 60%)`;
    c.style.animationDuration = Math.random() * 3 + 2 + 's';
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 5000);
  }
}
