<script>
  export let value;
  export let css;
</script>

<pre>
	<blockquote style={css} >{value}</blockquote>
</pre>




<style>

blockquote {
	background: rgb(53, 48, 48);

	border-left: 4px solid var(--color-orange);
	border-right: 4px solid var(--color-orange);
	font-family: Roboto Slab;
	padding: 2.4rem;
  width: 100%;
	border-radius: 0.4rem;
	color: var(--color-preview-qoute-body) !important;
	font-weight: bold !important;
}
</style>
