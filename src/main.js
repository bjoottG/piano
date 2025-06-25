import './style.css'

const notes = [
  { note: 'C', key: 'A', freq: 261.63 },
  { note: 'D', key: 'S', freq: 293.66 },
  { note: 'E', key: 'D', freq: 329.63 },
  { note: 'F', key: 'F', freq: 349.23 },
  { note: 'G', key: 'G', freq: 392.00 },
  { note: 'A', key: 'H', freq: 440.00 },
  { note: 'B', key: 'J', freq: 493.88 },
  { note: 'C2', key: 'K', freq: 523.25 }
];

const piano = document.getElementById('piano');
piano.innerHTML = notes.map(n => `
  <button class="piano-key" data-freq="${n.freq}" title="${n.note} (${n.key})">${n.note}<br><span>${n.key}</span></button>
`).join('');

function playTone(freq) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.value = freq;
  osc.connect(ctx.destination);
  osc.start();
  setTimeout(() => {
    osc.stop();
    ctx.close();
  }, 300);
}

document.querySelectorAll('.piano-key').forEach(btn => {
  btn.addEventListener('click', e => {
    playTone(Number(btn.dataset.freq));
  });
});

document.addEventListener('keydown', e => {
  const note = notes.find(n => n.key === e.key.toUpperCase());
  if (note) playTone(note.freq);
});
