export const load = async ({ fetch }) => {
  try {
    const response = await fetch('http://localhost:3000/api/memo_content');
    const contents = await response.json();
    return { contents };
  } catch (error) {
    return { error: 'Unable to fetch currencies' };
  }
};
