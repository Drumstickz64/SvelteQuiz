<script lang="ts">
	import { questionStore } from "./stores"
	import Header from "./components/Header.svelte"
	import Footer from "./components/Footer.svelte"
	import Question from "./components/Question.svelte"
	
	let score = 0
	let lives = 3
	
	// automatic subscription
	let questions: object[] = $questionStore
	let currentQuestionIndex = -1
	let currentQuestion
	
	
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
		currentQuestion = undefined
		setTimeout(() => {
			currentQuestionIndex++
			currentQuestion = questions[currentQuestionIndex]
		}, 1200)
	}
	
	const reset = () => {
		alert("reset")
	}
	
	displayNextQuestion()
</script>

<Header></Header>

<main>
	<div class="splitter">
		<h3 id="score">Score: { score }</h3>
		<h3 id="lives">Lives: { lives }</h3>
	</div>
	
	{#if currentQuestion}
		<Question
			on:answer="{ handleAnswer }"
			{...currentQuestion}
		></Question>
	{/if}
</main>

<Footer></Footer>

<style>
	main {
		width: 85%;
		max-width: 75rem;
		margin: 1.2rem auto 10rem;
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