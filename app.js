'use strict';

// decisionTime — секунда остановки перед ударом; result — 'goal' или 'miss'.
const PENALTIES = [
  { id: 'goal-1', src: 'video/goal1 - 1.40.webm', decisionTime: 1.40, result: 'goal' },
  { id: 'goal-2', src: 'video/goal2 - 1.88.webm', decisionTime: 1.88, result: 'goal' },
  { id: 'goal-3', src: 'video/goal3 - 2.56.webm', decisionTime: 2.56, result: 'goal' },
  { id: 'goal-4', src: 'video/goal4 - 1.68.webm', decisionTime: 1.68, result: 'goal' },
  { id: 'goal-5', src: 'video/goal5 - 1.77.webm', decisionTime: 1.77, result: 'goal' },
  { id: 'goal-6', src: 'video/goal6 - 2.44.webm', decisionTime: 2.44, result: 'goal' },
  { id: 'goal-7', src: 'video/goal7 - 3.11.webm', decisionTime: 3.11, result: 'goal' },
  { id: 'goal-8', src: 'video/goal8  -3.45.webm', decisionTime: 3.45, result: 'goal' },
  { id: 'goal-9', src: 'video/goal9 - 2.21.webm', decisionTime: 2.21, result: 'goal' },
  { id: 'goal-10', src: 'video/goal10 - 1.80.webm', decisionTime: 1.80, result: 'goal' },
  { id: 'goal-11', src: 'video/goal11 - 2.19.webm', decisionTime: 2.19, result: 'goal' },
  { id: 'goal-12', src: 'video/goal12 - 2.40.webm', decisionTime: 2.40, result: 'goal' },
  { id: 'goal-13', src: 'video/goal13 - 0.70.webm', decisionTime: 0.70, result: 'goal' },
  { id: 'goal-14', src: 'video/goal14 - 0.42.webm', decisionTime: 0.42, result: 'goal' },
  { id: 'goal-15', src: 'video/goal15 - 3.40.webm', decisionTime: 3.40, result: 'goal' },
  { id: 'goal-16', src: 'video/goal16 - 1.18.webm', decisionTime: 1.18, result: 'goal' },
  { id: 'goal-17', src: 'video/goal17 - 1.75.webm', decisionTime: 1.75, result: 'goal' },
  { id: 'goal-18', src: 'video/goal18 - 1.04.webm', decisionTime: 1.04, result: 'goal' },
  { id: 'goal-19', src: 'video/goal19 - 3.08.webm', decisionTime: 3.08, result: 'goal' },
  { id: 'goal-20', src: 'video/goal20 - 4.3.webm', decisionTime: 4.30, result: 'goal' },
  { id: 'goal-21', src: 'video/goal21 - 2.10.webm', decisionTime: 2.10, result: 'goal' },
  { id: 'goal-22', src: 'video/goal22 - 3.98.webm', decisionTime: 3.98, result: 'goal' },
  { id: 'goal-23', src: 'video/goal23 - 2.80.webm', decisionTime: 2.80, result: 'goal' },
  { id: 'goal-24', src: 'video/goal24 - 2.70.webm', decisionTime: 2.70, result: 'goal' },
  { id: 'goal-25', src: 'video/goal25 - 1.15.webm', decisionTime: 1.15, result: 'goal' },
  { id: 'goal-26', src: 'video/goal26 - 1.14.webm', decisionTime: 1.14, result: 'goal' },
  { id: 'goal-27', src: 'video/goal27 - 6.74.webm', decisionTime: 6.74, result: 'goal' },
  { id: 'goal-28', src: 'video/goal28 - 2.65.webm', decisionTime: 2.65, result: 'goal' },
  { id: 'goal-29', src: 'video/goal29 - 2.88.webm', decisionTime: 2.88, result: 'goal' },
  { id: 'goal-30', src: 'video/goal30 - 3.96.webm', decisionTime: 3.96, result: 'goal' },
  { id: 'goal-31', src: 'video/goal31 - 2.40.webm', decisionTime: 2.40, result: 'goal' },
  { id: 'goal-32', src: 'video/goal32 - 4.41.webm', decisionTime: 4.41, result: 'goal' },
  { id: 'goal-33', src: 'video/goal33 - 4.06.webm', decisionTime: 4.06, result: 'goal' },
  { id: 'goal-34', src: 'video/goal34 - 4.94.webm', decisionTime: 4.94, result: 'goal' },
  { id: 'goal-35', src: 'video/goal35 - 3.88.webm', decisionTime: 3.88, result: 'goal' },
  { id: 'goal-36', src: 'video/goal36 - 2.24.webm', decisionTime: 2.24, result: 'goal' },
  { id: 'goal-37', src: 'video/goal37 - 1.83.webm', decisionTime: 1.83, result: 'goal' },
  { id: 'goal-38', src: 'video/goal38 - 2.70.webm', decisionTime: 2.70, result: 'goal' },
  { id: 'goal-39', src: 'video/goal39 - 3.45.webm', decisionTime: 3.45, result: 'goal' },
  { id: 'goal-40', src: 'video/goal40 - 5.08.webm', decisionTime: 5.08, result: 'goal' },
  { id: 'goal-41', src: 'video/goal41 - 4.15.webm', decisionTime: 4.15, result: 'goal' },
  { id: 'goal-42', src: 'video/goal42 - 1.05.webm', decisionTime: 1.05, result: 'goal' },
  { id: 'goal-43', src: 'video/goal43 - 4.55.webm', decisionTime: 4.55, result: 'goal' },
  { id: 'goal-44', src: 'video/goal44 - 5.96.webm', decisionTime: 5.96, result: 'goal' },
  { id: 'goal-45', src: 'video/goal45 - 3.48.webm', decisionTime: 3.48, result: 'goal' },
  { id: 'goal-46', src: 'video/goal46 - 2.94.webm', decisionTime: 2.94, result: 'goal' },
  { id: 'goal-47', src: 'video/goal47 - 2.81.webm', decisionTime: 2.81, result: 'goal' },
  { id: 'goal-48', src: 'video/goal48 - 9.40.webm', decisionTime: 9.40, result: 'goal' },
  { id: 'goal-49', src: 'video/goal49 - 2.29.webm', decisionTime: 2.29, result: 'goal' },
  { id: 'goal-50', src: 'video/goal50 - 1.66.webm', decisionTime: 1.66, result: 'goal' },
  { id: 'miss-1', src: 'video/no goal 1 - 1.84.webm', decisionTime: 1.84, result: 'miss' },
  { id: 'miss-2', src: 'video/no goal 2 - 2.15.webm', decisionTime: 2.15, result: 'miss' },
  { id: 'miss-3', src: 'video/no goal 3 - 1.59.webm', decisionTime: 1.59, result: 'miss' },
  { id: 'miss-4', src: 'video/no goal 4 - 2.58.webm', decisionTime: 2.58, result: 'miss' },
  { id: 'miss-5', src: 'video/no goal 5 - 1.64.webm', decisionTime: 1.64, result: 'miss' },
  { id: 'miss-6', src: 'video/no goal 6 - 3.00.webm', decisionTime: 3.00, result: 'miss' },
  { id: 'miss-7', src: 'video/no goal 7 - 1.85.webm', decisionTime: 1.85, result: 'miss' },
  { id: 'miss-8', src: 'video/no goal 8 - 0.95.webm', decisionTime: 0.95, result: 'miss' },
  { id: 'miss-9', src: 'video/no goal 9 - 1.65.webm', decisionTime: 1.65, result: 'miss' },
  { id: 'miss-10', src: 'video/no goal 10 - 2.51.webm', decisionTime: 2.51, result: 'miss' },
  { id: 'miss-11', src: 'video/no goal 11 - 1.97.webm', decisionTime: 1.97, result: 'miss' },
  { id: 'miss-12', src: 'video/no goal 12 - 1.02.webm', decisionTime: 1.02, result: 'miss' },
  { id: 'miss-13', src: 'video/no goal 13 - 1.88.webm', decisionTime: 1.88, result: 'miss' },
  { id: 'miss-14', src: 'video/no goal 14 - 0.87.webm', decisionTime: 0.87, result: 'miss' },
  { id: 'miss-15', src: 'video/no goal 15 - 1.50.webm', decisionTime: 1.50, result: 'miss' },
  { id: 'miss-16', src: 'video/no goal 16 - 0.97.webm', decisionTime: 0.97, result: 'miss' },
  { id: 'miss-17', src: 'video/no goal 17 - 2.04.webm', decisionTime: 2.04, result: 'miss' },
  { id: 'miss-18', src: 'video/no goal 18 - 2.49.webm', decisionTime: 2.49, result: 'miss' },
  { id: 'miss-19', src: 'video/no goal 19 - 0.85.webm', decisionTime: 0.85, result: 'miss' },
  { id: 'miss-20', src: 'video/no goal 20 - 0.80.webm', decisionTime: 0.80, result: 'miss' },
  { id: 'miss-21', src: 'video/no goal21 - 2.32.webm', decisionTime: 2.32, result: 'miss' },
  { id: 'miss-22', src: 'video/no goal22 - 2.55.webm', decisionTime: 2.55, result: 'miss' },
  { id: 'miss-23', src: 'video/no goal23 - 4.6.webm', decisionTime: 4.60, result: 'miss' },
  { id: 'miss-24', src: 'video/no goal24 - 2.26.webm', decisionTime: 2.26, result: 'miss' },
  { id: 'miss-25', src: 'video/no goal25 - 2.66.webm', decisionTime: 2.66, result: 'miss' },
  { id: 'miss-26', src: 'video/no goal26 - 2.23.webm', decisionTime: 2.23, result: 'miss' },
  { id: 'miss-27', src: 'video/no goal27 - 1.82.webm', decisionTime: 1.82, result: 'miss' },
  { id: 'miss-28', src: 'video/no goal28 - 1.87.webm', decisionTime: 1.87, result: 'miss' },
  { id: 'miss-29', src: 'video/no goal29 - 3.12.webm', decisionTime: 3.12, result: 'miss' },
  { id: 'miss-30', src: 'video/no goal30 - 1.48.webm', decisionTime: 1.48, result: 'miss' },
  { id: 'miss-31', src: 'video/no goal31 - 0.70.webm', decisionTime: 0.70, result: 'miss' },
  { id: 'miss-32', src: 'video/no goal32 - 1.84.webm', decisionTime: 1.84, result: 'miss' },
  { id: 'miss-33', src: 'video/no goal33 - 2.30.webm', decisionTime: 2.30, result: 'miss' },
  { id: 'miss-34', src: 'video/no goal34 - 2.12.webm', decisionTime: 2.12, result: 'miss' },
  { id: 'miss-35', src: 'video/no goal35 - 2.16.webm', decisionTime: 2.16, result: 'miss' },
  { id: 'miss-36', src: 'video/no goal36 - 2.17.webm', decisionTime: 2.17, result: 'miss' },
  { id: 'miss-37', src: 'video/no goal37 - 1.51.webm', decisionTime: 1.51, result: 'miss' },
  { id: 'miss-38', src: 'video/no goal38 - 0.95.webm', decisionTime: 0.95, result: 'miss' },
  { id: 'miss-39', src: 'video/no goal39 - 3.6.webm', decisionTime: 3.60, result: 'miss' },
  { id: 'miss-40', src: 'video/no goal40 - 2.37.webm', decisionTime: 2.37, result: 'miss' },
  { id: 'miss-41', src: 'video/no goal41 - 1.34.webm', decisionTime: 1.34, result: 'miss' },
  { id: 'miss-42', src: 'video/no goal42 - 1.02.webm', decisionTime: 1.02, result: 'miss' },
  { id: 'miss-43', src: 'video/no goal43 - 6.75.webm', decisionTime: 6.75, result: 'miss' },
  { id: 'miss-44', src: 'video/no goal44 - 4.38.webm', decisionTime: 4.38, result: 'miss' },
  { id: 'miss-45', src: 'video/no goal45 - 0.68.webm', decisionTime: 0.68, result: 'miss' },
  { id: 'miss-46', src: 'video/no goal46 - 1.8.webm', decisionTime: 1.80, result: 'miss' },
  { id: 'miss-47', src: 'video/no goal47 - 1.59.webm', decisionTime: 1.59, result: 'miss' },
  { id: 'miss-48', src: 'video/no goal48 - 5.45.webm', decisionTime: 5.45, result: 'miss' },
  { id: 'miss-49', src: 'video/no goal49 - 6.93.webm', decisionTime: 6.93, result: 'miss' },
  { id: 'miss-50', src: 'video/no goal50 - 2.39.webm', decisionTime: 2.39, result: 'miss' },
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
  videoName: document.querySelector('#video-name'),
  predictionVideo: document.querySelector('#prediction-video'),
  resultVideo: document.querySelector('#result-video'),
  loadingOverlay: document.querySelector('#loading-overlay'),
  playbackOverlay: document.querySelector('#playback-overlay'),
  predictionOverlay: document.querySelector('#prediction-overlay'),
  resultOverlay: document.querySelector('#round-result-overlay'),
  playVideoButton: document.querySelector('#play-video-button'),
  goalButton: document.querySelector('#goal-button'),
  missButton: document.querySelector('#miss-button'),
  homeButton: document.querySelector('#home-button'),
  roundNumber: document.querySelector('#round-number'),
  liveScore: document.querySelector('#live-score'),
  progress: document.querySelector('#progress-row'),
  roundResultTitle: document.querySelector('#round-result-title'),
  finalScore: document.querySelector('#final-score'),
  finalTitle: document.querySelector('#final-title'),
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
  choiceTimeout: null,
  gamepadButtons: [],
};

const videoCache = new Map();

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

function clearVideoCache() {
  const cachedSources = [...videoCache.values()];
  videoCache.clear();
  cachedSources.forEach((sourcePromise) => {
    sourcePromise.then((source) => {
      if (source.startsWith('blob:')) URL.revokeObjectURL(source);
    });
  });
}

function preloadVideo(penalty) {
  if (!penalty) return Promise.resolve(null);
  if (videoCache.has(penalty.src)) return videoCache.get(penalty.src);

  const sourcePromise = fetch(penalty.src)
    .then((response) => {
      if (!response.ok) throw new Error(`Video request failed: ${response.status}`);
      return response.blob();
    })
    .then((blob) => URL.createObjectURL(blob))
    .catch(() => penalty.src);

  videoCache.set(penalty.src, sourcePromise);
  return sourcePromise;
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
  state.resultTimeout = null;
}

function clearChoiceFeedback() {
  if (state.choiceTimeout !== null) window.clearTimeout(state.choiceTimeout);
  state.choiceTimeout = null;
  elements.goalButton.classList.remove('is-selected');
  elements.missButton.classList.remove('is-selected');
}

function reachDecisionPoint() {
  if (state.phase !== 'playing' || state.pausedAtDecision) return;
  state.pausedAtDecision = true;
  state.phase = 'predicting';
  elements.gameVideo.pause();
  show(elements.videoName, false);
  show(elements.predictionOverlay, true);
  elements.predictionVideo.currentTime = 0;
  void elements.predictionVideo.play().catch(() => {});
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
    show(elements.videoName, true);
    show(elements.playbackOverlay, false);
  } catch {
    show(elements.videoName, false);
    show(elements.playbackOverlay, true);
  }
}

function renderProgress() {
  if (!elements.progress) return;
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

async function loadRound() {
  clearFrameWatcher();
  clearResultTimer();
  clearChoiceFeedback();
  state.phase = 'loading';
  state.selectedAnswer = null;
  state.pausedAtDecision = false;
  if (elements.roundNumber) elements.roundNumber.textContent = String(state.roundIndex + 1);
  if (elements.liveScore) elements.liveScore.textContent = String(correctCount());
  show(elements.loadingOverlay, true);
  show(elements.videoName, false);
  show(elements.playbackOverlay, false);
  show(elements.predictionOverlay, false);
  elements.predictionVideo.pause();
  show(elements.resultOverlay, false);
  elements.resultVideo.pause();
  renderProgress();

  const roundIndex = state.roundIndex;
  const current = state.rounds[roundIndex];
  elements.videoName.textContent = current.src.replace(/^video\//, '');
  const source = await preloadVideo(current);
  if (roundIndex !== state.roundIndex || state.phase !== 'loading') return;

  elements.gameVideo.src = source;
  elements.gameVideo.load();
}

function beginGame() {
  clearVideoCache();
  state.rounds = shuffle(PENALTIES.map((penalty) => ({ ...penalty }))).slice(0, 5);
  state.roundIndex = 0;
  state.answers = [];
  showScreen(elements.game);
  loadRound();
}

function startGameWithFeedback() {
  const startScreenIsVisible = !elements.start.classList.contains('hidden');
  if (!startScreenIsVisible || state.phase === 'starting') return;

  state.phase = 'starting';
  elements.startButton.classList.add('is-selected');
  window.setTimeout(() => {
    elements.startButton.classList.remove('is-selected');
    beginGame();
  }, 500);
}

function returnToStart() {
  state.phase = 'intro';
  showScreen(elements.start);
}

function returnToStartWithFeedback() {
  const finalScreenIsVisible = !elements.final.classList.contains('hidden');
  if (!finalScreenIsVisible || state.phase === 'returning') return;

  state.phase = 'returning';
  elements.homeButton.classList.add('is-selected');
  window.setTimeout(() => {
    elements.homeButton.classList.remove('is-selected');
    returnToStart();
  }, 500);
}

function choosePrediction(prediction) {
  if (state.phase !== 'predicting') return;
  state.selectedAnswer = prediction;
  state.phase = 'selecting';

  const selectedButton = prediction === 'goal' ? elements.goalButton : elements.missButton;
  selectedButton.classList.add('is-selected');

  state.choiceTimeout = window.setTimeout(() => {
    state.choiceTimeout = null;
    selectedButton.classList.remove('is-selected');
    if (state.phase !== 'selecting') return;
    state.phase = 'revealing';
    elements.predictionVideo.pause();
    show(elements.predictionOverlay, false);
    void playGameVideo();
  }, 550);
}

function finishRound() {
  if (state.phase !== 'revealing' || !state.selectedAnswer) return;
  const current = state.rounds[state.roundIndex];
  const correct = state.selectedAnswer === current.result;
  const answer = { id: current.id, prediction: state.selectedAnswer, result: current.result, correct };
  state.answers.push(answer);
  state.phase = 'roundResult';
  show(elements.videoName, false);
  elements.roundResultTitle.textContent = correct ? 'ТЫ УГАДАЛ!' : 'ТЫ НЕ УГАДАЛ';
  elements.resultOverlay.classList.toggle('is-correct', correct);
  elements.resultOverlay.classList.toggle('is-wrong', !correct);
  if (elements.liveScore) elements.liveScore.textContent = String(correctCount());
  renderProgress();
  show(elements.resultOverlay, true);
  elements.resultVideo.currentTime = 0;
  void elements.resultVideo.play().catch(() => {});
  scheduleAutoContinue();
}

function scheduleAutoContinue() {
  clearResultTimer();
  state.resultTimeout = window.setTimeout(continueGame, 5000);
}

function showFinal() {
  clearResultTimer();
  elements.resultVideo.pause();
  const score = correctCount();
  if (elements.finalScore) elements.finalScore.textContent = String(score);
  if (elements.finalTitle) elements.finalTitle.textContent = score === 5 ? 'Отлично' : score >= 3 ? 'Неплохо' : 'Плохо';
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

elements.startButton.addEventListener('click', startGameWithFeedback);
elements.homeButton.addEventListener('click', returnToStartWithFeedback);
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
  void preloadVideo(state.rounds[state.roundIndex + 1]);
});

elements.gameVideo.addEventListener('ended', finishRound);

window.addEventListener('keydown', (event) => {
  if (event.repeat) return;

  const startScreenIsVisible = !elements.start.classList.contains('hidden');
  if (startScreenIsVisible && (event.code === 'Enter' || event.code === 'Space')) {
    event.preventDefault();
    startGameWithFeedback();
    return;
  }

  const finalScreenIsVisible = !elements.final.classList.contains('hidden');
  if (finalScreenIsVisible && (event.code === 'Enter' || event.code === 'Space')) {
    event.preventDefault();
    returnToStartWithFeedback();
    return;
  }

  if (state.phase !== 'predicting') return;
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
