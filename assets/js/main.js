/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 

/* ===== WORK MODAL ===== */
const workLinks = document.querySelectorAll('.work__img');
const modal = document.getElementById('work-modal');
const modalImg = document.getElementById('modal-img');
const modalCaption = document.getElementById('modal-caption');
const modalRepo = document.getElementById('modal-repo');
const modalClose = document.getElementById('modal-close');
const modalBackdrop = document.getElementById('modal-backdrop');

if(workLinks && modal){
    workLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const src = link.getAttribute('data-src') || (link.querySelector('img') && link.querySelector('img').src);
            const caption = link.getAttribute('data-caption') || (link.querySelector('p') && link.querySelector('p').innerText) || '';
            const repo = link.getAttribute('data-repo');
            if(src){
                modalImg.src = src;
                modalImg.alt = caption;
                modalCaption.textContent = caption;
                if(modalRepo){
                    if(repo){
                        modalRepo.href = repo;
                        modalRepo.style.display = 'inline-block';
                    }else{
                        modalRepo.href = '#';
                        modalRepo.style.display = 'none';
                    }
                }
                modal.classList.add('show');
                modal.setAttribute('aria-hidden','false');
            }
        });
    });

    function closeModal(){
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden','true');
        modalImg.src = '';
        if(modalRepo){
            modalRepo.href = '#';
            modalRepo.style.display = 'none';
        }
    }

    modalClose && modalClose.addEventListener('click', closeModal);
    modalBackdrop && modalBackdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal(); });
}
