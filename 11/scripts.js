// get elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// build functions
const togglePlay = () => {
  video[video.paused ? 'play' : 'pause']();
};

const updateButton = () => {
  toggle.textContent = video.paused ? '►' : '❚❚';
};

const skip = ({ dataset }) => {
  video.currentTime += parseFloat(dataset.skip);
};

const handleRangeUpdate = ({ name, value }) => {
  video[name] = value;
};

const handleProgress = () => {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
  console.log();
};

const scrub = (e) => {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
  console.log(scrubTime);
};

const handleFullScreen = () => {
  video.requestFullscreen();
};

// hook event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('progress', handleProgress);
video.addEventListener('dblclick', handleFullScreen);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach((btn) => btn.addEventListener('click', () => skip(btn)));

ranges.forEach((btn) => btn.addEventListener('change', () => handleRangeUpdate(btn)));

ranges.forEach((btn) => btn.addEventListener('mousemove', () => handleRangeUpdate(btn)));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mousedown', () => (mousedown = false));
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
