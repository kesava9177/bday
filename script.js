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
  "🐱", "😹", "🤪", "🙈", "🦄", "🐸", "👻", "🐹", "🥳", "😎"
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
character.addEventListener('mouseover', () => {
  if (attempts >= maxAttempts) {
    endGame();
    return;
  }

  attempts++;

  // Play sound
  boingSound.currentTime = 0;
  boingSound.play();

  // Change Emoji & Message
  charEmoji.innerText = faces[attempts % faces.length];
  speechBubble.innerText = messages[attempts % messages.length];
  speechBubble.style.opacity = 1;

  // Move
  moveCharacter();

  // Hide speech bubble after a bit
  setTimeout(() => {
    speechBubble.style.opacity = 0;
  }, 800);
});

function moveCharacter() {
  const x = Math.random() * (window.innerWidth - 150);
  const y = Math.random() * (window.innerHeight - 150);

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
document.addEventListener('mousemove', (e) => {
  if (Math.random() > 0.8) {
    createSparkle(e.clientX, e.clientY);
  }
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
