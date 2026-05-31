/* ============================================
   王者荣耀官网 - 全局 JavaScript
   代码简洁，注释详细，适合期末演讲展示
   ============================================ */

// ========== 1. 等待 DOM 加载完毕 ==========
document.addEventListener('DOMContentLoaded', function () {

    // 初始化导航栏
    initNav();

    // 初始化轮播（如果有轮播）
    initBanner();

    // 初始化英雄筛选
    initHeroFilter();

    // 初始化回顶部按钮
    initBackToTop();

    // 初始化表单提交
    initForm();

    // 初始化 Tab 切换
    initTabs();

});

// ========== 2. 导航栏高亮 & 移动端菜单 ==========
function initNav() {
    // 获取当前页面文件名
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // 导航链接高亮
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // 移动端：显示/隐藏菜单按钮（如果有的话）
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            const navList = document.querySelector('.nav-list');
            navList.classList.toggle('show');
        });
    }
}

// ========== 3. Banner 轮播功能 ==========
let bannerIndex = 0;       // 当前轮播索引
let bannerTimer = null;     // 自动播放定时器

function initBanner() {
    const banner = document.querySelector('.banner');
    if (!banner) return;    // 没有轮播则跳过

    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.banner-dots span');
    const prevBtn = document.querySelector('.banner-arrow.prev');
    const nextBtn = document.querySelector('.banner-arrow.next');

    // 总共几张幻灯片
    const total = slides.length;
    if (total === 0) return;

    // 切换到指定索引的幻灯片
    function goTo(index) {
        // 边界处理
        if (index < 0) index = total - 1;
        if (index >= total) index = 0;

        bannerIndex = index;

        // 移动幻灯片
        const slidesEl = document.querySelector('.banner-slides');
        if (slidesEl) {
            slidesEl.style.transform = `translateX(-${index * 100}%)`;
        }

        // 更新指示点
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // 自动播放：每 4 秒切换下一张
    function startAutoPlay() {
        bannerTimer = setInterval(() => {
            goTo(bannerIndex + 1);
        }, 4000);
    }

    // 停止自动播放
    function stopAutoPlay() {
        clearInterval(bannerTimer);
    }

    // 绑定点击事件
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

    // 指示点点击
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            stopAutoPlay();
            goTo(i);
            startAutoPlay();
        });
    });

    // 启动自动播放
    startAutoPlay();
}

// ========== 4. 英雄卡片筛选功能 ==========
function initHeroFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const heroCards = document.querySelectorAll('.hero-card');

    if (filterBtns.length === 0 || heroCards.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // 高亮当前按钮
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // 获取筛选类型
            const filterType = this.getAttribute('data-filter');

            // 遍历所有英雄卡片，决定显示/隐藏
            heroCards.forEach(card => {
                const cardType = card.getAttribute('data-type');

                if (filterType === 'all' || cardType === filterType) {
                    card.style.display = 'block';
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

    // 滚动超过 300px 时显示按钮
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    });

    // 点击回到顶部
    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'    // 平滑滚动
        });
    });
}

// ========== 6. 表单提交处理 ==========
function initForm() {
    const form = document.querySelector('.form-box form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();   // 阻止默认提交（刷新页面）

        // 简单的表单验证
        const name = document.getElementById('name')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const message = document.getElementById('message')?.value.trim();

        if (!name) {
            alert('请输入您的姓名！');
            return;
        }

        if (!email || !email.includes('@')) {
            alert('请输入有效的邮箱地址！');
            return;
        }

        if (!message) {
            alert('请输入留言内容！');
            return;
        }

        // 提交成功提示
        alert('✅ 提交成功！我们会尽快回复您。');
        form.reset();         // 清空表单
    });
}

// ========== 7. Tab 标签页切换 ==========
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    if (tabBtns.length === 0) return;

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const target = this.getAttribute('data-tab');

            // 高亮按钮
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // 显示对应内容
            tabPanels.forEach(panel => {
                if (panel.getAttribute('data-panel') === target) {
                    panel.style.display = 'block';
                } else {
                    panel.style.display = 'none';
                }
            });
        });
    });
}

// ========== 8. 分页功能（新闻/视频列表） ==========
function goToPage(pageNum) {
    // 获取当前页码的所有文章
    const allItems = document.querySelectorAll('.news-item, .video-card');
    const itemsPerPage = 6;   // 每页显示 6 条
    const start = (pageNum - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    // 显示/隐藏
    allItems.forEach((item, index) => {
        if (index >= start && index < end) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });

    // 更新分页按钮高亮
    document.querySelectorAll('.pagination button').forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.getAttribute('data-page')) === pageNum);
    });

    // 滚动到列表顶部
    const list = document.querySelector('.news-list, .video-grid');
    if (list) {
        list.scrollIntoView({ behavior: 'smooth' });
    }
}

// ========== 9. 英雄详情 - 技能切换 ==========
function showSkill(skillIndex) {
    // 切换技能描述（这里演示点击切换效果）
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.style.opacity = (index === skillIndex) ? '1' : '0.5';
    });
}