// === DOM Elements ===
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

// === CONFETTI ===
function shootConfetti(times = 40) {
  for (let i = 0; i < times; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = Math.random() * 100 + 'vw';
    c.style.animationDuration = (3 + Math.random() * 3) + 's';
    c.style.background = `hsl(${Math.floor(Math.random() * 360)}, 90%, 60%)`;
    c.style.transform = `translateY(0) rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 7000);
  }
}

// === AUDIO SAFE PLAY ===
function safePlay(audio) {
  audio.volume = 0.9;
  audio.muted = isMuted;
  audio.play().catch(() => {});
}

// === MUTE / UNMUTE MUSIC ===
toggleMusicBtn.addEventListener('click', () => {
  isMuted = !isMuted;
  music.muted = isMuted;
  galleryMusic.muted = isMuted;
  toggleMusicBtn.textContent = isMuted ? '🔈 Unmute' : '🔇 Mute';
  toggleMusicBtn.setAttribute('aria-pressed', String(!isMuted));
});

// === TYPING EFFECT ===
function startTyping(userName) {
  new Typed('#typedText', {
    strings: [
      `💖 Dear ${userName}...`,
      'From the moment I met you...',
      '💌 I knew you were the one.',
      'Will you be mine forever? 💍'
    ],
    typeSpeed: 70,
    backSpeed: 40,
    backDelay: 1500,
    loop: true
  });
}

// === EMOJI INTERACTION ===
function enableEmojis(userName) {
  let emojiClicks = 0;
  emojiContainer.querySelectorAll('.emoji').forEach((emoji) => {
    emoji.addEventListener('click', () => {
      if (emoji.style.pointerEvents === 'none') return;

      emojiClicks++;
      emoji.style.opacity = '0.5';
      emoji.style.pointerEvents = 'none';

      // When all 4 emojis clicked
      if (emojiClicks === 4) {
        setTimeout(() => {
          Swal.fire({
            title: `💫 I love you, ${userName}!`,
            html: `
              <p style="font-size:20px;"> 
                कुनै साधारण दिन थियो, जब पहिलो पटक तिमीलाई देखेँ 🌸  
                मुस्कानमा त्यस्तो जादू थियो, जसले मेरो संसारै बदल्यो...  
                समय बित्दै गयो, हरेक कुरामा तिमी नै मेरो प्रेरणा बन्यौ 💫  
                तिम्रो साथमा हरेक क्षण स्वर्ग जस्तै लाग्छ —  
                अनि मेरो मनले भन्छ —  
                <strong>“म तिमीमा हराएको छु, अब फर्किन चाहन्न।”</strong>
              </p>`,
            confirmButtonText: '🌟 I Love You',
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

// === FULLSCREEN GALLERY ===
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

// === MAIN FLOW ===
giftBox.addEventListener('click', async () => {
  shootConfetti(50);
  safePlay(music);

  const userName = "Dikshya Kunjeda"; // 💖 Change name here if needed

  giftSection.classList.add('hidden');
  messageSection.classList.remove('hidden');

  startTyping(userName);
  enableEmojis(userName);
});

// === ACCESSIBILITY SUPPORT ===
giftBox.setAttribute('tabindex', '0');
giftBox.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    giftBox.click();
  }
});

// === PRELOAD IMAGES ===
[
  'image/photo (1).jpg', 'image/photo (2).JPG', 'image/photo (3).JPG',
  'image/photo (4).JPG', 'image/photo (5).JPG', 'image/photo (6).JPG',
  'image/photo (7).JPG', 'image/photo (8).JPG'
].forEach(src => {
  const i = new Image();
  i.src = src;
});
