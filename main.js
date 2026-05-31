/* ============================================
   王者荣耀官网 - 全局 JavaScript v3
   完全对标 pvp.qq.com 官方风格
   ============================================ */

// ========== 1. 等待 DOM 加载完毕 ==========
document.addEventListener('DOMContentLoaded', function () {

    initNav();           // 导航栏高亮
    initBanner();         // Banner 轮播
    initHeroFilter();     // 英雄筛选
    initBackToTop();      // 回顶部按钮
    initForm();           // 表单提交
    initTabs();           // Tab 切换

});

// ========== 2. 导航栏高亮 ==========
function initNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-item a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ========== 3. 汉堡菜单（移动端） ==========
function toggleMobileMenu() {
    const nav = document.querySelector('.main-nav');
    const btn = document.querySelector('.hamburger-btn');
    if (nav && btn) {
        nav.classList.toggle('open');
        btn.classList.toggle('active');
    }
}

// 点击导航链接后关闭菜单
document.addEventListener('click', function(e) {
    if (e.target.closest('.nav-item a')) {
        const nav = document.querySelector('.main-nav');
        const btn = document.querySelector('.hamburger-btn');
        if (nav) nav.classList.remove('open');
        if (btn) btn.classList.remove('active');
    }
});

// ========== 4. Banner 轮播 ==========
let bannerIndex = 0;
let bannerTimer = null;

function initBanner() {
    const slides = document.querySelectorAll('.banner-slide');
    const dotsContainer = document.querySelector('.banner-dots');

    if (slides.length === 0) return;

    // 动态生成 dots
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        slides.forEach((_, i) => {
            const dot = document.createElement('span');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });
    }

    const dots = document.querySelectorAll('.banner-dots span');
    const total = slides.length;

    function goToSlide(index) {
        if (index < 0) index = total - 1;
        if (index >= total) index = 0;
        bannerIndex = index;

        const slidesEl = document.querySelector('.banner-slides');
        if (slidesEl) {
            slidesEl.style.transform = `translateX(-${index * 100}%)`;
        }

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function startAutoPlay() {
        bannerTimer = setInterval(() => {
            goToSlide(bannerIndex + 1);
        }, 4000);
    }

    function stopAutoPlay() {
        clearInterval(bannerTimer);
    }

    // 左右箭头
    document.querySelector('.banner-arrow.prev')?.addEventListener('click', () => {
        stopAutoPlay();
        goToSlide(bannerIndex - 1);
        startAutoPlay();
    });

    document.querySelector('.banner-arrow.next')?.addEventListener('click', () => {
        stopAutoPlay();
        goToSlide(bannerIndex + 1);
        startAutoPlay();
    });

    startAutoPlay();
}

// ========== 5. 英雄卡片筛选 ==========
function initHeroFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const heroCards = document.querySelectorAll('.hero-card-wrap');

    if (filterBtns.length === 0 || heroCards.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filterType = this.getAttribute('data-filter');

            heroCards.forEach(card => {
                const cardType = card.getAttribute('data-type');
                if (filterType === 'all' || cardType === filterType) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ========== 6. 回顶部按钮 ==========
function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('show', window.scrollY > 300);
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ========== 7. 表单提交 ==========
function initForm() {
    const form = document.querySelector('.form-box form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const message = document.getElementById('message')?.value.trim();

        if (!name) { alert('请输入您的姓名！'); return; }
        if (!email || !email.includes('@')) { alert('请输入有效的邮箱地址！'); return; }
        if (!message) { alert('请输入留言内容！'); return; }

        alert('✅ 提交成功！我们会尽快回复您。');
        form.reset();
    });
}

// ========== 8. Tab 切换 ==========
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    if (tabBtns.length === 0) return;

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            tabPanels.forEach(panel => {
                panel.style.display = panel.getAttribute('data-panel') === target ? 'block' : 'none';
            });
        });
    });
}

// ========== 9. 分页 ==========
function goToPage(pageNum) {
    const allItems = document.querySelectorAll('.news-item, .video-card, .hero-card-wrap');
    const itemsPerPage = 6;
    const start = (pageNum - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    allItems.forEach((item, index) => {
        item.style.display = (index >= start && index < end) ? '' : 'none';
    });

    document.querySelectorAll('.pagination button').forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.getAttribute('data-page')) === pageNum);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}