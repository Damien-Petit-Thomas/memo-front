export const load = async ({ fetch }) => {
  try {
    const response = await fetch('http://localhost:3000/api/memo');
    const memos = await response.json();
    return { memos };
  } catch (error) {
    return { error: 'Unable to fetch currencies' };
  }
};
