import { writable } from "svelte/store"
import axios from "axios"

const QuestionStore = (): object => {
	const { subscribe, update } = writable([])
	
	return {
	 	subscribe,
		loadQuestions: async (difficulty: string): Promise<void> => {
			const req = await axios.get(`https://opentdb.com/api.php?amount=10&difficulty=${difficulty}`)
			update(questions => [...questions, ...req.data.results])
		} 
	}
}

const questionStore = QuestionStore()

export {
	questionStore
}