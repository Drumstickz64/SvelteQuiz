<script lang="ts">
	import { questionStore } from "./stores"
	import Header from "./components/Header.svelte"
	import Footer from "./components/Footer.svelte"
	import Question from "./components/Question.svelte"
	import Bouncer from "./shared/Bouncer.svelte"
	import Splitter from "./shared/Splitter.svelte"
	
	let score = 0
	let lives = 3
	let sessionToken
	let difficulty = "easy"
	
	// automatic subscription
	let questions: object[]
	let currentQuestion: undefined|object
	
	$: questions = $questionStore
	
	const setup = async () => {
		sessionToken = await questionStore.getSessionToken()
		await questionStore.loadQuestions(difficulty, sessionToken)
		displayNextQuestion()
	}
	
	const handleAnswer = (ev: CustomEvent): void => {
		if (ev.detail.playerCorrect) {
			score++
			scaleDifficulty()
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
			currentQuestion = questions.shift()
			if (questions.length <= 3 && questions.length > 0) {
				questionStore.loadQuestions(difficulty, sessionToken)
			}
		}, 1200)
	}
	
	const scaleDifficulty = () => {
			if (score < 10) {
				difficulty = "easy"
			} else if (score < 20) {
				difficulty = "medium"
			} else {
				difficulty = "hard"
			}
	}
	
	const reset = () => {
		window.location.reload()
	}
</script>

<Header></Header>

<main>
	{#await setup()}
		<Bouncer></Bouncer>
	{:then}
		<Splitter>
			<h3 id="score">Score: { score }</h3>
			<h3 id="lives">Lives: { lives }</h3>
		</Splitter>
		
		{#if currentQuestion}
			<Question
				on:answer="{ handleAnswer }"
				{...currentQuestion}
			></Question>
		{/if}
	{:catch}
		<p>sorry. something went wrong 😖</p>
	{/await}
</main>

<Footer></Footer>

<style>
	main {
		width: 85%;
		max-width: 75rem;
		min-height: 100%;
		margin: 1.2rem auto 10rem;
		padding: 0 0.5em;
	}
	
	:global(.bouncer) {
		margin: 3.25rem auto;
	}
	
	#score, #lives {
		font-weight: 700;
		font-size: 1.2rem;
		margin: 0 0 0.5em;
	}
</style>