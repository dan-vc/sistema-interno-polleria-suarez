document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#toggle-sidebar').addEventListener('click', () => {
        document.querySelector('.sidebar').classList.add('open');

        const backdrop = document.createElement('div');
        backdrop.id = "backdrop";
        document.body.appendChild(backdrop);


        backdrop.addEventListener('click', () => {
            document.querySelector('.sidebar').classList.remove('open');
            backdrop.remove();
        })
    })
})


