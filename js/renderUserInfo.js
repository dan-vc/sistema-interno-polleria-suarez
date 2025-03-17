import { users } from '/data/db.js';

const userId = localStorage.getItem('user-id')

const user = users.find(user =>
    user.id == userId
)

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('input[name="name"]').value = user.name;
    document.querySelector('input[name="last_name"]').value = user["last-name"];
    document.querySelector('input[name="user_name"]').value = user["user-name"];
    document.querySelector('input[name="email"]').value = user.email;
    document.querySelector('input[name="password"]').value = user.password;
})

