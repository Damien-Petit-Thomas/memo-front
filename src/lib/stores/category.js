import { writable } from 'svelte/store';

export function createCategoryStore(initial) {
  const { subscribe, update } = writable(initial);

  return {
    subscribe,

    // Méthode pour ajouter une nouvelle tâche
    add: async (description) => {
      try {
        // Envoyer la description à la BDD pour créer un nouveau category
        const response = await fetch('http://localhost:3000/api/category', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
       
          body: JSON.stringify({ ...description }),
        });

        if (response.ok) {
          const newcategory = await response.json();
          // Mettre à jour le store avec le nouveau category de la BDD
          update(($categories) => [...$categories, newcategory]);
        } else {
          console.error(`Error adding category: ${response.status}`);
        }
      } catch (error) {
        console.error('An unexpected error occurred:', error);
      }
    },

    // Méthode pour supprimer une tâche
    remove: async (category) => {
      try {
        // Envoyer la demande de suppression à la BDD
        const response = await fetch(`http://localhost:3000/api/category/${category.id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Mettre à jour le store en excluant la tâche supprimée
          update(($categories) => $categories.filter((t) => t.id !== category.id));
        } else {
          console.error(`Error removing category: ${response.status}`);
        }
      } catch (error) {
        console.error('An unexpected error occurred:', error);
      }
    },

    mark: async (category) => {
      const done = !category.done;
      const { description } = category;
      const data = { done, description };

      try {
        const response = await fetch(`http://localhost:3000/api/category/${category.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify( data ),
        });

        if (response.ok) {
          update(($categories) => [
            ...$categories.filter((t) => t !== category),
            { ...category, done },
          ]);
        } else {
          console.error(`Error marking category: ${response.status}`);
        }
      } catch (error) {
        console.error('An unexpected error occurred:', error);
      }
    },
  };
  // ... Autres méthodes restent inchangées
}
