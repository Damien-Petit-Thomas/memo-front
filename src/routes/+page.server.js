export const load = async ({ fetch }) => {
  try {
    const [cateoriesResponse, todosResponse] = await Promise.all([
      fetch(
        'http://localhost:3000/api/tag',
      ),
      fetch(
        'http://localhost:3000/api/todo',
      ),
    ]);
    if (!cateoriesResponse.ok) {
      throw new Error(`HTTP error: ${cateoriesResponse.status}`);
    }
    if (!todosResponse.ok) {
      throw new Error(`HTTP error: ${todosResponse.status}`);
    }
    const categories = await cateoriesResponse.json();
    const todos = await todosResponse.json();
    return { categories, todos };
  } catch (error) {
    return { error: 'Unable to fetch currencies' };
  }
};
