import { getPostData, sendEditData } from "./async.js"

const postTitleInput = document.querySelector('.title')
const postDescInput = document.querySelector('.description')
const cancelButton = document.querySelector('.cancel')
const saveButton = document.querySelector('.submit-post')

const currentPostObj = await getPostData(sessionStorage.getItem('postToEdit'))

postTitleInput.value = currentPostObj.title
postDescInput.value = currentPostObj.post_desc

cancelButton.addEventListener('click', () => {
	sessionStorage.removeItem('postToEdit')
	location.pathname = '/home.html'
})

saveButton.addEventListener('click', async () => {
	const resultOfEdit = await sendEditData(currentPostObj.post_id, encodeURIComponent(postTitleInput.value), encodeURIComponent(postDescInput.value))
	console.log(resultOfEdit)
	sessionStorage.removeItem('postToEdit')
	location.pathname = '/home.html'
})
