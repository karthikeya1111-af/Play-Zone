document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const searchInput = document.getElementById('searchInput');
  const clearSearch = document.getElementById('clearSearch');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const gameCards = document.querySelectorAll('.game-card');
  const noResults = document.getElementById('noResults');
  const resetSearchBtn = document.getElementById('resetSearchBtn');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const randomGameBtn = document.getElementById('randomGameBtn');
  const heroRandomBtn = document.getElementById('heroRandomBtn');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  
  // Game Modal Elements
  const gameModal = document.getElementById('gameModal');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const gameIframe = document.getElementById('gameIframe');
  const modalGameTitle = document.getElementById('modalGameTitle');
  const modalExternalLink = document.getElementById('modalExternalLink');
  const playButtons = document.querySelectorAll('.play-btn');

  let currentCategory = 'all';
  let currentSearchQuery = '';

  // Filter Games Function
  function filterGames() {
    let visibleCount = 0;

    gameCards.forEach(card => {
      const category = card.getAttribute('data-category');
      const gameName = card.getAttribute('data-name').toLowerCase();
      const gameDesc = card.querySelector('.game-description').textContent.toLowerCase();

      const matchesCategory = currentCategory === 'all' || category === currentCategory;
      const matchesSearch = currentSearchQuery === '' || 
                            gameName.includes(currentSearchQuery) || 
                            gameDesc.includes(currentSearchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        card.style.animation = 'fadeIn 0.4s ease forwards';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (visibleCount === 0) {
      noResults.style.display = 'block';
    } else {
      noResults.style.display = 'none';
    }
  }

  // Search Event Listeners
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value.trim().toLowerCase();
      clearSearch.style.display = currentSearchQuery ? 'block' : 'none';
      filterGames();
    });
  }

  if (clearSearch) {
    clearSearch.addEventListener('click', () => {
      searchInput.value = '';
      currentSearchQuery = '';
      clearSearch.style.display = 'none';
      filterGames();
    });
  }

  if (resetSearchBtn) {
    resetSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      currentSearchQuery = '';
      clearSearch.style.display = 'none';
      currentCategory = 'all';
      
      filterBtns.forEach(btn => btn.classList.remove('active'));
      document.querySelector('.filter-btn[data-filter="all"]')?.classList.add('active');
      
      filterGames();
    });
  }

  // Category Filter Pills Listener
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-filter');
      filterGames();
    });
  });

  // Mobile Menu Toggle
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });

    // Close menu when clicking link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
      });
    });
  }

  // Random Game Picker
  function playRandomGame() {
    const visibleCards = Array.from(gameCards).filter(card => card.style.display !== 'none');
    const pool = visibleCards.length > 0 ? visibleCards : Array.from(gameCards);
    const randomIndex = Math.floor(Math.random() * pool.length);
    const selectedCard = pool[randomIndex];
    
    const playBtn = selectedCard.querySelector('.play-btn');
    if (playBtn) {
      selectedCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      selectedCard.style.transform = 'scale(1.05)';
      setTimeout(() => {
        selectedCard.style.transform = '';
        playBtn.click();
      }, 500);
    }
  }

  if (randomGameBtn) randomGameBtn.addEventListener('click', playRandomGame);
  if (heroRandomBtn) heroRandomBtn.addEventListener('click', playRandomGame);

  // Modal Game Player Handler
  playButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Allow user to choose modal player or direct navigation
      // For seamless experience, we can open the modal or let link follow naturally if ctrl/cmd key pressed
      if (e.ctrlKey || e.metaKey) return; // Open in new tab naturally
      
      const gameUrl = btn.getAttribute('data-game-url') || btn.getAttribute('href');
      const gameTitle = btn.getAttribute('data-game-title') || 'PlayZone Game';

      // Launch Modal Player
      if (gameModal && gameIframe) {
        e.preventDefault();
        modalGameTitle.textContent = gameTitle;
        modalExternalLink.href = gameUrl;
        gameIframe.src = gameUrl;
        gameModal.classList.add('active');
        gameModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close Modal Handler
  function closeModal() {
    if (gameModal && gameIframe) {
      gameModal.classList.remove('active');
      gameModal.setAttribute('aria-hidden', 'true');
      gameIframe.src = '';
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && gameModal && gameModal.classList.contains('active')) {
      closeModal();
    }
  });

  // Scroll to Top Handler
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.pointerEvents = 'auto';
      } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.pointerEvents = 'none';
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
