import mysql from 'mysql2/promise'

const db = await mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: '',
	database: 'freedom_wall',
})

export async function getAllPosts() {
	const results = await db.query('SELECT * FROM `posts` WHERE archived = 0')
	return results
}

export async function getAllPostsByUser(userId) {
	const results = await db.query('SELECT * FROM `posts` WHERE user_id = ? AND archived = 0', [userId])
	return results
}

export async function getSinglePost(postId) {
	const results = await db.query('SELECT * FROM `posts` WHERE post_id = ?', [postId])
	return results
}

export async function checkUserInDb(userId) {
	const results = await db.query('SELECT COUNT(*) FROM `users` WHERE `user_id` = ?', [userId])
	return results
}

export async function getUserIdByPostId(postId) {
	const results = await db.query('SELECT user_id FROM `posts` WHERE post_id = ?', [postId])
	return results
}

export async function addUserToDb(userId, joinDate) {
	await db.query('INSERT INTO `users` (user_id, join_date) VALUES (?, ?)', [userId, joinDate])
}

export async function addPostToDb(title, desc, postId, datePosted, edited, userId) {
	await db.query(
		'INSERT INTO `posts` (title, post_desc, post_id, date_posted, edited, user_id) VALUES (?, ?, ?, ?, ?, ?)',
		[title, desc, postId, datePosted, edited, userId]
	)
}

export async function editPost(title, desc, edited, postId) {
	await db.query('UPDATE `posts` SET title = ?, post_desc = ?, edited = ? WHERE post_id = ?', [title, desc, edited, postId])
}

export async function archivePost(postId) {
	await db.query('UPDATE `posts` SET archived = 1 WHERE post_id = ?', [postId])
}


// export async function getAllPosts() {
// 	const db = await mysql.createConnection({
// 		host: '127.0.0.1',
// 		user: 'root',
// 		password: '',
// 		database: 'server_testing',
// 	})
// 	return db.query(
// 		'SELECT * FROM `posts` WHERE archived = 0',
// 		[],
// 		function (err, results) {
// 			if (!err) {
// 				console.log(results)
// 				return results
// 			} else {
// 				console.log(err)
// 				return err
// 			}
// 		}
// 	)
// }

// export async function getAllPostsByUser(userId) {
// 	const db = await mysql.createConnection({
// 		host: '127.0.0.1',
// 		user: 'root',
// 		password: '',
// 		database: 'server_testing',
// 	})
// 	return db.query(
// 		'SELECT * FROM `posts` WHERE user_id = ? AND archived = 0',
// 		[userId],
// 		function (err, results) {
// 			if (!err) {
// 				console.log(results)
// 				return results
// 			} else {
// 				console.log(err)
// 				return err
// 			}
// 		}
// 	)
// }

// export async function getSinglePost(postId) {
// 	const db = await mysql.createConnection({
// 		host: '127.0.0.1',
// 		user: 'root',
// 		password: '',
// 		database: 'server_testing',
// 	})
// 	return db.query(
// 		'SELECT * FROM `posts` WHERE post_id = ?',
// 		[postId],
// 		function (err, results) {
// 			if (!err) {
// 				console.log(results)
// 				return results
// 			} else {
// 				console.log(err)
// 				return err
// 			}
// 		}
// 	)
// }

// export async function checkUserInDb(userId) {
// 	const db = await mysql.createConnection({
// 		host: '127.0.0.1',
// 		user: 'root',
// 		password: '',
// 		database: 'server_testing',
// 	})
// 	return db.query(
// 		'SELECT COUNT(*) FROM `users` WHERE `user_id` = ?', [userId],
// 		function (err, results) {
// 			if (!err) {
// 				console.log(results)
// 				return results
// 			} else {
// 				console.log(err)
// 				return err
// 			}
// 		}
// 	)
// }

// export async function getUserIdByPostId(postId) {
// 	const db = await mysql.createConnection({
// 		host: '127.0.0.1',
// 		user: 'root',
// 		password: '',
// 		database: 'server_testing',
// 	})
// 	return db.query(
// 		'SELECT user_id FROM `posts` WHERE post_id = ?',
// 		[postId],
// 		function (err, results) {
// 			if (!err) {
// 				return results
// 			} else {
// 				console.log(err)
// 				return err
// 			}
// 		}
// 	)
// }

// export async function addUserToDb(userId, joinDate) {
// 	const db = await mysql.createConnection({
// 		host: '127.0.0.1',
// 		user: 'root',
// 		password: '',
// 		database: 'server_testing',
// 	})
// 	return db.query(
// 		'INSERT INTO `users` (user_id, join_date) VALUES (?, ?)',
// 		[userId, joinDate],
// 		function (err, results) {
// 			if (!err) {
// 				console.log(results)
// 			} else {
// 				console.log(err)
// 			}
// 		}
// 	)
// }

// export async function addPostToDb(title, desc, postId, datePosted, edited, userId) {
// 	const db = await mysql.createConnection({
// 		host: '127.0.0.1',
// 		user: 'root',
// 		password: '',
// 		database: 'server_testing',
// 	})
// 	return db.query(
// 		'INSERT INTO `posts` (title, post_desc, post_id, date_posted, edited, user_id) VALUES (?, ?, ?, ?, ?, ?)',
// 		[title, desc, postId, datePosted, edited, userId],
// 		function (err, results) {
// 			if (!err) {
// 				console.log(results)
// 			} else {
// 				console.log(err)
// 			}
// 		}
// 	)
// }

// export async function editPost(title, desc, edited, postId) {
// 	const db = await mysql.createConnection({
// 		host: '127.0.0.1',
// 		user: 'root',
// 		password: '',
// 		database: 'server_testing',
// 	})
// 	return db.query(
// 		'UPDATE `posts` SET title = ?, post_desc = ?, edited = ? WHERE post_id = ?',
// 		[title, desc, edited, postId],
// 		function (err, results) {
// 			if (!err) {
// 				console.log(results)
// 			} else {
// 				console.log(err)
// 			}
// 		}
// 	)
// }

// export async function archivePost(postId) {
// 	const db = await mysql.createConnection({
// 		host: '127.0.0.1',
// 		user: 'root',
// 		password: '',
// 		database: 'server_testing',
// 	})
// 	return db.query(
// 		'UPDATE `posts` SET archived = 1 WHERE post_id = ?',
// 		[postId],
// 		function (err, results) {
// 			if (!err) {
// 				console.log(results)
// 			} else {
// 				console.log(err)
// 			}
// 		}
// 	)
// }