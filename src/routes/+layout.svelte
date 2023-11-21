<script>
  import Header from '$lib/components/header/Header.svelte';
  import Footer from '$lib/components/footer/Footer.svelte';
  import Sidebar from '../lib/components/sidebar/Sidebar.svelte';
  import '../styles/global.css';

</script>

<main>
  <Header />
  <Sidebar />
  <slot />
  <Footer />
</main> 