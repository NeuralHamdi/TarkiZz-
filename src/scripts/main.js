function headerLoader(){
    fetch('../layouts/Header.html')
    .then(response => response.text()) //converting the response to text 
    .then(data => {
        document.querySelector('header').innerHTML = data   
    })
    .catch(error => {
        console.error('erreur loading the header page :',error);
    });
}

document.addEventListener('DOMContentLoaded' , headerLoader);