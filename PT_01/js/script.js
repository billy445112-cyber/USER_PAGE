    // Carousel functionality
        let currentSlide = 0;
        const slides = document.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.dot');

        function showSlide(n) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        // Auto-advance carousel
        setInterval(nextSlide, 5000);

        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });

        // Login Modal functionality
        const loginModal = document.getElementById('loginModal');
        const loginBtn = document.getElementById('loginBtn');
        const closeModal = document.getElementById('closeModal');
        const loginForm = document.getElementById('loginForm');
        const userMenu = document.getElementById('userMenu');
        const userAvatar = document.getElementById('userAvatar');
        const userDropdown = document.getElementById('userDropdown');
        const logoutBtn = document.getElementById('logoutBtn');

        // Check if user is logged in
        let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        let userName = localStorage.getItem('userName') || '';

        function updateUIForLoggedInUser() {
            loginBtn.style.display = 'none';
            userMenu.style.display = 'block';
            
            if (userName) {
                userAvatar.textContent = userName.charAt(0).toUpperCase();
            }
        }

        function updateUIForLoggedOutUser() {
            loginBtn.style.display = 'flex';
            userMenu.style.display = 'none';
        }

        // Initialize UI based on login state
        if (isLoggedIn) {
            updateUIForLoggedInUser();
        }

        // Open login modal
        loginBtn.addEventListener('click', () => {
            loginModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        // Close login modal
        closeModal.addEventListener('click', () => {
            loginModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        // Close modal when clicking outside
        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                loginModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Toggle user dropdown
        userAvatar.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!userMenu.contains(e.target)) {
                userDropdown.classList.remove('active');
            }
        });

        // Handle login form submission
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('emailInput').value;
            const password = document.getElementById('passwordInput').value;
            
            // Simulate login (in real app, this would be an API call)
            if (email && password) {
                // Extract name from email
                const name = email.split('@')[0];
                
                // Save login state
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userName', name);
                
                // Update UI
                userName = name;
                isLoggedIn = true;
                updateUIForLoggedInUser();
                
                // Close modal
                loginModal.classList.remove('active');
                document.body.style.overflow = 'auto';
                
                // Reset form
                loginForm.reset();
                
                // Show success message
                alert(`歡迎回來，${name}！`);
            }
        });

        // Handle logout
        logoutBtn.addEventListener('click', () => {
            // Clear login state
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userName');
            
            // Update UI
            isLoggedIn = false;
            userName = '';
            updateUIForLoggedOutUser();
            
            // Close dropdown
            userDropdown.classList.remove('active');
            
            // Show message
            alert('您已成功登出');
        });

        // Register link (opens modal in register mode)
        document.getElementById('registerLink').addEventListener('click', (e) => {
            e.preventDefault();
            alert('註冊功能將在此處實現。在實際應用中，這將打開註冊表單或導航至註冊頁面。');
        });

        // Social login buttons (demo only)
        document.querySelectorAll('.social-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const provider = btn.textContent.includes('Google') ? 'Google' : 
                               btn.textContent.includes('Facebook') ? 'Facebook' : 'Apple';
                alert(`${provider} 社交登入功能將在此處實現`);
            });
        });

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe product cards
        document.querySelectorAll('.product-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `all 0.6s ease ${index * 0.1}s`;
            observer.observe(card);
        });

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href !== '#' && href.length > 1) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });

        // Parallax effect for hero
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.carousel-slide.active');
            if (parallax) {
                parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });