document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#toggle-sidebar').addEventListener('click', () => {
        document.querySelector('.sidebar').classList.add('open');

        const backdrop = document.createElement('div');
        backdrop.style.width = '100%';
        backdrop.style.height = '100%';
        backdrop.style.position = 'fixed';
        backdrop.style.top = '0';
        backdrop.style.left = '0';
        backdrop.style.zIndex = '998';
        backdrop.style.background = 'rgb(0, 0, 0, 0.5)';

        document.body.appendChild(backdrop);


        backdrop.addEventListener('click', () => {
            document.querySelector('.sidebar').classList.remove('open');
            backdrop.remove();
        })
    })
})


