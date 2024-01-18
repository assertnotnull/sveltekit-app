<script lang="ts">
	import type { load } from './+page.server';

	export let data: Awaited<ReturnType<typeof load>>;
</script>

<div>
	<h1>Picsum image generator</h1>
	{#await data.games}
		<p>loading games...</p>
	{:then games}
		{#each games as game}
			<a href={game.profile_url} class="card p-4">
				<header class="card-header"><img src={game.thumbnail} alt="" /></header>
				<section class="p-4 space-y-4">
					<h6>{game.title}</h6>
					<p>Genre: {game.genre}</p>
					<article>
						<p>{game.short_description}</p>
					</article>
					<footer class="card-footer">Dev: {game.developer}</footer>
				</section>
			</a>
		{/each}
	{/await}
</div>
