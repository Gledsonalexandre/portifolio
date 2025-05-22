// Variáveis globais
const navbar = document.getElementById('navbar');
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const sections = document.querySelectorAll('section');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const skillLevels = document.querySelectorAll('.skill-level');
const contactForm = document.getElementById('contactForm');

// Função para inicializar todas as funcionalidades
function init() {
    setupNavbar();
    setupMobileMenu();
    setupScrollAnimation();
    setupProjectFilter();
    setupContactForm();
    animateSkillBars();
    setupSmoothScroll();
}

// Configuração da barra de navegação
function setupNavbar() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.parentElement.classList.add('scrolled');
        } else {
            navbar.parentElement.classList.remove('scrolled');
        }
        
        // Destacar link de navegação ativo com base na seção visível
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Configuração do menu mobile
function setupMobileMenu() {
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('open');
        navLinks.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('open');
            navLinks.classList.remove('active');
        });
    });
}

// Configuração de animações ao rolar a página
function setupScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    // Observar seções para animação
    document.querySelectorAll('section > .container').forEach(section => {
        observer.observe(section);
    });
}

// Configuração do filtro de projetos
function setupProjectFilter() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover classe ativa de todos os botões
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Adicionar classe ativa ao botão clicado
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Animação das barras de habilidades
function animateSkillBars() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
            }
        });
    }, { threshold: 0.1 });

    skillLevels.forEach(skill => {
        observer.observe(skill);
    });
}

// Configuração do formulário de contato
function setupContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulação de envio de formulário
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
            
            setTimeout(() => {
                // Mostrar mensagem de sucesso
                const formGroups = contactForm.querySelectorAll('.form-group');
                const lastFormGroup = formGroups[formGroups.length - 1];
                
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Mensagem enviada com sucesso!';
                
                contactForm.insertBefore(successMessage, lastFormGroup.nextSibling);
                
                // Limpar formulário
                contactForm.reset();
                
                // Restaurar botão
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                
                // Remover mensagem após alguns segundos
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }, 1500);
        });
    }
}

// Configuração de rolagem suave para links de âncora
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Efeito de digitação para o texto do hero
function typeEffect() {
    const text = "Transformando ideias em soluções digitais inovadoras";
    const typingElement = document.querySelector('.hero-content p');
    
    if (typingElement) {
        typingElement.textContent = '';
        
        let i = 0;
        const typing = setInterval(() => {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
            }
        }, 50);
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    init();
    
    // Adicionar efeito de digitação após um pequeno delay
    setTimeout(typeEffect, 500);
    
    // Adicionar classe para animação inicial
    document.querySelectorAll('section').forEach((section, index) => {
        setTimeout(() => {
            section.classList.add('fade-in');
        }, 300 * index);
    });
});

// Adicionar estilos CSS dinâmicos
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .nav-links a.active {
            color: var(--primary-color);
        }
        
        .nav-links a.active::after {
            width: 100%;
        }
        
        .success-message {
            background-color: rgba(40, 167, 69, 0.1);
            color: var(--success-color);
            padding: 10px;
            border-radius: var(--border-radius);
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .success-message i {
            font-size: 1.2rem;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .fade-in {
            animation: fadeInUp 0.6s ease forwards;
        }
    `;
    document.head.appendChild(style);
}

// Chamar função para adicionar estilos dinâmicos
addDynamicStyles();
