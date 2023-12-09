<script>
  import "../app.pcss";
  import Header from "$lib/components/header/Header.svelte";
  import Footer from "$lib/components/footer/Footer.svelte";

 
  import "../styles/global.css";
</script>

<main>
  <Header />

    <slot />
 
  <Footer />
</main>



<style>

</style>