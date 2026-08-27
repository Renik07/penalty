'use strict';

// decisionTime — секунда остановки перед ударом; result — 'goal' или 'miss'.
const PENALTIES = [
  { id: 'penalty-1', src: 'video/penalty-1.mp4', decisionTime: 5, result: 'goal' },
  { id: 'penalty-2', src: 'video/penalty-2.mp4', decisionTime: 5, result: 'miss' },
  { id: 'penalty-3', src: 'video/penalty-3.mp4', decisionTime: 5, result: 'goal' },
  { id: 'penalty-4', src: 'video/penalty-4.mp4', decisionTime: 5, result: 'miss' },
  { id: 'penalty-5', src: 'video/penalty-5.mp4', decisionTime: 5, result: 'goal' },
];

const GOAL_KEYS = new Set(['Digit1', 'Numpad1', 'ArrowLeft', 'KeyA']);
const MISS_KEYS = new Set(['Digit2', 'Numpad2', 'ArrowRight', 'KeyB']);

const elements = {
  screens: [...document.querySelectorAll('body > main')],
  start: document.querySelector('#start-screen'),
  game: document.querySelector('#game-screen'),
  final: document.querySelector('#final-screen'),
  startButton: document.querySelector('#start-button'),
  gameVideo: document.querySelector('#game-video'),
  loadingOverlay: document.querySelector('#loading-overlay'),
  playbackOverlay: document.querySelector('#playback-overlay'),
  predictionOverlay: document.querySelector('#prediction-overlay'),
  resultOverlay: document.querySelector('#round-result-overlay'),
  playVideoButton: document.querySelector('#play-video-button'),
  goalButton: document.querySelector('#goal-button'),
  missButton: document.querySelector('#miss-button'),
  restartButton: document.querySelector('#restart-button'),
  homeButton: document.querySelector('#home-button'),
  roundNumber: document.querySelector('#round-number'),
  liveScore: document.querySelector('#live-score'),
  progress: document.querySelector('#progress-row'),
  actualResult: document.querySelector('#actual-result'),
  roundResultTitle: document.querySelector('#round-result-title'),
  roundResultCopy: document.querySelector('#round-result-copy'),
  resultCountdown: document.querySelector('#result-countdown'),
  finalScore: document.querySelector('#final-score'),
  finalTitle: document.querySelector('#final-title'),
  finalCopy: document.querySelector('#final-copy'),
  resultDots: document.querySelector('#result-dots'),
};

const state = {
  phase: 'intro',
  rounds: [],
  roundIndex: 0,
  selectedAnswer: null,
  answers: [],
  pausedAtDecision: false,
  frameHandle: null,
  timerHandle: null,
  resultTimeout: null,
  countdownInterval: null,
  gamepadButtons: [],
};

function showScreen(screen) {
  elements.screens.forEach((item) => item.classList.toggle('hidden', item !== screen));
}

function show(element, visible) {
  element.classList.toggle('hidden', !visible);
}

function shuffle(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function label(answer) {
  return answer === 'goal' ? 'Гол' : 'Мимо';
}

function correctCount() {
  return state.answers.filter((answer) => answer.correct).length;
}

function clearFrameWatcher() {
  if (state.frameHandle !== null && 'cancelVideoFrameCallback' in elements.gameVideo) {
    elements.gameVideo.cancelVideoFrameCallback(state.frameHandle);
  }
  if (state.timerHandle !== null) window.clearInterval(state.timerHandle);
  state.frameHandle = null;
  state.timerHandle = null;
}

function clearResultTimer() {
  if (state.resultTimeout !== null) window.clearTimeout(state.resultTimeout);
  if (state.countdownInterval !== null) window.clearInterval(state.countdownInterval);
  state.resultTimeout = null;
  state.countdownInterval = null;
}

function reachDecisionPoint() {
  if (state.phase !== 'playing' || state.pausedAtDecision) return;
  state.pausedAtDecision = true;
  state.phase = 'predicting';
  elements.gameVideo.pause();
  show(elements.predictionOverlay, true);
  elements.goalButton.focus();
  clearFrameWatcher();
}

function watchDecisionPoint() {
  clearFrameWatcher();
  const checkTime = () => {
    const current = state.rounds[state.roundIndex];
    if (state.phase === 'playing' && elements.gameVideo.currentTime >= current.decisionTime) {
      reachDecisionPoint();
      return true;
    }
    return false;
  };

  if ('requestVideoFrameCallback' in elements.gameVideo) {
    const checkFrame = () => {
      if (!checkTime() && state.phase === 'playing') {
        state.frameHandle = elements.gameVideo.requestVideoFrameCallback(checkFrame);
      }
    };
    state.frameHandle = elements.gameVideo.requestVideoFrameCallback(checkFrame);
  } else {
    state.timerHandle = window.setInterval(checkTime, 40);
  }
}

async function playGameVideo() {
  try {
    await elements.gameVideo.play();
    show(elements.playbackOverlay, false);
  } catch {
    show(elements.playbackOverlay, true);
  }
}

function renderProgress() {
  elements.progress.replaceChildren();
  state.rounds.forEach((round, index) => {
    const marker = document.createElement('span');
    const answer = state.answers[index];
    marker.className = 'progress-item';
    if (answer) marker.classList.add(answer.correct ? 'correct' : 'wrong');
    else if (index === state.roundIndex) marker.classList.add('current');
    elements.progress.append(marker);
  });
}

function loadRound() {
  clearFrameWatcher();
  clearResultTimer();
  state.phase = 'loading';
  state.selectedAnswer = null;
  state.pausedAtDecision = false;
  elements.roundNumber.textContent = String(state.roundIndex + 1);
  elements.liveScore.textContent = String(correctCount());
  show(elements.loadingOverlay, true);
  show(elements.playbackOverlay, false);
  show(elements.predictionOverlay, false);
  show(elements.resultOverlay, false);
  renderProgress();
  elements.gameVideo.src = state.rounds[state.roundIndex].src;
  elements.gameVideo.load();
}

function beginGame() {
  state.rounds = shuffle(PENALTIES.map((penalty) => ({ ...penalty }))).slice(0, 5);
  state.roundIndex = 0;
  state.answers = [];
  showScreen(elements.game);
  loadRound();
}

function choosePrediction(prediction) {
  if (state.phase !== 'predicting') return;
  state.selectedAnswer = prediction;
  state.phase = 'revealing';
  show(elements.predictionOverlay, false);
  void playGameVideo();
}

function finishRound() {
  if (state.phase !== 'revealing' || !state.selectedAnswer) return;
  const current = state.rounds[state.roundIndex];
  const correct = state.selectedAnswer === current.result;
  const answer = { id: current.id, prediction: state.selectedAnswer, result: current.result, correct };
  state.answers.push(answer);
  state.phase = 'roundResult';
  elements.actualResult.textContent = `Результат удара: ${label(answer.result)}`;
  elements.roundResultTitle.textContent = correct ? 'ТЫ УГАДАЛ!' : 'ТЫ НЕ УГАДАЛ';
  elements.roundResultCopy.textContent = correct ? 'Точное чтение момента.' : `Твой выбор — ${label(answer.prediction).toLowerCase()}.`;
  elements.resultOverlay.classList.toggle('is-correct', correct);
  elements.resultOverlay.classList.toggle('is-wrong', !correct);
  elements.liveScore.textContent = String(correctCount());
  renderProgress();
  show(elements.resultOverlay, true);
  scheduleAutoContinue();
}

function scheduleAutoContinue() {
  clearResultTimer();
  let secondsLeft = 5;
  const isLastRound = state.roundIndex === state.rounds.length - 1;
  const renderCountdown = () => {
    const destination = isLastRound ? 'Итоги' : 'Следующий удар';
    elements.resultCountdown.textContent = `${destination} через ${secondsLeft} сек.`;
  };

  renderCountdown();
  state.countdownInterval = window.setInterval(() => {
    secondsLeft -= 1;
    if (secondsLeft > 0) renderCountdown();
  }, 1000);
  state.resultTimeout = window.setTimeout(continueGame, 5000);
}

function showFinal() {
  clearResultTimer();
  const score = correctCount();
  elements.finalScore.textContent = String(score);
  elements.finalTitle.textContent = score === 5 ? 'Идеальная серия' : score >= 3 ? 'Отличная футбольная интуиция' : 'Реванш уже рядом';
  elements.finalCopy.textContent = `Угадано ${score}, ошибок — ${state.rounds.length - score}.`;
  elements.resultDots.replaceChildren();
  state.answers.forEach((answer) => {
    const dot = document.createElement('span');
    dot.className = `dot ${answer.correct ? 'correct' : 'wrong'}`;
    elements.resultDots.append(dot);
  });
  state.phase = 'final';
  showScreen(elements.final);
}

function continueGame() {
  clearResultTimer();
  if (state.roundIndex === state.rounds.length - 1) {
    showFinal();
    return;
  }
  state.roundIndex += 1;
  loadRound();
}

elements.startButton.addEventListener('click', beginGame);
elements.restartButton.addEventListener('click', beginGame);
elements.homeButton.addEventListener('click', () => showScreen(elements.start));
elements.goalButton.addEventListener('click', () => choosePrediction('goal'));
elements.missButton.addEventListener('click', () => choosePrediction('miss'));
elements.playVideoButton.addEventListener('click', playGameVideo);

elements.gameVideo.addEventListener('loadedmetadata', () => {
  if (state.phase !== 'loading') return;
  const current = state.rounds[state.roundIndex];
  current.decisionTime = Math.min(current.decisionTime, Math.max(0.5, elements.gameVideo.duration - 1.5));
  elements.gameVideo.currentTime = 0;
  state.phase = 'playing';
  show(elements.loadingOverlay, false);
  watchDecisionPoint();
  void playGameVideo();
});

elements.gameVideo.addEventListener('ended', finishRound);

window.addEventListener('keydown', (event) => {
  if (event.repeat || state.phase !== 'predicting') return;
  if (GOAL_KEYS.has(event.code)) {
    event.preventDefault();
    choosePrediction('goal');
  } else if (MISS_KEYS.has(event.code)) {
    event.preventDefault();
    choosePrediction('miss');
  }
});

function pollGamepad() {
  if (state.phase === 'predicting' && navigator.getGamepads) {
    const gamepad = navigator.getGamepads()[0];
    if (gamepad) {
      const pressed = gamepad.buttons.map((button) => button.pressed);
      if (pressed[0] && !state.gamepadButtons[0]) choosePrediction('goal');
      if (pressed[1] && !state.gamepadButtons[1]) choosePrediction('miss');
      state.gamepadButtons = pressed;
    }
  }
  requestAnimationFrame(pollGamepad);
}

requestAnimationFrame(pollGamepad);
