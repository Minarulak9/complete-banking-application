const btnLearnMore = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('.section1');
const section3 = document.querySelector('.section3');
const header = document.querySelector('header');
const lazyImg = document.querySelectorAll('.lazy-img');
const featureText = document.querySelectorAll('.feature-text');
const btnTop = document.querySelector('.go-top');
const navCon = document.querySelector('.list-items');
const btnOperationCon = document.querySelector('.instant-btns')
const btnsOperation = document.querySelectorAll('.op-btn')
const operationCon = document.querySelector('.op-container')
const nav = document.querySelector("#nav")
const slides = document.querySelectorAll('.slide')
const sliderContainer = document.querySelector('.slider-con')
const dots = document.querySelector('.dots')
const testimonialData = [
    {
        fillColor: '#ffcd0331',
        heading: 'Tranfser money to anyone, instantly! No fees, no BS.',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
        fillColor: '#5ec5763a',
        heading: 'Buy a home or make your dreams come true, with instant loans.',
        text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
        fillColor: '#ff58602d',
        heading: 'No longer need your account? No problem! Close it instantly.',
        text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
]
btnLearnMore.addEventListener('click', () => {
    // section1.scrollIntoView({behavior:'smooth'})
    let position = section1.getBoundingClientRect();
    window.scrollTo({ left: position.left + window.scrollX, top: position.top + window.scrollY, behavior: 'smooth' })
})

btnTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
})
navCon.addEventListener('click', (e) => {
    if (e.target.parentElement.classList.contains('link')) {
        e.preventDefault()
        let id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({behavior:'smooth'})
        document.querySelectorAll('.link').forEach(e=>{
            e.firstElementChild.classList.remove('active-item')
        })
        e.target.classList.add('active-item')
    }
})
// =============== nav sticky==============//
const stickyNav= (entries)=>{
    entries.forEach(e=>{
        if (!e.isIntersecting && e.intersectionRatio == 0) {
            nav.classList.add('active')
        }else{
            nav.classList.remove('active')
        }
    })
} 
let navHeight = nav.getBoundingClientRect()
let stickyNavObserver = new IntersectionObserver(stickyNav,{
    root:null,
    threshold:0,
    rootMargin:`-${navHeight.height}px`
})
stickyNavObserver.observe(header)

// ================== tab component ================//
const heading = document.querySelector('.heading');
const text = document.querySelector('.text');
const updateOp = () => {
    btnsOperation.forEach(b => {
        if (b.classList.contains('active-op')) {
            const icon = document.querySelector('.icon svg circle');
            icon.setAttribute('fill', testimonialData[b.dataset.tab - 1].fillColor);
            heading.textContent = testimonialData[b.dataset.tab - 1].heading;
            text.textContent = testimonialData[b.dataset.tab - 1].text;
        }
    })
}
btnOperationCon.addEventListener('click', (e) => {
    btnsOperation.forEach((b) => {
        b.classList.remove('active-op');
    })
    e.target.classList.add('active-op')
    updateOp()
})
// ==================== reviling headers =======================//
const sectionHeder = document.querySelectorAll('.section-header')
const headerRivil = (entries) => {
    if (entries[0].isIntersecting) {
        entries[0].target.classList.remove('header-animation');
        headerObserver.unobserve(entries[0].target)
    }
    
}
let headerObserver = new IntersectionObserver(headerRivil, {
    root: null,
    threshold: .25
})
sectionHeder.forEach((header) => {
    headerObserver.observe(header)
    header.classList.add('header-animation')
})


// =============== feature reviling ===============//
const featureRevil = (entries)=>{
    entries.forEach(e=>{
        if (e.isIntersecting) {
            e.target.querySelector('.img-box').classList.remove('lazy-img')
            e.target.querySelector('.feature-text').classList.remove('para-animation')
            featureRevilObserver.unobserve(e.target)
        }
    })
}
const featureRevilObserver = new IntersectionObserver(featureRevil,{
    root:null,
    threshold:0,
    rootMargin:'-160px'
})
const features = document.querySelectorAll('.feature-card')
features.forEach(f=>{
    featureRevilObserver.observe(f)
    f.querySelector('.img-box').classList.add('lazy-img')
    f.querySelector('.feature-text').classList.add('para-animation')
})

// =================slider ============//
slides.forEach((slide, index)=>{
    dots.insertAdjacentHTML('beforeend',`<span class='dot' data-slide='${index}'>●</span>`)
})

let allDots = dots.querySelectorAll('.dot');

slides.forEach((slide,index) =>{
    slide.style.transform = `translateX(${index*100}%)`
})
let currentSlide = 0;
const rightArrow = document.querySelector('.btn-right')
const leftArrow = document.querySelector('.btn-left')
const goSlide = (slideIndex) =>{
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${(index - slideIndex) * 100}%)`
    })
    allDots.forEach(d=>{
        d.classList.remove('active-dot')
    })
    dots.querySelector(`span[data-slide='${slideIndex}']`).classList.add('active-dot');
    
}

const automaticSlide = setInterval(()=>{
        rightArrow.click()
    },5000)
rightArrow.addEventListener('click', ()=>{
    currentSlide < slides.length - 1 ? currentSlide++ : currentSlide = 0
    goSlide(currentSlide);
    clearInterval(automaticSlide)
})
leftArrow.addEventListener('click',()=>{
    currentSlide > 0 ? currentSlide--:currentSlide = slides.length-1
    goSlide(currentSlide);
    clearInterval(automaticSlide)
})

dots.addEventListener('click',(e)=>{
    allDots.forEach((d,i)=>{
        d.classList.remove('active-dot')
    })
    e.target.classList.add('active-dot')
    goSlide(e.target.dataset.slide)

})
const slideFade = (entries)=>{
    entries.forEach(e=>{
        if (e.isIntersecting) {
            e.target.classList.remove('fade-right')
            slideObserver.disconnect()

        }
    })
} 
let slideObserver = new IntersectionObserver(slideFade,{
    root:null,
    threshold:0,
})
slideObserver.observe(sliderContainer);
const containerFade = (entries)=>{
    entries.forEach(e=>{
        if (e.isIntersecting) {
            e.target.classList.remove('fadeContainer')
            containerObserver.disconnect()
        }
    })
}
let containerObserver = new IntersectionObserver(containerFade,{
    root:null,
    threshold:0,
})
containerObserver.observe(operationCon);

const addOverlay = (entries) =>{
    entries.forEach(e=>{
        if (e.isIntersecting) {
            e.target.querySelector('.add-overlay').classList.add('overlay-active')
            overlayObserver.disconnect()
        }
    })
}
let overlayObserver = new IntersectionObserver(addOverlay,{
    root:null,
    threshold:.40
})
overlayObserver.observe(section3)

// ===========Active Links =========//
let sections = [...document.querySelectorAll('.section')];
sections.unshift(header)
let Links = document.querySelectorAll('.link a') 
const activatingLink = (entries)=>{
    entries.forEach(e=>{
        if (e.isIntersecting && e.intersectionRatio>0 && e.intersectionRatio<1) {
            Links.forEach(l=>{l.classList.remove('active-item')})
            let elmId = e.target.id;
            if (e.target.classList.contains('link-page')) {
                document.querySelector(`a[href='#${elmId}']`).classList.add('active-item') 
            }
        }
    })
}
let activeLinkObserver = new IntersectionObserver(activatingLink,{
    root:null,
    threshold:[0,1],
    rootMargin:'-20px'
})
sections.forEach(sec=>{
    activeLinkObserver.observe(sec)
})