import { writable } from "svelte/store"
import axios from "axios"

const QuestionStore = (): object => {
	const { subscribe, update } = writable([])
	
	return {
	 	subscribe,
	 	getSessionToken: async (): Promise<string> => {
	 		const res = await axios.get("https://opentdb.com/api_token.php?command=request")
	 		return res.data.token
	 	},
		loadQuestions: async (difficulty: string, token: string): Promise<void> => {
			console.log("fetching questions")
			const req = await axios.get(`https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&token=${token}`)
			update(questions => [...questions, ...req.data.results])
		} 
	}
}

const questionStore = QuestionStore()

export {
	questionStore
}