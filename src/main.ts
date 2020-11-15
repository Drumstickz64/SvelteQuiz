import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		item: {
			category:"Entertainment: Television",
			type:"multiple",
			difficulty:"easy",
			question:"In the original Star Trek TV series, what was Captain James T. Kirk&#039;s middle name?",
			correctAnswer:"Tiberius jebdnebe bdbdnenebebebe bebebw bwbwbwbw bwbewjebdjwb djebeje",
			incorrectAnswers:["Trevor","Travis","Tyrone"]
		}
	}
});

export default app;