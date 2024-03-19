const newIdContainer = document.querySelector('.new-id')
const goHomeButton = document.querySelector('.to-home')
const currentUser = sessionStorage.getItem('currentUser')

newIdContainer.innerText = currentUser
goHomeButton.addEventListener('click', () => {
	location.pathname = '/home.html'
})
