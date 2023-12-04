import { vitePreprocess } from "@sveltejs/kit/vite";
import adapter from "@sveltejs/adapter-static";

export default {
  kit: {
    adapter: adapter({ strict: false }),
    // other config options
  },

  preprocess: [vitePreprocess({})],
};
