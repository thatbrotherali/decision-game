// ==========================
// CONFIG & CONSTANTS
// ==========================
const API_BASE = '/_functions/decisionGame';

const modes = ['practice', 'short', 'long', 'infinite'];
let currentModeIndex = 0; // start in practice

const leaderboardModes = ['short', 'long', 'infinite'];
let currentLeaderboardIndex = 0; // start with short

// All game items: key, label, image URL
const ITEMS = [
  {
    key: 'ball',
    label: 'BALL',
    image: 'https://static.wixstatic.com/media/eaef6d_7f2b9555f08e4407bcf27857bf332d3c~mv2.png'
  },
  {
    key: 'umbrella',
    label: 'UMBRELLA',
    image: 'https://static.wixstatic.com/media/eaef6d_a783bbb23e2f4960a84c5946322bd1d1~mv2.png'
  },
  {
    key: 'pig',
    label: 'PIG',
    image: 'https://static.wixstatic.com/media/eaef6d_12d8e64c3bbb45749e7d2328b1ea3329~mv2.png'
  },
  {
    key: 'butterfly',
    label: 'BUTTERFLY',
    image: 'https://static.wixstatic.com/media/eaef6d_87217c52f3b44756834c0cc47ddb62fc~mv2.png'
  },
  {
    key: 'airplane',
    label: 'AIRPLANE',
    image: 'https://static.wixstatic.com/media/eaef6d_fd2e5d6a21154331aad70d6079dce246~mv2.png'
  },
  {
    key: 'car',
    label: 'CAR',
    image: 'https://static.wixstatic.com/media/eaef6d_ce7258f9c42342c49453582be5a69c88~mv2.png'
  },
  {
    key: 'mouse',
    label: 'MOUSE',
    image: 'https://static.wixstatic.com/media/eaef6d_cb46105a23d049808c595598fe7d883f~mv2.png'
  },
  {
    key: 'hat',
    label: 'HAT',
    image: 'https://static.wixstatic.com/media/eaef6d_bb22e0b78d134c88bb6c67d4941ece27~mv2.png'
  },
  {
    key: 'house',
    label: 'HOUSE',
    image: 'https://static.wixstatic.com/media/eaef6d_6ece4136d1ec4dc8bf3f51c8e244766b~mv2.png'
  },
  {
    key: 'cow',
    label: 'COW',
    image: 'https://static.wixstatic.com/media/eaef6d_df0c98fc5b28458db695aa5cb3d414a8~mv2.png'
  },
  {
    key: 'bus',
    label: 'BUS',
    image: 'https://static.wixstatic.com/media/eaef6d_64f8949a66c14145948d1cb0db7e7224~mv2.png'
  },
  {
    key: 'tree',
    label: 'TREE',
    image: 'https://static.wixstatic.com/media/eaef6d_0fd2bc64878e41a299cc22c3f0a35abf~mv2.png'
  },
  {
    key: 'flower',
    label: 'FLOWER',
    image: 'https://static.wixstatic.com/media/eaef6d_8cf53ea56de040f2b2ceecfe2a2619b4~mv2.png'
  },
  {
    key: 'bee',
    label: 'BEE',
    image: 'https://static.wixstatic.com/media/eaef6d_8f18d62b58914a7085530ea3d3183901~mv2.png'
  },
  {
    key: 'cup',
    label: 'CUP',
    image: 'https://static.wixstatic.com/media/eaef6d_633ee54b4fd9427bb9ef5a3d2e027fe3~mv2.png'
  },
  {
    key: 'ballerina',
    label: 'BALLERINA',
    image: 'https://static.wixstatic.com/media/eaef6d_2a8b7bce57d24700b5bd133da2da1dd1~mv2.png'
  },
  {
    key: 'chair',
    label: 'CHAIR',
    image: 'https://static.wixstatic.com/media/eaef6d_3b4a0f88dd6d4ba485ed22d103eabf2a~mv2.png'
  },
  {
    key: 'book',
    label: 'BOOK',
    image: 'https://static.wixstatic.com/media/eaef6d_f0408751e9a640d88066b46722a8ea91~mv2.png'
  },
  {
    key: 'bird',
    label: 'BIRD',
    image: 'https://static.wixstatic.com/media/eaef6d_653bf4fd82f94aff94796803666e80de~mv2.png'
  },
  {
    key: 'cherry',
    label: 'CHERRY',
    image: 'https://static.wixstatic.com/media/eaef6d_97c92754a41d489eb0bb984377487207~mv2.png'
  }
];

// ==========================
// DOM ELEMENTS
// ==========================
const initialsInput = document.getElementById('initialsInput');
const modeButton = document.getElementById('modeButton');
const startStopButton = document.getElementById('startStopButton');
const leaderboardModeButton = document.getElementById('leaderboardModeButton');

const pictureImage = document.getElementById('pictureImage');
const relationText = document.getElementById('relationText');
const wordText = document.getElementById('wordText');

const trueButton = document.getElementById('trueButton');
const falseButton = document.getElementById('falseButton');

const infoMode = document.getElementById('infoMode');
const infoQuestion = document.getElementById('infoQuestion');
const infoCorrect = document.getElementById('infoCorrect');
const infoWrong = document.getElementById('infoWrong');
const infoTotalTime = document.getElementById('infoTotalTime');
const infoAvgReaction = document.getElementById('infoAvgReaction');
const infoTimeLimit = document.getElementById('infoTimeLimit');
const infoCountdown = document.getElementById('infoCountdown');

const leaderboardModeLabel = document.getElementById('leaderboardModeLabel');
const leaderboardBody = document.getElementById('leaderboardBody');
const errorMessage = document.getElementById('errorMessage');

const instructionsModal = document.getElementById('instructionsModal');
const closeInstructionsButton = document.getElementById('closeInstructionsButton');

// ==========================
// GAME STATE
// ==========================
let runActive = false;
let runStartTime = null;
let currentQuestionStartTime = null;
let questionLimit = Infinity;

let questionsAnswered = 0;
let correctCount = 0;
let wrongCount = 0;
let sumReactionMs = 0;

let infiniteTimeLimitSec = null;
let currentTimeoutId = null;

let currentStatementIsTrue = null; // boolean
let lastPictureKey = null;
let lastWordKey = null;
let lastRelations = []; // keep last 2 strings: 'is' or 'is not'

// Used to decide saving logic
let lastEndReason = null; // 'completed' | 'fail' | 'userStop'

// ==========================
// SIMPLE BEEP USING WEB AUDIO
// ==========================
let audioContext = null;

function ensureAudioContext() {
  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      audioContext = null;
    }
  }
}

function playBeep(freq = 440, durationMs = 120, type = 'sine', volume = 0.2) {
  ensureAudioContext();
  if (!audioContext) return;

  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();

  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.value = volume;

  osc.connect(gain);
  gain.connect(audioContext.destination);

  const now = audioContext.currentTime;
  osc.start(now);
  osc.stop(now + durationMs / 1000);
}

// Sounds
function playCorrectSound() {
  playBeep(800, 120, 'sine', 0.25);
}

function playWrongSound() {
  playBeep(200, 180, 'square', 0.25);
}

function playFinishedSound() {
  playBeep(600, 200, 'triangle', 0.25);
}

function playCountdownBeep() {
  playBeep(500, 80, 'sine', 0.2);
}

// ==========================
// HELPERS
// ==========================
function setButtonsEnabled(enabled) {
  trueButton.disabled = !enabled;
  falseButton.disabled = !enabled;
}

function getCurrentMode() {
  return modes[currentModeIndex];
}

function getCurrentLeaderboardMode() {
  return leaderboardModes[currentLeaderboardIndex];
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function formatSeconds(ms) {
  const sec = ms / 1000;
  return sec.toFixed(3);
}

// Planned questions by mode
function plannedQuestionsForMode(mode) {
  if (mode === 'short') return 10;
  if (mode === 'long') return 20;
  if (mode === 'infinite') return Infinity;
  return Infinity; // practice
}

// ==========================
// QUESTION GENERATION
// ==========================
function generateQuestion() {
  // Choose picture not equal to last
  let picture;
  do {
    picture = randomItem(ITEMS);
  } while (picture.key === lastPictureKey);
  lastPictureKey = picture.key;

  // Decide if the underlying match is true or false
  const isMatch = Math.random() < 0.5;

  // Choose word
  let word;
  if (isMatch) {
    word = picture;
  } else {
    do {
      word = randomItem(ITEMS);
    } while (word.key === picture.key || word.key === lastWordKey);
  }
  lastWordKey = word.key;

  // Decide relation text 'is' or 'is not', with no more than two repeats in a row
  let relation = Math.random() < 0.5 ? 'is' : 'is not';
  if (
    lastRelations.length >= 2 &&
    lastRelations[lastRelations.length - 1] === relation &&
    lastRelations[lastRelations.length - 2] === relation
  ) {
    relation = relation === 'is' ? 'is not' : 'is';
  }
  lastRelations.push(relation);
  if (lastRelations.length > 2) lastRelations.shift();

  const isNot = relation === 'is not';
  const statementIsTrue = (isMatch && !isNot) || (!isMatch && isNot);

  // Update DOM
  pictureImage.src = picture.image;
  pictureImage.alt = picture.label;
  wordText.textContent = word.label;

  relationText.textContent = isNot ? 'IS NOT' : 'IS';
  relationText.classList.remove('relation-is', 'relation-not');
  relationText.classList.add(isNot ? 'relation-not' : 'relation-is');

  currentStatementIsTrue = statementIsTrue;
  currentQuestionStartTime = Date.now();
  setupQuestionTimer();
}

function setupQuestionTimer() {
  clearTimeout(currentTimeoutId);
  const mode = getCurrentMode();

  if (mode === 'infinite') {
    const stepCount = Math.floor(questionsAnswered / 50);
    const base = 1.0 - stepCount * 0.1;
    infiniteTimeLimitSec = Math.max(base, 0.3);
    infoTimeLimit.textContent = infiniteTimeLimitSec.toFixed(1) + 's';

    currentTimeoutId = setTimeout(() => {
      // timeout = fail
      handleTimeout();
    }, infiniteTimeLimitSec * 1000);
  } else {
    infiniteTimeLimitSec = null;
    infoTimeLimit.textContent = '-';
  }
}

function handleTimeout() {
  if (!runActive || getCurrentMode() !== 'infinite') return;

  questionsAnswered++;
  wrongCount++;

  const now = Date.now();
  const reactionMs = now - currentQuestionStartTime;
  sumReactionMs += reactionMs;

  updateInfoPanel();
  playWrongSound();
  endRun('fail');
}

// ==========================
// RUN CONTROL
// ==========================
function resetRunState() {
  runActive = false;
  runStartTime = null;
  currentQuestionStartTime = null;
  questionLimit = Infinity;
  questionsAnswered = 0;
  correctCount = 0;
  wrongCount = 0;
  sumReactionMs = 0;
  infiniteTimeLimitSec = null;
  lastEndReason = null;
  clearTimeout(currentTimeoutId);

  infoQuestion.textContent = '0';
  infoCorrect.textContent = '0';
  infoWrong.textContent = '0';
  infoTotalTime.textContent = '0.000';
  infoAvgReaction.textContent = '0.000';
  infoTimeLimit.textContent = '-';
  infoCountdown.textContent = '-';
}

function startRun() {
  const mode = getCurrentMode();
  const initials = (initialsInput.value || '').trim();

  // Require initials for non-practice modes (to avoid ??? on leaderboard)
  if (mode !== 'practice' && initials.length === 0) {
    showError('Please enter your initials before starting this mode.');
    return;
  }

  clearError();
  resetRunState();
  runActive = true;
  questionLimit = plannedQuestionsForMode(mode);
  infoMode.textContent = mode;
  modeButton.disabled = true;
  leaderboardModeButton.disabled = true;
  startStopButton.textContent = 'Stop';
  setButtonsEnabled(false); // disabled during countdown

  // 3-2-1 countdown
  let count = 3;
  infoCountdown.textContent = count.toString();
  playCountdownBeep();

  const countdownInterval = setInterval(() => {
    if (!runActive) {
      clearInterval(countdownInterval);
      infoCountdown.textContent = '-';
      return;
    }

    count--;
    if (count > 0) {
      infoCountdown.textContent = count.toString();
      playCountdownBeep();
    } else {
      clearInterval(countdownInterval);
      infoCountdown.textContent = 'GO';
      playCountdownBeep();
      runStartTime = Date.now();
      setButtonsEnabled(true);
      nextQuestion();
      setTimeout(() => {
        if (infoCountdown.textContent === 'GO') {
          infoCountdown.textContent = '-';
        }
      }, 500);
    }
  }, 1000);
}

function stopRunByUser() {
  if (!runActive) return;
  lastEndReason = 'userStop';
  endRun('userStop');
}

function nextQuestion() {
  const mode = getCurrentMode();
  if (!runActive) return;

  if ((mode === 'short' || mode === 'long') && questionsAnswered >= questionLimit) {
    endRun('completed');
    return;
  }

  generateQuestion();
  updateInfoPanel();
}

function updateInfoPanel() {
  infoQuestion.textContent = questionsAnswered.toString();
  infoCorrect.textContent = correctCount.toString();
  infoWrong.textContent = wrongCount.toString();

  if (runStartTime && questionsAnswered > 0) {
    const now = Date.now();
    const totalTimeMs = now - runStartTime;
    infoTotalTime.textContent = formatSeconds(totalTimeMs);
    const avg = sumReactionMs / questionsAnswered;
    infoAvgReaction.textContent = formatSeconds(avg);
  }
}

// ==========================
// ANSWER HANDLING
// ==========================
function handleAnswer(userThinksTrue) {
  if (!runActive || currentQuestionStartTime == null) return;

  const mode = getCurrentMode();
  const now = Date.now();
  const reactionMs = now - currentQuestionStartTime;

  questionsAnswered++;
  sumReactionMs += reactionMs;

  const isCorrect = (userThinksTrue === currentStatementIsTrue);
  if (isCorrect) {
    correctCount++;
    playCorrectSound();
  } else {
    wrongCount++;
    playWrongSound();
  }

  clearTimeout(currentTimeoutId);
  updateInfoPanel();

  if (mode === 'infinite') {
    // infinite mode ends on first mistake
    if (!isCorrect) {
      endRun('fail');
    } else {
      nextQuestion();
    }
    return;
  }

  // short / long / practice
  if (mode === 'short' || mode === 'long') {
    if (questionsAnswered >= questionLimit) {
      endRun('completed');
    } else {
      nextQuestion();
    }
  } else {
    // practice: always continue
    nextQuestion();
  }
}

// ==========================
// RUN END & SCORE SAVING
// ==========================
function endRun(reason) {
  if (!runActive) return;
  runActive = false;
  lastEndReason = reason;
  clearTimeout(currentTimeoutId);
  setButtonsEnabled(false);
  modeButton.disabled = false;
  leaderboardModeButton.disabled = false;
  startStopButton.textContent = 'Start';
  infoCountdown.textContent = '-';

  if (!runStartTime || questionsAnswered === 0) {
    // nothing meaningful happened
    return;
  }

  const totalTimeMs = Date.now() - runStartTime;
  const avgReactionMs = sumReactionMs / questionsAnswered;
  infoTotalTime.textContent = formatSeconds(totalTimeMs);
  infoAvgReaction.textContent = formatSeconds(avgReactionMs);

  const mode = getCurrentMode();
  const initials = (initialsInput.value || '').trim().toUpperCase().slice(0, 3);

  // Play finished sound for completed or fail (but not userStop)
  if (reason === 'completed' || reason === 'fail') {
    playFinishedSound();
  }

  // Decide whether to save
  if (mode === 'practice') {
    return; // never save practice
  }

  if (mode === 'short' || mode === 'long') {
    const needed = plannedQuestionsForMode(mode);
    // Only save if fully completed, not user stop
    if (reason !== 'completed' || questionsAnswered < needed) {
      return;
    }
  }

  if (mode === 'infinite') {
    // Only save if ended by fail (mistake/timeout), not manual stop
    if (reason !== 'fail') {
      return;
    }
  }

  if (!initials || initials.length === 0) {
    return; // no initials, no save
  }

  saveScoreToServer({
    initials,
    mode,
    correct: correctCount,
    questions: questionsAnswered,
    totalTime: Math.round(totalTimeMs),
    avgReaction: Math.round(avgReactionMs)
  });
}

function saveScoreToServer(score) {
  clearError();
  fetch(`${API_BASE}/saveScore`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(score)
  })
    .then(res => res.json().catch(() => ({})))
    .then(() => {
      // Refresh leaderboard for current leaderboard mode
      fetchLeaderboard(getCurrentLeaderboardMode());
    })
    .catch(err => {
      console.error('Error saving score:', err);
      showError('Could not save score (network or server issue).');
    });
}

// ==========================
// LEADERBOARD
// ==========================
function fetchLeaderboard(mode) {
  clearError();
  leaderboardModeLabel.textContent = mode;

  fetch(`${API_BASE}/leaderboard?mode=${encodeURIComponent(mode)}`)
    .then(res => res.json())
    .then(data => {
      const results = data && data.results ? data.results : [];
      renderLeaderboard(results);
    })
    .catch(err => {
      console.error('Error fetching leaderboard:', err);
      showError('Could not load leaderboard.');
      renderLeaderboard([]);
    });
}

function renderLeaderboard(results) {
  leaderboardBody.innerHTML = '';

  if (!results || results.length === 0) {
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.colSpan = 7;
    cell.textContent = 'No scores yet.';
    row.appendChild(cell);
    leaderboardBody.appendChild(row);
    return;
  }

  results.forEach(item => {
    const row = document.createElement('tr');

    const mistakes = item.questions - item.correct;

    const tdRank = document.createElement('td');
    tdRank.textContent = item.rank;

    const tdInitials = document.createElement('td');
    tdInitials.textContent = item.initials;

    const tdCorrect = document.createElement('td');
    tdCorrect.textContent = item.correct;

    const tdQuestions = document.createElement('td');
    tdQuestions.textContent = item.questions;

    const tdMistakes = document.createElement('td');
    tdMistakes.textContent = mistakes;

    const tdTotalTime = document.createElement('td');
    tdTotalTime.textContent = (item.totalTime / 1000).toFixed(3);

    const tdAvg = document.createElement('td');
    tdAvg.textContent = (item.avgReaction / 1000).toFixed(3);

    row.appendChild(tdRank);
    row.appendChild(tdInitials);
    row.appendChild(tdCorrect);
    row.appendChild(tdQuestions);
    row.appendChild(tdMistakes);
    row.appendChild(tdTotalTime);
    row.appendChild(tdAvg);

    leaderboardBody.appendChild(row);
  });
}

// ==========================
// ERROR DISPLAY
// ==========================
function showError(msg) {
  errorMessage.textContent = msg;
}

function clearError() {
  errorMessage.textContent = '';
}

// ==========================
// INITIAL SETUP
// ==========================
function showRandomIdleCard() {
  const item = randomItem(ITEMS);
  pictureImage.src = item.image;
  pictureImage.alt = item.label;
  wordText.textContent = item.label;
  relationText.textContent = 'IS';
  relationText.classList.remove('relation-not');
  relationText.classList.add('relation-is');
}

function init() {
  // Initial mode labels
  const mode = getCurrentMode();
  infoMode.textContent = mode;
  modeButton.textContent = 'Mode: ' + capitalize(mode);

  const lbMode = getCurrentLeaderboardMode();
  leaderboardModeLabel.textContent = lbMode;
  leaderboardModeButton.textContent = 'Leaderboard: ' + capitalize(lbMode);

  setButtonsEnabled(false);
  showRandomIdleCard();
  fetchLeaderboard(lbMode);

  // Show instructions modal once
  instructionsModal.style.display = 'flex';

  // Restore initials from localStorage if present
  const storedInitials = localStorage.getItem('decisionGameInitials');
  if (storedInitials) {
    initialsInput.value = storedInitials;
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ==========================
// EVENT LISTENERS
// ==========================
modeButton.addEventListener('click', () => {
  if (runActive) return;
  currentModeIndex = (currentModeIndex + 1) % modes.length;
  const mode = getCurrentMode();
  modeButton.textContent = 'Mode: ' + capitalize(mode);
  infoMode.textContent = mode;
});

leaderboardModeButton.addEventListener('click', () => {
  currentLeaderboardIndex = (currentLeaderboardIndex + 1) % leaderboardModes.length;
  const lbMode = getCurrentLeaderboardMode();
  leaderboardModeButton.textContent = 'Leaderboard: ' + capitalize(lbMode);
  fetchLeaderboard(lbMode);
});

startStopButton.addEventListener('click', () => {
  if (!runActive) {
    startRun();
  } else {
    stopRunByUser();
  }
});

trueButton.addEventListener('click', () => {
  handleAnswer(true);
});

falseButton.addEventListener('click', () => {
  handleAnswer(false);
});

// Save initials
initialsInput.addEventListener('change', () => {
  const value = (initialsInput.value || '').trim().toUpperCase().slice(0, 3);
  initialsInput.value = value;
  if (value) {
    localStorage.setItem('decisionGameInitials', value);
  }
});

// Close instructions
closeInstructionsButton.addEventListener('click', () => {
  instructionsModal.style.display = 'none';
});

// Start once DOM is loaded
document.addEventListener('DOMContentLoaded', init);
