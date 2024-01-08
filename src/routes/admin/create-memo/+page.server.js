export const load = async ({ fetch }) => {
  try {
    const url = import.meta.env.VITE_URL_API;
    const content = await fetch(`http://${url}/api/contentType`);
    const contents = await content.json();
    return { contents };
  } catch (error) {
    return { error: 'Unable to fetch currencies' };
  }
};
