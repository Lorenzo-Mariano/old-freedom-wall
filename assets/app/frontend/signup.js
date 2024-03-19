import { User } from "./User.js"
import { sendUserToDb, createId } from "./async.js"

const generateIdButton = document.querySelector('.generate-id')

generateIdButton.addEventListener('click', async () => {
	const newIdObj = await createId()
	await sendUserToDb(new User(newIdObj.id))
	sessionStorage.setItem('currentUser', `${newIdObj.id}`)
	location.pathname = '/your-new-id.html'
})