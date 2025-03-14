import { users } from '/data/db.js'
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11.17.2/+esm'

document.getElementById('loginForm').addEventListener('submit', e => {
    e.preventDefault();
    const emailInput = document.getElementById('email')
    const passwordInput = document.getElementById('password')

    const authUser = users.find(user => (
        user.email === emailInput.value && user.password === passwordInput.value
    ))

    if (authUser) {
        localStorage.setItem('user-id', authUser.id);
        window.location = 'dashboard.html';
    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Credenciales incorrectas',
            icon: 'error',
            confirmButtonText: 'Entendido'
          })
    }
})
