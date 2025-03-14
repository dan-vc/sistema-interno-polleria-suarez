import { users } from '/data/db.js';
const userId = localStorage.getItem('user-id')

const user = users.find(user =>
    user.id == userId
)

document.getElementById('user-name').innerHTML = user.name;