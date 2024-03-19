if (!sessionStorage.getItem('currentUser')) {
	location.pathname = '/'
}

import { Post } from "./Post.js"
import { pushPostToDb, createId } from "./async.js"

const errorBox = document.querySelector('.error')
const titleInput = document.querySelector('.title')
const descInput = document.querySelector('.description')
const submitButton = document.querySelector('.submit-post')

submitButton.addEventListener('click', async () => {
	if (titleInput.value && descInput.value) {

		const currentUser = sessionStorage.getItem('currentUser')
		const newIdObj = await createId()
		const postObj = new Post(titleInput.value, descInput.value, newIdObj.id, currentUser)

		await pushPostToDb(postObj)
		location.pathname = '/home.html'
	} else {
		setTimeout(() => {
			errorBox.innerText = ''
		}, 5000)
		errorBox.innerText = 'Both fields required'
	}
})