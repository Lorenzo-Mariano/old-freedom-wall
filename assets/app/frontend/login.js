const fetchUserId = document.querySelector('.user-id-input')
const submitButton = document.querySelector('.submit-id')
const errorWarning = document.querySelector('.error')

import { userInDb } from "./async.js"

submitButton.addEventListener('click', async () => {
	const queryResult = (await userInDb(fetchUserId.value))[0][0]['COUNT(*)']

	if (queryResult > 0) {
		sessionStorage.setItem('currentUser', `${fetchUserId.value}`)
		fetchUserId.value = ''
		window.location.pathname = '/home.html'
	} else {
		errorWarning.innerText = 'Invalid ID. Please try again.'
		fetchUserId.value = ''
	}
})