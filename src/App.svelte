<script lang="ts">
	import { questionStore } from "./stores"
	import Header from "./components/Header.svelte"
	import Footer from "./components/Footer.svelte"
	import Question from "./components/Question.svelte"
	
	let score = 0
	let lives = 3
	
	let questions: object[] = $questionStore
	let currentQuestionIndex = 0

	
	const handleAnswer = (ev: CustomEvent): void => {
		if (ev.detail.playerCorrect) {
			score++
			displayNextQuestion()
		} else {
			lives--;
			
			if (lives === 0) {
				reset()
			} else {
				displayNextQuestion()
			}
		}
	}
	
	const displayNextQuestion = () => {
		currentQuestionIndex++
	}
	
	const reset = () => {
		alert("reset")
	}
</script>

<Header></Header>

<main>
	<div class="splitter">
		<h3 id="score">Score: { score }</h3>
		<h3 id="lives">Lives: { lives }</h3>
	</div>
	
	<Question on:answer="{ handleAnswer }" {...questions[currentQuestionIndex]}></Question>
</main>

<Footer></Footer>

<style>
	main {
		width: 85%;
		max-width: 75rem;
		margin: 1.2rem auto;
		padding: 0 0.5em;
	}
	
	.splitter {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	#score, #lives {
		font-weight: 700;
		font-size: 1.2rem;
		margin: 0 0 0.5em;
	}
</style>