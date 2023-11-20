export const load = async ({ fetch }) => {
  try {
    const [cateoriesResponse, todosResponse, tagResponse] = await Promise.all([
      fetch(
        'http://localhost:3000/api/category',
      ),
      fetch(
        'http://localhost:3000/api/todo',
      ),
      fetch(
        'http://localhost:3000/api/tag',
      ),
    ]);
    if (!cateoriesResponse.ok) {
      throw new Error(`HTTP error: ${cateoriesResponse.status}`);
    }
    if (!todosResponse.ok) {
      throw new Error(`HTTP error: ${todosResponse.status}`);
    }
    if (!tagResponse.ok) {
      throw new Error(`HHTP error ${tagResponse.status}`);
    }
    const tags = await tagResponse.json();
    const categories = await cateoriesResponse.json();
    const todos = await todosResponse.json();
    return { tags, categories, todos };
  } catch (error) {
    return { error: 'Unable to fetch currencies' };
  }
};
