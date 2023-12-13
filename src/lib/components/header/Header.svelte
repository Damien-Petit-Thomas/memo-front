<script>
    import  hackEffect  from '$lib/utils/hackEffect.js';
    import { onMount } from 'svelte';
    onMount(() => {
        
        hackEffect('#title', 30, 5);
    });
</script>
<header>
    
    <div class="header-left">
        <h1 id="title">
            <a href="/">Memo Devop</a>
        </h1>
    </div>
    <nav data-sveltekit-reload class="header-right">
        <a href="/">formation</a>
        <a href="/">blog</a>
        <a href="/">Tags</a>
        <a href="/">Favoris</a>
        <a href="/">A propos</a>
        <a href="/">Contact</a>
    </nav>
</header>



<style>
    .header-left, .header-right {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 1rem;
    }

    a {
        color: black;
        text-decoration: none;
        font-weight: 700;
        font-size: 1.2rem;
        margin: 0 1rem;
    }

    header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        background-color: rgb(30, 35, 48);
        color : black;
        font-weight: 700;
        text-align: center;
        margin: 0;
        padding: 0;
        position: sticky;
        top: 0;
        z-index: 100;
    }


    #title {
        
        color : black;
        font-size: 2rem;
        font-weight: 700;
        text-align: center;
        margin-right: 1.5rem;
        padding: 0;
        position: sticky;
    }
</style>