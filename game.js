// ===== Questions Data =====
const questions = [
  {
    question: "What was our first lunch date location?",
    answer: "Subway",
    meme: {
      image: null,
      emoji: "🤗",
      caption: "When the hug hits different",
      subcaption: "Serotonin levels: 📈📈📈"
    },
    feedback: "Correct! A hug fixes everything 🤗"
  },
  {
    question: "What do you call two birds in love?",
    answer: "tweethearts",
    meme: {
      image: null,
      emoji: "🐦💕🐦",
      caption: "Tweethearts be like:",
      subcaption: "*tweets romantically*"
    },
    feedback: "Tweethearts! Get it?? 🐦"
  },
  {
    question: "What did the phone say to the WiFi?",
    answer: "connection",
    meimage: null,
      me: {
      emoji: "📱💫📶",
      caption: "Full bars of love, baby",
      subcaption: "Connection: Strong & Stable ✅"
    },
    feedback: "The connection is STRONG 📶"
  },
  {
    question: "What's the most romantic shape?",
    answer: "heart",
    meimage: null,
      me: {
      emoji: "❤️",
      caption: "Heart: the OG romantic shape since forever",
      subcaption: "Mathematicians: \"Actually it's a cardioid...\" 🤓"
    },
    feedback: "Obviously a heart! ❤️"
  },
  {
    question: "Roses are red, violets are blue...",
    animage: null,
      swer: "love",
    meme: {
      emoji: "🌹😅",
      caption: "When you're bad at poetry but great at vibes",
      subcaption: "Roses are red, violets are blue, I can't rhyme... 🫠"
    },
    feedback: "Honesty is the best poetry 😌"
  },
  {
    question: "What's the key to a perfect date?",
    animage: null,
      swer: "food",
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
  container.innerHTML = `
    <div class="answer-input-wrapper">
      <input type="text" id="answerInput" class="answer-input" placeholder="Your answer here..." />
      <button class="btn btn-submit" onclick="submitAnswer()">Submit</button>
    </div>
  `;

  const feedback = document.getElementById('feedback');
  feedback.className = 'feedback';
  feedback.textContent = '';

  // Focus on input and allow Enter key submission
  const input = document.getElementById('answerInput');
  input.focus();
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      submitAnswer();
    }
  });
}

// ===== Submit Answer =====
function submitAnswer() {
  const q = questions[currentQuestion];
  const input = document.getElementById('answerInput');
  const userAnswer = input.value.trim().toLowerCase();
  const feedback = document.getElementById('feedback');
  const submitBtn = document.querySelector('.btn-submit');

  if (userAnswer === q.answer.toLowerCase()) {
    // Correct answer - disable input and proceed to meme
    input.disabled = true;
    submitBtn.disabled = true;
    submitBtn.classList.add('disabled');
    
    score++;

    // Show meme immediately
    setTimeout(() => {
      showMeme(q.meme);
    }, 300);
  } else {
    // Incorrect answer - show feedback and allow retry
    feedback.className = 'feedback';
    feedback.textContent = '';
    
    // Small delay to allow the class change to settle, then add back the show class
    setTimeout(() => {
      feedback.textContent = `Not quite! Try again 😉`;
      feedback.className = 'feedback show wrong-feedback';
    }, 10);
  }
}

// ===== Show Meme =====
function showMeme(meme) {
  const frame = document.getElementById('memeFrame');
  
  // Display image if available, otherwise fall back to emoji/text
  if (meme.image) {
    frame.innerHTML = `<img src="${meme.image}" alt="Meme" />`;
  } else {
    frame.innerHTML = `
      <div class="meme-text-display">
        <span class="meme-emoji">${meme.emoji}</span>
        <div class="meme-caption">${meme.caption}</div>
        <div class="meme-subcaption">${meme.subcaption}</div>
      </div>
    `;
  }

  const title = document.getElementById('memeTitle');
  title.textContent = "You got it! 🎉";

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
