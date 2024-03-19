import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { v4 } from 'uuid'
import bodyParser from 'body-parser'
import moment from 'moment/moment.js'

import {
	getAllPosts,
	getAllPostsByUser,
	checkUserInDb,
	addUserToDb,
	addPostToDb,
	getUserIdByPostId,
	getSinglePost,
	editPost,
	archivePost
} from './database.js'

const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use(morgan("tiny"))


// SHOW ALL POSTS
app.get('/all-posts', async function (req, res) {
	try {
		const postsData = await getAllPosts()
		res.send(postsData)
	} catch (error) {
		res.send(error)
	}
})

// SHOW ALL POSTS BY CERTAIN USER
app.get('/all-posts/:userId', async function (req, res) {
	try {
		const userId = req.params.userId.slice(1)
		const postsData = await getAllPostsByUser(userId)
		console.log(userId)
		res.send(postsData)
	} catch (error) {
		res.send(error)
	}
})

// GET SINGLE POST DATA BY POST ID
app.get('/post-data/:postId', async function (req, res) {
	try {
		res.send((await getSinglePost(req.params.postId.slice(1)))[0][0])
	} catch (error) {
		res.send(error)
	}
})

// CHECK IF USER EXISTS
app.get('/check-user/:userId', async function (req, res) {
	try {
		res.send(await checkUserInDb(req.params.userId.slice(1)))
	} catch (error) {
		res.send(error)
	}
})

// CREATE ID
app.get('/create-id', function (req, res) {
	try {
		const newId = v4()
		res.send({ id: newId })
	} catch (error) {
		res.send(error)
	}
})

// FIND USER ID BY POST ID
app.get('/userId-by-postId/:postId', async function (req, res) {
	try {
		res.send({ userId: (await getUserIdByPostId(req.params.postId.slice(1)))[0][0].user_id })
	} catch (err) {
		console.log(err)
	}
})

// CREATE USER
app.post('/create-user', async function (req, res) {
	try {
		const newUser = req.body
		const dateJoined = moment(newUser.joinDate).format('MMM DD, yyyy - h:mm a')
		await addUserToDb(newUser.userId, dateJoined)
		res.send(newUser)
	} catch (error) {
		console.log(error)
		res.send(error)
	}
})

// CREATE POST
app.post('/add-post', async function (req, res) {
	try {
		const postObj = req.body
		const datePosted = moment(postObj.datePosted).format('MMM DD, yyyy - h:mm a')
		await addPostToDb(postObj.title, postObj.description, postObj.postId, datePosted, postObj.edited, postObj.postedBy)
		res.send(postObj)
	} catch (error) {
		console.log(error)
	}
})

// UPDATE POST
app.get('/edit-post/:postId/:postTitle/:postDesc', async function (req, res) {
	try {
		const title = decodeURIComponent(req.params.postTitle.slice(1))
		const desc = decodeURIComponent(req.params.postDesc.slice(1))
		const edited = true
		const postId = req.params.postId.slice(1)

		const updateResult = await editPost(title, desc, edited, postId)
		console.log(title, desc, edited, postId)
		res.send(updateResult)
	} catch (error) {
		console.log(error)
	}
})

// ARCHIVE POST
app.get('/delete-post/:postId', async function (req, res) {
	try {
		const postId = req.params.postId.slice(1);
		const archiveResults = await archivePost(postId);
		res.send(archiveResults);
	} catch (error) {
		console.log(error)
	}
});

app.listen(3000)