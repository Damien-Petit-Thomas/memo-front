export const load = async ({ fetch }) => {
  try {
    const content = await fetch('http://localhost:3000/api/contentType');
    const contents = await content.json();
    return { contents };
  } catch (error) {
    return { error: 'Unable to fetch currencies' };
  }
};
