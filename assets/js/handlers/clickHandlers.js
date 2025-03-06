
export function handleModalCloseClick() {
    document.querySelector('.modal').remove();
    document.querySelector('.modal-overlay').remove();
    document.body.style.overflow = 'visible';
}

export function navigationClick() {
    document.querySelector('nav').removeEventListener('click', navigationClickHandler);
    document.querySelector('nav').addEventListener('click', navigationClickHandler);
}

function navigationClickHandler(e){
    const clickedElement = e.target.closest('.nav-item');
    const page = clickedElement.querySelector('span').innerHTML.toLowerCase().trim();
    if(clickedElement) controlNavigationItemsState(page)
}

export function controlNavigationItemsState(page = 'home'){
    const iconPathName = './assets/media/icons';

    const navItems = document.querySelectorAll('.nav-item');
    const navIcons = document.querySelectorAll('.nav-icon');

    const icons = ['home', 'classes', 'students', 'summary'];

    if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
        navIcons.forEach((icon, i)=>{
            icon.src = `${iconPathName}/${icons[i]}-secondary-400.png`;
            navItems[i].classList.remove('active');

            // Style the active page nav item
            if(icons[i] === page) {
                icon.src = `${iconPathName}/${icons[i]}-primary-400-active.png`;
                navItems[i].classList.add('active');
            }
        });
    } else {
        navIcons.forEach((icon, i)=>{
            icon.src = `${iconPathName}/${icons[i]}-secondary-500.png`;
            navItems[i].classList.remove('active');
            
            // Style the active page nav item
            if(icons[i] === page) {
                icon.src = `${iconPathName}/${icons[i]}-primary-500-active.png`;
                navItems[i].classList.add('active');
            }
        });
    }
}