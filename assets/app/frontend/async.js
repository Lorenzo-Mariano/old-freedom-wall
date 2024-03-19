// POSTS DATA

export async function fetchPostsData() {
	const response = await fetch('http://127.0.0.1:3000/all-posts')
	return response.json()
}

export async function deletePost(postId) {
	await fetch(`http://127.0.0.1:3000/delete-post/:${postId}`)
}

export async function getPostData(postId) {
	const response = await fetch(`http://127.0.0.1:3000/post-data/:${postId}`)
	return response.json()
}

export async function sendEditData(postId, postTitle, postDesc) {
	await fetch(`http://127.0.0.1:3000/edit-post/:${postId}/:${postTitle}/:${postDesc}`)
}

export async function pushPostToDb(postObj) {
	await fetch('http://127.0.0.1:3000/add-post', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(postObj)
	})
}

export async function fetchMyPosts(userId) {
	const response = await fetch(`http://127.0.0.1:3000/all-posts/:${userId}`)
	return response.json()
}

// USER/S DATA

export async function sendUserToDb(userObj) {
	await fetch('http://127.0.0.1:3000/create-user', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(userObj)
	})
}

export async function getPosterId(postId) {
	const response = await fetch(`http://127.0.0.1:3000/userId-by-postId/:${postId}`)
	return response.json()
}

export async function userInDb(userId) {
	const response = await fetch(`http://127.0.0.1:3000/check-user/:${userId}`)
	return response.json();
}

// BOTH

export async function createId() {
	const response = await fetch('http://127.0.0.1:3000/create-id')
	return response.json()
}