(() => {
    if(localStorage.getItem('hi-auth'))
        window.location = './dashboard.html';
})();
document.querySelector('#loginBtn').addEventListener('click', () => {
    let email = document.querySelector('#loginEmail').value;
    let password = document.querySelector('#loginPassword').value;
    fetch('./api/users/login', {
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
        if(data.status === 404)
            throw new Error("Sorry, provided credentials are wrong!");
            
        localStorage.setItem("hi-auth", data.headers.get('x-auth'));
        window.location = './';
    })
    .catch(err => alert(err))
});