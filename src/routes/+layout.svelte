
<script>
    import Header from './Header.svelte'// Définir les catégories pour les révisions DevOps
</script>

<div class="app">
    <Header/>
    <main>
        <slot/>
    </main>

    <footer>
        <p>merci de votre visite</p>
				<a href="/">home</a>
    </footer>
</div>


<style>

	
main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}



</style> 

