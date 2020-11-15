<script lang="ts">
	import Header from "./components/Header.svelte"
	import Footer from "./components/Footer.svelte"
	import Question from "./components/Question.svelte"
	
	export let item: object;
</script>

<Header></Header>

<main>
	<article class="box">
		<h2>{@html item.question }</h2>
		
		<Question {...item}></Question>
	</article>
</main>

<Footer></Footer>

<style>
	main {
		width: 85%;
		max-width: 75rem;
		margin: 1rem auto;
		padding: 0 0.5em;
	}
	
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
</style>