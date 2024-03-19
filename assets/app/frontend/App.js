if (!sessionStorage.getItem('currentUser')) {
	location.pathname = '/'
}

import { fetchPostsData, getPosterId, deletePost } from "./async.js"

const postContainer = document.querySelector('.posts-list')
const showIdButton = document.querySelector('.show-my-id')
const showIdModal = document.querySelector('.id-modal')
const idModalCloseButton = document.querySelector('.close-id')
const currentUserId = document.querySelector('.user-id')

showIdButton.addEventListener('click', () => {
	showIdModal.showModal()
	currentUserId.innerText = sessionStorage.getItem('currentUser')
})

idModalCloseButton.addEventListener('click', () => {
	showIdModal.close()
})

const postsData = (await fetchPostsData())[0]
if (postsData.length === 0) {
	const noPostsNotif = document.createElement('div')
	noPostsNotif.classList.add('no-post')
	noPostsNotif.classList.add('card')
	noPostsNotif.innerText = 'No posts yet. Will you do the honors?'
	postContainer.appendChild(noPostsNotif)
} else {
	for (let i = postsData.length - 1; i >= 0; i--) {
		const post = postsData[i]

		const postElement = document.createElement('div')
		postElement.classList.add('post')
		postElement.id = post.post_id

		const postTop = document.createElement('div')
		postTop.classList.add('post-top')

		const postTitle = document.createElement('h2')
		postTitle.classList.add('post-title')
		postTitle.innerText = post.title

		const postOptions = document.createElement('img')
		postOptions.src = '../../assets/images/more.png'
		postOptions.classList.add('post-options')

		const dateAndStatus = document.createElement('div')
		dateAndStatus.classList.add('date-and-status')

		const datePosted = document.createElement('div')
		datePosted.classList.add('date-posted')
		datePosted.textContent = `Posted: ${post.date_posted}`

		const editStatus = document.createElement('div')
		editStatus.classList.add('edit-status')
		if (post.edited) {
			editStatus.textContent = '(Edited)'
		}

		const postDesc = document.createElement('div')
		postDesc.classList.add('post-desc')
		postDesc.innerText = post.post_desc

		postTop.appendChild(postTitle)
		postTop.appendChild(postOptions)

		dateAndStatus.appendChild(datePosted)
		dateAndStatus.appendChild(editStatus)

		postElement.appendChild(postTop)
		postElement.appendChild(dateAndStatus)
		postElement.appendChild(postDesc)
		postContainer.appendChild(postElement)
	}
}

const optionsModal = document.querySelector('.options-modal')
const errorModal = document.querySelector('.error-modal')
const closeErrorModal = errorModal.querySelector('.close')
const editPost = document.querySelector('.edit')
const deleteButton = document.querySelector('.delete')
const closeModal = document.querySelector('.close')
const posts = document.querySelectorAll('.post')
let currentSelectedPostId

posts.forEach((post) => {
	const postOptions = post.querySelector('.post-options')

	postOptions.addEventListener('click', () => {
		optionsModal.showModal()
	})

	post.addEventListener('click', () => {
		currentSelectedPostId = post.id
	})
})

editPost.addEventListener('click', async () => {
	console.log('le post id: ', currentSelectedPostId)
	if (sessionStorage.getItem('currentUser') === ((await getPosterId(currentSelectedPostId)).userId)) {
		sessionStorage.setItem('postToEdit', currentSelectedPostId)
		location.pathname = '/edit-post.html'
	} else {
		errorModal.showModal()
	}
})

deleteButton.addEventListener('click', async () => {
	if (sessionStorage.getItem('currentUser') === ((await getPosterId(currentSelectedPostId)).userId)) {
		await deletePost(currentSelectedPostId)
		location.reload()
	} else {
		errorModal.showModal()
	}

})

closeModal.addEventListener('click', () => {
	optionsModal.close()
})

closeErrorModal.addEventListener('click', () => {
	errorModal.close()
})