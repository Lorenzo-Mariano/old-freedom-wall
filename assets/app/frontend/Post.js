export class Post {
	constructor(title, description, postId, postedBy) {
		this.title = title
		this.description = description
		this.postId = postId
		this.datePosted = new Date()
		this.postedBy = postedBy
		this.edited = false
	}
}