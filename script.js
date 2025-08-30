const giftBox = document.getElementById('giftBox');
const giftSection = document.getElementById('giftSection');
const messageSection = document.getElementById('messageSection');
const gallerySection = document.getElementById('gallerySection');
const typedText = document.getElementById('typedText');
const emojiContainer = document.getElementById('emojiContainer');

const music = document.getElementById('bgMusic');
const galleryMusic = document.getElementById('galleryMusic');
const toggleMusicBtn = document.getElementById('toggleMusic');
const toFullscreenBtn = document.getElementById('toFullscreenBtn');

const fullscreen = document.getElementById('fullscreen');
const closeFs = document.getElementById('closeFs');
const fsGrid = document.getElementById('fsGrid');

let isMuted = false;

// Confetti
function shootConfetti(times = 40) {
  for (let i = 0; i < times; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = Math.random() * 100 + 'vw';
    c.style.animationDuration = (3 + Math.random() * 3) + 's';
    c.style.background = `hsl(${Math.floor(Math.random()*360)}, 90%, 60%)`;
    c.style.transform = `translateY(0) rotate(${Math.random()*360}deg)`;
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 7000);
  }
}

function safePlay(audio) {
  audio.volume = 0.9;
  audio.muted = isMuted;
  audio.play().catch(() => {});
}

toggleMusicBtn.addEventListener('click', () => {
  isMuted = !isMuted;
  music.muted = isMuted;
  galleryMusic.muted = isMuted;
  toggleMusicBtn.textContent = isMuted ? '🔈 Unmute' : '🔇 Mute';
  toggleMusicBtn.setAttribute('aria-pressed', String(!isMuted));
});

function askNameFlow() {
  return Swal.fire({
    title: '🎀 What\'s your beautiful name?',
    input: 'text',
    inputPlaceholder: 'Type here...',
    confirmButtonText: "Let\'s Celebrate 🎉",
    confirmButtonColor: '#ff66b2',
    background: '#fff0f6',
    inputValidator: (value) => { if (!value) return 'Please enter your name 💬'; }
  });
}

function startTyping(userName) {
  new Typed('#typedText', {
    strings: [
      `🎂 Happy Birthday ${userName}! 🎂`,
      '💝 Wishing You Happiness',
      '🌸 Lots of Love 💕'
    ],
    typeSpeed: 70,
    backSpeed: 40,
    backDelay: 1500,
    loop: true
  });
}

function enableEmojis(userName) {
  let emojiClicks = 0;
  emojiContainer.querySelectorAll('.emoji').forEach((emoji) => {
    emoji.addEventListener('click', () => {
      if (emoji.style.pointerEvents === 'none') return;
      emojiClicks++;
      emoji.style.opacity = '0.5';
      emoji.style.pointerEvents = 'none';
      if (emojiClicks === 4) {
        setTimeout(() => {
          Swal.fire({
            title: `💫 One more thing, ${userName}!`,
            html: `<p style="font-size:20px;">You are truly special, and today proves it 💫🌹<br>Never stop being amazing! 💕</p>`,
            confirmButtonText: '🌟 Aww, Thank you!',
            confirmButtonColor: '#ff66b2',
            background: '#fff0f6'
          }).then(() => {
            gallerySection.style.display = 'block';
            toFullscreenBtn.classList.remove('hidden');
            window.scrollTo({ top: gallerySection.offsetTop - 20, behavior: 'smooth' });
            shootConfetti(60);
          });
        }, 400);
      }
    }, { once: true });
  });
}

function openFullscreenGallery() {
  music.pause();
  safePlay(galleryMusic);

  fullscreen.style.display = 'block';
  document.body.style.overflow = 'hidden';

  const imgs = fsGrid.querySelectorAll('img');
  imgs.forEach((img, i) => {
    setTimeout(() => img.classList.add('show'), i * 120);
  });
}

function closeFullscreenGallery() {
  fullscreen.style.display = 'none';
  document.body.style.overflow = '';
  galleryMusic.pause();
  safePlay(music);
}

closeFs.addEventListener('click', closeFullscreenGallery);
toFullscreenBtn.addEventListener('click', openFullscreenGallery);

// Main flow
giftBox.addEventListener('click', async () => {
  shootConfetti(50);
  safePlay(music);

  const { isConfirmed, value } = await askNameFlow();
  if (!isConfirmed) return;

  const userName = value.trim();
  if (!userName) return;

  giftSection.classList.add('hidden');
  messageSection.classList.remove('hidden');

  startTyping(userName);
  enableEmojis(userName);
});

// Accessibility
giftBox.setAttribute('tabindex', '0');
giftBox.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    giftBox.click();
  }
});

// Preload images
[
  'image/photo (1).jpg', 'image/photo (2).JPG', 'image/photo (3).JPG',
  'image/photo (4).JPG', 'image/photo (5).JPG', 'image/photo (6).JPG', 'image/photo (7).JPG', 'image/photo (8).JPG'
].forEach(src => { const i = new Image(); i.src = src; });
