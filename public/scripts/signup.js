(() => {
    if(localStorage.getItem('hi-auth'))
        window.location = './dashboard.html';
})();
document.querySelector('#signupBtn').addEventListener('click', () => {
    let email = document.querySelector('#loginEmail').value;
    let password = document.querySelector('#loginPassword').value;
    fetch('/api/users', {
        body: JSON.stringify({
            email, 
            password
        }),
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(data => {
        if(data.code === 11000)
            throw new Error("Sorry, account on this email already exists.");
            
        localStorage.setItem("hi-auth", data.headers.get('x-auth'));
        window.location = './dashboard.html';
    })
    .catch(err => alert(err))
});