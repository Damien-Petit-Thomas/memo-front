
export const load = async ({ fetch }) => {
  try {
    const response = await fetch('http://memo_back:3001/api/memo_content');
    const contents = await response.json();
    return { contents };
  } catch (error) {
    return { error: 'Unable to fetch currencies' };
  }
};
