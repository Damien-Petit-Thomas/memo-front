import { writable } from 'svelte/store';

export function createTodoStore(initial) {
  const { subscribe, update } = writable(initial);

  return {
    subscribe,

    // Méthode pour ajouter une nouvelle tâche
    add: async (description) => {
      try {
        // Envoyer la description à la BDD pour créer un nouveau todo
        const response = await fetch('http://localhost:3000/api/todo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ description }),
        });

        if (response.ok) {
          const newTodo = await response.json();
          // Mettre à jour le store avec le nouveau todo de la BDD
          update(($todos) => [...$todos, newTodo]);
        } else {
          console.error(`Error adding todo: ${response.status}`);
        }
      } catch (error) {
        console.error('An unexpected error occurred:', error);
      }
    },

    // Méthode pour supprimer une tâche
    remove: async (todo) => {
      try {
        // Envoyer la demande de suppression à la BDD
        const response = await fetch(`http://localhost:3000/api/todo/${todo.id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Mettre à jour le store en excluant la tâche supprimée
          update(($todos) => $todos.filter((t) => t.id !== todo.id));
        } else {
          console.error(`Error removing todo: ${response.status}`);
        }
      } catch (error) {
        console.error('An unexpected error occurred:', error);
      }
    },

    mark: async (todo) => {
      const done = !todo.done;
      const { description } = todo;
      const data = { done, description };

      try {
        const response = await fetch(`http://localhost:3000/api/todo/${todo.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify( data ),
        });

        if (response.ok) {
          update(($todos) => [
            ...$todos.filter((t) => t !== todo),
            { ...todo, done },
          ]);
        } else {
          console.error(`Error marking todo: ${response.status}`);
        }
      } catch (error) {
        console.error('An unexpected error occurred:', error);
      }
    },
  };
  // ... Autres méthodes restent inchangées
}
