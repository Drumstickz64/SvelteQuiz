import { writable } from "svelte/store"

class QuestionStore extends writable {
	constructor() {
		super([
			{
				category:"Entertainment: Television",
				type:"multiple",
				difficulty:"easy",
				question:"In the original Star Trek TV series, what was Captain James T. Kirk&#039;s middle name?",
				correctAnswer:"Tiberius jebdnebe bdbdnenebebebe bebebw bwbwbwbw bwbewjebdjwb djebeje",
				incorrectAnswers:["Trevor","Travis","Tyrone"]
			},
			{
				category:"Entertainment: Music",
				type:"multiple",
				difficulty:"easy",
				question:"What is the name of the album released in 2014 by American band Maroon 5?",
				correctAnswer:"V",
				incorrectAnswers:["X","III","IV"]
			}
		])
	}
	
	// loadQuestions(difficulty: string): object[]  {
		
	// }
}

const questionStore = new QuestionStore()

export {
	questionStore
}