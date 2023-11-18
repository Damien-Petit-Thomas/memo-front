import adapter from '@sveltejs/adapter-static';

const config = {
  kit: {
    // other configurations...

    adapter: adapter({
      // hydrate the <div id="svelte"> element in src/app.html
      target: '#svelte',
    }),
  },
};

export default config;
