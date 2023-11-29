export const load = async ({ fetch }) => {
  try {
    const [cateoriesResponse, todosResponse, tagResponse, memoResponse] = await Promise.all([
      fetch(
        'http://localhost:3000/api/category',
      ),
      fetch(
        'http://localhost:3000/api/todo',
      ),
      fetch(
        'http://localhost:3000/api/tag',
      ),
      fetch(
        'http://localhost:3000/api/memo',
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
    if (!memoResponse.ok) {
      throw new Error(`HHTP error ${tagResponse.status}`);
    }
    const tags = await tagResponse.json();
    const memos = await memoResponse.json();
    const categories = await cateoriesResponse.json();
    const todos = await todosResponse.json();
    return {
      tags, categories, todos, memos,
    };
  } catch (error) {
    return { error: 'Unable to fetch currencies' };
  }
};
