document.addEventListener('DOMContentLoaded', () => {
    // Initialize variables
    const modal = document.querySelector('.letter-modal');
    const modalContent = document.querySelector('.modal-content');
    const closeButton = document.querySelector('.modal-close');
    const bgMusic = document.getElementById('bgMusic');
    const openSound = document.getElementById('openSound');
    const modalSound = document.getElementById('modalSound');
    let isMusicPlaying = false;
    let isEnvelopeOpen = false;

    // Current datetime - Updated to: 2025-03-07 14:41:49
    const currentDate = new Date('2025-03-07 14:41:49');
    document.getElementById('currentDate').textContent = 
        `Ngày ${currentDate.getDate()} tháng ${currentDate.getMonth() + 1} năm ${currentDate.getFullYear()}`;

    // Letter Content with typing delays
    const letterContent = [
        "Thân gửi người phụ nữ tuyệt vời,^1000\n\n",
        "Nhân dịp ngày Quốc tế Phụ nữ 8/3,^500\n",
        "tôi xin gửi đến bạn những lời chúc tốt đẹp nhất!^1000\n\n",
        "Mỗi người phụ nữ là một bông hoa tuyệt đẹp,^500\n",
        "tô điểm cho cuộc sống này thêm rực rỡ.^1000\n"
    ];

    const wishes = [
        {icon: "🌸", text: "Chúc bạn luôn xinh đẹp, rạng ngời như những đóa hoa tươi thắm"},
        {icon: "✨", text: "Chúc bạn thành công rực rỡ trên con đường sự nghiệp"},
        {icon: "💝", text: "Chúc bạn tìm được hạnh phúc trọn vẹn trong tình yêu"},
        {icon: "🌟", text: "Chúc bạn luôn vui vẻ, tràn đầy năng lượng mỗi ngày"},
        {icon: "🎀", text: "Chúc bạn luôn nhận được nhiều điều tuyệt vời trong cuộc sống"}
    ];

    // Loading Screen
    setTimeout(() => {
        gsap.to('.loading-screen', {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                document.querySelector('.loading-screen').style.display = 'none';
            }
        });
    }, 2000);

    // Start Button
    document.querySelector('.start-button').addEventListener('click', () => {
        gsap.to('.welcome-screen', {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                document.querySelector('.welcome-screen').style.display = 'none';
                document.querySelector('.main-container').style.display = 'block';
                startMainContent();
            }
        });
    });

    function startMainContent() {
        bgMusic.play().catch(() => console.log('Autoplay prevented'));
        isMusicPlaying = true;

        // Entrance animation for envelope
        gsap.from('.envelope-container', {
            scale: 0,
            rotation: 720,
            duration: 1.5,
            ease: "elastic.out(1, 0.5)",
            onComplete: () => {
                // Floating animation
                gsap.to('.envelope-container', {
                    y: '-=20',
                    duration: 1.5,
                    yoyo: true,
                    repeat: -1,
                    ease: "power1.inOut"
                });
            }
        });

        // Start background effects
        createBackgroundEffects();
    }

    function createBackgroundEffects() {
        const items = ['❤️', '🌸', '✨', '💝', '🌟'];
        setInterval(() => {
            const item = document.createElement('div');
            item.textContent = items[Math.floor(Math.random() * items.length)];
            item.style.position = 'fixed';
            item.style.left = Math.random() * 100 + 'vw';
            item.style.top = -30 + 'px';
            item.style.fontSize = Math.random() * 20 + 10 + 'px';
            item.style.opacity = '0.6';
            item.style.zIndex = '-1';
            
            document.body.appendChild(item);
            
            gsap.to(item, {
                y: window.innerHeight + 30,
                duration: 3 + Math.random() * 3,
                ease: "none",
                onComplete: () => item.remove()
            });
        }, 300);
    }

    // Envelope Interaction
    document.querySelector('.envelope-container').addEventListener('click', () => {
        if (!isEnvelopeOpen) {
            openEnvelope();
        } else {
            openModal();
        }
    });

    function openEnvelope() {
        isEnvelopeOpen = true;
        openSound.play().catch(() => console.log('Sound play prevented'));

        gsap.timeline()
            .to('.envelope', {
                rotationX: 20,
                y: -50,
                duration: 0.5
            })
            .to('.envelope-flap', {
                rotationX: 180,
                duration: 0.5
            })
            .to('.letter', {
                y: -150,
                rotationX: 0,
                duration: 0.8,
                ease: "elastic.out(1, 0.7)",
                onComplete: () => {
                    setTimeout(openModal, 500);
                }
            });

        createParticleBurst();
    }

    function createParticleBurst() {
        const center = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        };

        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                const size = Math.random() * 8 + 4;
                const angle = Math.random() * Math.PI * 2;
                const velocity = Math.random() * 8 + 4;
                const distance = Math.random() * 200;
                const color = ['#ff6b95', '#ff1493', '#ffd700', '#ffffff'][Math.floor(Math.random() * 4)];
                
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.background = color;
                particle.style.left = `${center.x}px`;
                particle.style.top = `${center.y}px`;
                
                document.body.appendChild(particle);
                
                gsap.to(particle, {
                    x: Math.cos(angle) * distance,
                    y: Math.sin(angle) * distance,
                    opacity: 0,
                    duration: 1 + Math.random(),
                    ease: "power2.out",
                    onComplete: () => particle.remove()
                });
            }, Math.random() * 500);
        }
    }

    function openModal() {
        modal.style.display = 'flex';
        modalSound.play().catch(() => console.log('Sound play prevented'));
        
        gsap.to(modal, {
            opacity: 1,
            duration: 0.3
        });

        gsap.to(modalContent, {
            scale: 1,
            rotationY: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power4.out"
        });

        // Start typing animation
        new Typed('.typed-container', {
            strings: [letterContent.join('')],
            typeSpeed: 30,
            backSpeed: 0,
            fadeOut: true,
            onComplete: () => {
                displayWishes();
                createSparkles();
            }
        });
    }

    function createSparkles() {
        const container = document.querySelector('.modal-letter-content');
        const colors = ['#ff6b95', '#ff1493', '#ffd700', '#ffffff'];

        for (let i = 0; i < 50; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = `${Math.random() * 100}%`;
            sparkle.style.top = `${Math.random() * 100}%`;
            sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
            sparkle.style.animation = `sparkleAnim ${1 + Math.random() * 2}s linear infinite`;
            sparkle.style.animationDelay = `${Math.random() * 2}s`;
            container.appendChild(sparkle);
        }
    }

    function displayWishes() {
        const container = document.querySelector('.wishes-container');
        wishes.forEach((wish, index) => {
            const wishElement = document.createElement('div');
            wishElement.className = 'wish-item';
            wishElement.innerHTML = `
                <span class="wish-icon">${wish.icon}</span>
                <span class="wish-text">${wish.text}</span>
            `;
            container.appendChild(wishElement);

            gsap.from(wishElement, {
                // x: -50,
                opacity: 0,
                duration: 0.5,
                delay: index * 0.2
            });
        });
    }

    function closeModal() {
        gsap.to(modalContent, {
            scale: 0.7,
            rotationY: -30,
            opacity: 0,
            duration: 0.3
        });

        gsap.to(modal, {
            opacity: 0,
            duration: 0.3,
            delay: 0.2,
            onComplete: () => {
                modal.style.display = 'none';
                document.querySelector('.wishes-container').innerHTML = '';
                document.querySelector('.typed-container').innerHTML = '';
            }
        });
    }

    // Modal Events
    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Mouse move effects
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.9) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.left = e.clientX + 'px';
            particle.style.top = e.clientY + 'px';
            document.body.appendChild(particle);
            
            gsap.to(particle, {
                opacity: 0,
                y: -50,
                x: Math.random() * 100 - 50,
                duration: 1,
                onComplete: () => particle.remove()
            });
        }
    });

    // Music Controls
    document.getElementById('musicToggle').addEventListener('click', () => {
        if (isMusicPlaying) {
            bgMusic.pause();
            document.querySelector('#musicToggle').textContent = '🔇';
        } else {
            bgMusic.play();
            document.querySelector('#musicToggle').textContent = '🎵';
        }
        isMusicPlaying = !isMusicPlaying;
    });

    // Theme Toggle
    let isDarkTheme = false;
    document.getElementById('themeToggle').addEventListener('click', () => {
        isDarkTheme = !isDarkTheme;
        document.body.style.background = isDarkTheme ? 
            'linear-gradient(135deg, #2c1810, #1a1a1a)' : 
            '#ffb3c9';
        document.querySelector('#themeToggle').textContent = isDarkTheme ? '☀️' : '🌙';
    });

    // Preload Audio
    bgMusic.load();
    openSound.load();
    modalSound.load();
});