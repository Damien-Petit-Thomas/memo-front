<script>
    import Category from "./Category.svelte";
    export let data;
</script>





<svelte:head>
    <title>Memo Devops</title>
    <meta name="description" content="fiche memo Devops"/>
</svelte:head>

<Category {data}/>

<a href="/create">editer un article</a>