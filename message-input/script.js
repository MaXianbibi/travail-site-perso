function getMessage() {

document.getElementById('message').innerHTML = document.getElementById('input').value || 'write something . . .';

document.getElementById('input').value = '';

}