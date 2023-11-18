<script>
    import  hackEffect  from '$lib/utils/hackEffect.js';
    import { onMount } from 'svelte';
    onMount(() => {
        
        hackEffect('#title', 30, 5);
    });
</script>

<h1 id="title">
    Memo Devop
</h1>



<style>

    #title {
        background-color: red;
        color : black;
        font-size: 3rem;
        font-weight: 700;
        text-align: center;
        margin: 0;
        padding: 0;
        margin-bottom: 2rem;
        position: sticky;
    }
</style>