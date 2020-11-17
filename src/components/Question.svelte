<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import { fly, fade } from "svelte/transition"
	import Button from "../shared/Button.svelte"
	
	const dispatch = createEventDispatcher()
	
	export let question: string
	export let correct_answer: string
	export let incorrect_answers: string[]
	
	enum Status {
		neutral = 0,
		pending = 1,
		correct = 2,
		incorrect = 3
	}
	
	// the message that displays when the player picks
	let choiceMsg = ""
	// whether or not the player is correct
	let playerCorrect: bool
	let answers: object[]
		
	$: {
		correct_answer = correct_answer
		choiceMsg = ""
		playerCorrect = undefined
		answers =
			// merge the answers
			[...incorrect_answers, correct_answer]
			// give each answer a status
			.map(answer => {
				return { text: answer, status: Status.neutral }
			})
			// shuffle the answers
			.sort((f, l) => Math.random() - 0.5)
	}
	
	const pickAnswer = (answer: object): void => {
		answers = answers.map(item => {
			return {...item, status: Status.pending}
		})
		
		setTimeout(() => {
			
			answers = answers.map(item => {
				if (item.text === correct_answer) {
					return {...item, status: Status.correct}
				} else {
					return {...item, status: Status.incorrect}
				}
			})
			
			if (answer.text === correct_answer) {
				choiceMsg = "Correct!"
				playerCorrect = true
			} else {
				choiceMsg = "Wrong!"
				playerCorrect = false
			}
			
			setTimeout(() => {
				dispatch("answer", { playerCorrect })
			}, 1000)
		}, 2000)
	}
</script>

<article
	class="box"
	in:fly="{{ x: -1000, duration: 1200 }}"
	out:fly="{{ x: 1000, duration: 1200 }}"
>
	<h2>{@html question }</h2>
	
	<div class="answers">
		{#each answers as answer}
			<Button
				pending="{ answer.status === Status.pending }"
				correct="{ answer.status === Status.correct }"
				incorrect="{ answer.status === Status.incorrect }"
				on:click="{ () => pickAnswer(answer) }"
			>
				{@html answer.text }
			</Button>
		{/each}
	</div>
	<h3
		class:correct="{ playerCorrect }"
		class:incorrect="{ !playerCorrect }"
	>
		{ choiceMsg }
	</h3>
</article>

<style>
	.box {
		background: white;
		box-shadow: var(--shadow-lg);
		padding: 1em;
		border-radius: 0.5em;
	}
	
	h2 {
		color: var(--heading-clr);
		font-size: 1.25rem;
		margin-bottom: 1.25em;
		padding-bottom: 1em;
		border-bottom: 3px solid var(--heading-clr);
	}
	
	:global(.answers > button + button) {
		margin-top: 1.4rem;
	}
	
	@media only screen and (min-width: 48rem) {
		.answers {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 1rem;
		}
		
		:global(.answers > button + button) {
			margin-top: 0;
		}
	}
	
	h3 {
		font-size: 1.5rem;
		margin-top: 1.5em;
		text-align: center;
	}
	
	h3.correct {
		color: var(--green-clr);
	}
	
	h3.incorrect {
		color: var(--red-clr);
	}
</style>
