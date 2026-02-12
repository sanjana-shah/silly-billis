// ===== Questions Data =====
const questions = [
  {
    question: "What's the universal cure for a bad day?",
    options: ["A nap", "A hug", "Complaining", "Scrolling TikTok"],
    correct: 1,
    meme: {
      emoji: "🤗",
      caption: "When the hug hits different",
      subcaption: "Serotonin levels: 📈📈📈"
    },
    feedback: "Correct! A hug fixes everything 🤗"
  },
  {
    question: "What do you call two birds in love?",
    options: ["Lovebirds", "Tweethearts", "Feathered soulmates", "Wingmates"],
    correct: 1,
    meme: {
      emoji: "🐦💕🐦",
      caption: "Tweethearts be like:",
      subcaption: "*tweets romantically*"
    },
    feedback: "Tweethearts! Get it?? 🐦"
  },
  {
    question: "What did the phone say to the WiFi?",
    options: [
      "\"You complete me\"",
      "\"Stop buffering my love\"",
      "\"I'm feeling a connection\"",
      "\"Can I get your number?\""
    ],
    correct: 2,
    meme: {
      emoji: "📱💫📶",
      caption: "Full bars of love, baby",
      subcaption: "Connection: Strong & Stable ✅"
    },
    feedback: "The connection is STRONG 📶"
  },
  {
    question: "What's the most romantic shape?",
    options: ["A circle (endless love)", "A heart", "A star", "A triangle (love triangle??)"],
    correct: 1,
    meme: {
      emoji: "❤️",
      caption: "Heart: the OG romantic shape since forever",
      subcaption: "Mathematicians: \"Actually it's a cardioid...\" 🤓"
    },
    feedback: "Obviously a heart! ❤️"
  },
  {
    question: "Roses are red, violets are blue...",
    options: [
      "\"...sugar is sweet, and so are you\"",
      "\"...I can't rhyme, but I like you\"",
      "\"...I forgot the rest, but hey what's up\"",
      "\"...this poem is overused, just like my feelings for you\""
    ],
    correct: 1,
    meme: {
      emoji: "🌹😅",
      caption: "When you're bad at poetry but great at vibes",
      subcaption: "Roses are red, violets are blue, I can't rhyme... 🫠"
    },
    feedback: "Honesty is the best poetry 😌"
  },
  {
    question: "What's the key to a perfect date?",
    options: ["Good looks", "Good conversation", "Good food", "Good memes"],
    correct: 2,
    meme: {
      emoji: "🍕🍣🍰",
      caption: "The way to someone's heart is through their stomach",
      subcaption: "Food > Everything. No debates. 🤤"
    },
    feedback: "Food is the love language we all speak 🍕"
  }
];

// ===== State =====
let currentQuestion = 0;
let score = 0;
let noDodgeCount = 0;

// ===== Screen Management =====
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(screenId);
  target.classList.add('active');
  // Re-trigger card animation
  const card = target.querySelector('.card');
  if (card) {
    card.style.animation = 'none';
    card.offsetHeight; // trigger reflow
    card.style.animation = '';
  }
}

// ===== Start Game =====
function startGame() {
  currentQuestion = 0;
  score = 0;
  showScreen('questionScreen');
  loadQuestion();
}

// ===== Load Question =====
function loadQuestion() {
  const q = questions[currentQuestion];
  document.getElementById('questionNumber').textContent = `Question ${currentQuestion + 1} of 7`;
  document.getElementById('questionText').textContent = q.question;
  document.getElementById('progressFill').style.width = `${((currentQuestion) / 7) * 100}%`;

  const container = document.getElementById('optionsContainer');
  container.innerHTML = '';

  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.onclick = () => selectOption(i);
    container.appendChild(btn);
  });

  const feedback = document.getElementById('feedback');
  feedback.className = 'feedback';
  feedback.textContent = '';
}

// ===== Select Option =====
function selectOption(index) {
  const q = questions[currentQuestion];
  const buttons = document.querySelectorAll('.option-btn');
  const feedback = document.getElementById('feedback');

  // Disable all buttons
  buttons.forEach(b => b.classList.add('disabled'));

  if (index === q.correct) {
    buttons[index].classList.add('correct');
    feedback.textContent = q.feedback;
    feedback.className = 'feedback show correct-feedback';
    score++;

    // Show meme after a brief delay
    setTimeout(() => {
      showMeme(q.meme);
    }, 1200);
  } else {
    buttons[index].classList.add('wrong');
    buttons[q.correct].classList.add('correct');
    feedback.textContent = "Not quite! But the right answer is highlighted 😉";
    feedback.className = 'feedback show wrong-feedback';

    // Still show the meme (be generous!)
    setTimeout(() => {
      showMeme(q.meme);
    }, 1500);
  }
}

// ===== Show Meme =====
function showMeme(meme) {
  const frame = document.getElementById('memeFrame');
  frame.innerHTML = `
    <div class="meme-text-display">
      <span class="meme-emoji">${meme.emoji}</span>
      <div class="meme-caption">${meme.caption}</div>
      <div class="meme-subcaption">${meme.subcaption}</div>
    </div>
  `;

  const title = document.getElementById('memeTitle');
  title.textContent = score === currentQuestion + 1 ? "You got it! 🎉" : "Here's your meme anyway! 😄";

  const nextBtn = document.getElementById('nextBtn');
  if (currentQuestion === 5) {
    nextBtn.textContent = "Final Question... 👀";
  } else {
    nextBtn.textContent = "Next Question →";
  }

  showScreen('memeScreen');
}

// ===== Next Question =====
function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < 6) {
    showScreen('questionScreen');
    loadQuestion();
  } else {
    // Time for the valentine question!
    showValentineScreen();
  }
}

// ===== Valentine Screen =====
function showValentineScreen() {
  document.getElementById('progressFill').style.width = '100%';
  noDodgeCount = 0;
  showScreen('valentineScreen');
  document.getElementById('valentineButtons').classList.remove('hidden');
  document.getElementById('valentineResponse').classList.add('hidden');
  launchConfetti();
}

// ===== Dodge the No Button =====
function dodgeButton(btn) {
  noDodgeCount++;

  const messages = [
    "Nope, try again 😏",
    "That button doesn't work 💅",
    "Are you sure? Think again...",
    "Wrong answer bestie 😌",
    "The button has left the chat",
    "Nice try 😂",
    "Error 404: No not found",
    "I don't think so 💕",
    "Hmm, that's not an option",
    "The button refuses to be clicked"
  ];

  // Move button to random position
  const card = btn.closest('.valentine-card');
  const cardRect = card.getBoundingClientRect();
  const maxX = cardRect.width - 100;
  const maxY = cardRect.height - 60;

  btn.style.position = 'absolute';
  btn.style.left = Math.random() * maxX + 'px';
  btn.style.top = Math.random() * maxY + 'px';
  btn.style.zIndex = '10';
  btn.textContent = messages[noDodgeCount % messages.length];

  // After enough dodges, make it tiny
  if (noDodgeCount > 4) {
    btn.style.fontSize = '0.6rem';
    btn.style.padding = '4px 8px';
    btn.style.opacity = '0.5';
  }

  // After many dodges, remove it entirely
  if (noDodgeCount > 8) {
    btn.style.display = 'none';
  }
}

// ===== Say Yes =====
function sayYes() {
  document.getElementById('valentineButtons').classList.add('hidden');
  document.getElementById('valentineTitle').classList.add('hidden');
  document.getElementById('valentineSubtitle').classList.add('hidden');
  document.getElementById('valentineQuestion').classList.add('hidden');
  document.getElementById('valentineResponse').classList.remove('hidden');

  // Show celebration mini-memes
  const celebrationEmojis = ['🥰', '💐', '🍫', '💌', '🎉', '💕'];
  const container = document.getElementById('celebrationMemes');
  container.innerHTML = celebrationEmojis.map(e => `<div class="mini-meme">${e}</div>`).join('');

  // More confetti!
  launchConfetti();
  setTimeout(() => launchConfetti(), 500);
  setTimeout(() => launchConfetti(), 1000);
}

// ===== Confetti =====
function launchConfetti() {
  const container = document.getElementById('confettiContainer');
  const colors = ['#ff6b9d', '#c94277', '#ff8fab', '#4ecdc4', '#ffe66d', '#ff6b6b', '#a78bfa'];

  for (let i = 0; i < 50; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    piece.style.width = Math.random() * 10 + 5 + 'px';
    piece.style.height = Math.random() * 10 + 5 + 'px';
    piece.style.animationDuration = Math.random() * 2 + 2 + 's';
    piece.style.animationDelay = Math.random() * 1 + 's';
    container.appendChild(piece);

    // Clean up after animation
    setTimeout(() => piece.remove(), 4000);
  }
}

// ===== Floating Hearts Background =====
function createFloatingHearts() {
  const container = document.getElementById('heartsBg');
  const hearts = ['💗', '💕', '💖', '💘', '🩷', '♥️'];

  setInterval(() => {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 20 + 14) + 'px';
    heart.style.animationDuration = (Math.random() * 6 + 6) + 's';
    container.appendChild(heart);

    setTimeout(() => heart.remove(), 12000);
  }, 800);
}

// ===== Init =====
createFloatingHearts();
