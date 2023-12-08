export const memoData = async (id) => {
  try {
    const response = await fetch('http://localhost:3000/api/memo/56');
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: 'Unable to fetch currencies' };
  }
};
