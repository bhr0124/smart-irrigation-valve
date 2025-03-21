// 当页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化粒子背景
    initParticles();
    
    // 初始化市场分析图表
    initMarketChart();
    
    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // 检测是否为移动设备
                const isMobile = window.innerWidth <= 768;
                const offset = isMobile ? 60 : 80; // 移动设备使用更小的偏移量
                
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });
                
                // 在移动设备上，点击导航链接后自动关闭菜单
                if (isMobile) {
                    // 如果有汉堡菜单，可以在这里添加关闭菜单的代码
                }
            }
        });
    });
    
    // 表单提交事件
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('感谢您的留言！我们会尽快回复您。');
            this.reset();
        });
    }
    
    // 优化移动端图表显示
    if (window.innerWidth <= 768) {
        const ctx = document.getElementById('marketChart');
        if (ctx && typeof Chart !== 'undefined') {
            const existingChart = Chart.getChart(ctx);
            if (existingChart) {
                existingChart.options.plugins.legend.display = false;
                existingChart.options.scales.y.ticks.maxTicksLimit = 5;
                existingChart.update();
            }
        }
    }
    
    // 优化移动端性能
    if (window.innerWidth <= 576) {
        // 减少粒子数量以提高性能
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 30, // 减少粒子数量
                    },
                    color: {
                        value: '#27ae60'
                    },
                    shape: {
                        type: 'circle',
                        stroke: {
                            width: 0,
                            color: '#000000'
                        }
                    },
                    opacity: {
                        value: 0.5,
                        random: false,
                        anim: {
                            enable: false
                        }
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: {
                            enable: false
                        }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#27ae60',
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: 'none',
                        random: false,
                        straight: false,
                        out_mode: 'out',
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: {
                            enable: true,
                            mode: 'grab'
                        },
                        onclick: {
                            enable: true,
                            mode: 'push'
                        },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 140,
                            line_linked: {
                                opacity: 1
                            }
                        },
                        push: {
                            particles_nb: 4
                        }
                    }
                },
                retina_detect: true
            });
        }
    }
    
    // 处理移动端触摸事件
    const touchElements = document.querySelectorAll('.feature-card, .innovation-card, .value-card, .team-member');
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transition = 'transform 0.2s ease';
        }, {passive: true});
        
        element.addEventListener('touchend', function() {
            this.style.transition = 'transform 0.6s ease';
        }, {passive: true});
    });
    
    // 检测设备方向变化并调整布局
    window.addEventListener('orientationchange', function() {
        setTimeout(function() {
            window.dispatchEvent(new Event('resize'));
            
            // 重新初始化图表以适应新方向
            initMarketChart();
            
            // 滚动到当前位置以修复布局问题
            window.scrollBy(0, 1);
            window.scrollBy(0, -1);
        }, 200);
    });
    
    // 添加图片懒加载功能
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    } else {
        // 回退方案
        lazyImages.forEach(function(img) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
    
    // 添加滚动进度指示器
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        
        progressBar.style.width = scrollPercentage + '%';
    });
    
    // 移动端导航菜单
    // 创建遮罩层
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    // 点击菜单按钮
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });
    
    // 点击遮罩层关闭菜单
    overlay.addEventListener('click', function() {
        nav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // 点击导航链接关闭菜单
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // 优化页面加载
    // 检测是否为移动设备
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // 延迟加载非关键资源
        const deferredImages = document.querySelectorAll('img[data-src]');
        
        // 使用Intersection Observer延迟加载图片
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            deferredImages.forEach(function(img) {
                imageObserver.observe(img);
            });
        } else {
            // 回退方案
            deferredImages.forEach(function(img) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
        
        // 减少粒子效果以提高性能
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: { value: 30 }, // 减少粒子数量
                    size: { value: 3 }
                },
                interactivity: {
                    events: {
                        onhover: { enable: false } // 禁用悬停交互以提高性能
                    }
                }
            });
        }
    }
    
    // 添加移动端手势支持
    if (isMobile && 'ontouchstart' in window) {
        let touchStartX = 0;
        let touchEndX = 0;
        
        // 监听触摸开始事件
        document.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        // 监听触摸结束事件
        document.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
        
        // 处理滑动手势
        function handleSwipe() {
            const nav = document.querySelector('nav');
            const overlay = document.querySelector('.overlay');
            
            // 从左向右滑动 (打开菜单)
            if (touchEndX - touchStartX > 100 && !nav.classList.contains('active')) {
                nav.classList.add('active');
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
            
            // 从右向左滑动 (关闭菜单)
            if (touchStartX - touchEndX > 100 && nav.classList.contains('active')) {
                nav.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    }
});

// 初始化粒子背景
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#27ae60'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#27ae60',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

// 初始化市场分析图表
function initMarketChart() {
    const ctx = document.getElementById('marketChart');
    if (ctx && typeof Chart !== 'undefined') {
        // 销毁现有图表以避免重叠
        const existingChart = Chart.getChart(ctx);
        if (existingChart) {
            existingChart.destroy();
        }
        
        // 根据屏幕宽度调整图表配置
        const isMobile = window.innerWidth <= 768;
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
                datasets: [{
                    label: '全球智能灌溉市场规模（亿美元）',
                    data: [80, 92, 106, 122, 135, 150],
                    backgroundColor: [
                        'rgba(46, 204, 113, 0.6)',
                        'rgba(46, 204, 113, 0.6)',
                        'rgba(46, 204, 113, 0.6)',
                        'rgba(46, 204, 113, 0.6)',
                        'rgba(46, 204, 113, 0.6)',
                        'rgba(46, 204, 113, 0.6)'
                    ],
                    borderColor: [
                        'rgba(39, 174, 96, 1)',
                        'rgba(39, 174, 96, 1)',
                        'rgba(39, 174, 96, 1)',
                        'rgba(39, 174, 96, 1)',
                        'rgba(39, 174, 96, 1)',
                        'rgba(39, 174, 96, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: !isMobile,
                            text: '市场规模（亿美元）'
                        },
                        ticks: {
                            maxTicksLimit: isMobile ? 5 : 10,
                            font: {
                                size: isMobile ? 10 : 12
                            }
                        }
                    },
                    x: {
                        title: {
                            display: !isMobile,
                            text: '年份'
                        },
                        ticks: {
                            font: {
                                size: isMobile ? 10 : 12
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: !isMobile,
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: '全球智能灌溉市场增长趋势',
                        font: {
                            size: isMobile ? 14 : 16
                        }
                    }
                }
            }
        });
    }
}

// 添加元素出现动画
window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.feature-card, .innovation-card, .value-card, .team-member');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// 初始化元素透明度和位置
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.feature-card, .innovation-card, .value-card, .team-member');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // 触发一次滚动事件，以显示初始可见的元素
    window.dispatchEvent(new Event('scroll'));
});

// 添加页面加载优化
window.addEventListener('load', function() {
    // 延迟加载非关键资源
    setTimeout(function() {
        // 预加载团队成员图片
        const teamImages = document.querySelectorAll('.member-photo img');
        teamImages.forEach(img => {
            const src = img.getAttribute('src');
            if (src) {
                const newImg = new Image();
                newImg.src = src;
            }
        });
    }, 1000);
});

// 返回顶部按钮功能
window.addEventListener('scroll', function() {
    const backToTop = document.getElementById('back-to-top');
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

document.getElementById('back-to-top').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}); 