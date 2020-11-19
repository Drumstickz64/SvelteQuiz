import { writable } from "svelte/store"
import axios from "axios"

const questionStore = ((): object => {
	const { subscribe, update } = writable([])
	
	return {
	 	subscribe,
	 	getSessionToken: async (): Promise<string> => {
	 		let token: string|null = localStorage.sessionToken || null
	 		
	 		if (!token) {
	 			const res = await axios.get("https://opentdb.com/api_token.php?command=request")
	 			token = res.data.token
	 			localStorage.sessionToken = token
	 		}
	 		
	 		return token
	 	},
		loadQuestions: async (difficulty: string, token: string): Promise<void> => {
			const req = await axios.get(`https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&token=${token}`)
			update(questions => [...questions, ...req.data.results])
		} 
	}
}())

export {
	questionStore
}