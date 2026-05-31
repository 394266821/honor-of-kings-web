/* ============================================
   王者荣耀官网 - 全局 JavaScript v2
   对标 pvp.qq.com 官方风格
   代码简洁，注释详细
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

    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ========== 3. Banner 轮播 ==========
let bannerIndex = 0;
let bannerTimer = null;

function initBanner() {
    const banner = document.querySelector('.banner');
    if (!banner) return;

    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.banner-dots span');
    const prevBtn = document.querySelector('.banner-arrow.prev');
    const nextBtn = document.querySelector('.banner-arrow.next');

    const total = slides.length;
    if (total === 0) return;

    function goTo(index) {
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
            goTo(bannerIndex + 1);
        }, 4000);
    }

    function stopAutoPlay() {
        clearInterval(bannerTimer);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoPlay();
            goTo(bannerIndex - 1);
            startAutoPlay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoPlay();
            goTo(bannerIndex + 1);
            startAutoPlay();
        });
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            stopAutoPlay();
            goTo(i);
            startAutoPlay();
        });
    });

    startAutoPlay();
}

// ========== 4. 英雄卡片筛选 ==========
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

// ========== 5. 回顶部按钮 ==========
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

// ========== 6. 表单提交 ==========
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

// ========== 7. Tab 切换 ==========
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    if (tabBtns.length === 0) return;

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const target = this.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            tabPanels.forEach(panel => {
                panel.style.display = panel.getAttribute('data-panel') === target ? 'block' : 'none';
            });
        });
    });
}

// ========== 8. 分页 ==========
function goToPage(pageNum) {
    const allItems = document.querySelectorAll('.news-item, .video-card');
    const itemsPerPage = 6;
    const start = (pageNum - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    allItems.forEach((item, index) => {
        item.style.display = (index >= start && index < end) ? '' : 'none';
    });

    document.querySelectorAll('.pagination button').forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.getAttribute('data-page')) === pageNum);
    });

    const list = document.querySelector('.news-list, .video-grid');
    if (list) list.scrollIntoView({ behavior: 'smooth' });
}