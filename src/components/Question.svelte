<script lang="ts">
	export let correctAnswer: string
	export let incorrectAnswers: string[]
	
	let answers = [...incorrectAnswers, correctAnswer]
	// shuffle the answers
	answers = answers.sort((f, l) => Math.random() - 0.5)
	
	let isCorrect;
	let isIncorrect;
</script>

<div class="questions">
	{#each answers as answer}
		<button
			data-answer="{ answer }"
			class:success={isCorrect}
			class:failure={isIncorrect}
		>
			{ answer }
		</button>
	{/each}
</div>

<style>
	.questions > button + button {
		margin-top: 1.4rem;
	}
	
	@media only screen and (min-width: 48rem) {
		.questions {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 1rem;
		}
		
		.questions > button + button {
			margin-top: 0;
		}
	}
	
	button {
		display: block;
		width: 100%;
		padding: 1em 2em;
		border: 2px solid var(--primary-clr-dark);
		font-weight: 700;
		color: white;
		background: var(--primary-clr);
	}
	
	button:hover {
		background: var(--primary-clr-dark);
	}
	
	button.success {
		background: #32ed32;
		border-color: #13c513;
	}
	button.success:hover {
		background: #13c513;
	}
	
	button.failure {
		background: #f03535;
		border-color: #bc1010;
	}
	
	button:hover {
		background: #bc1010;
	}
</style>