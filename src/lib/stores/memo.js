import { writable } from 'svelte/store';

export const memos = (() => {
  const { subscribe, set, update } = writable([]);

  // Méthode pour ajouter une nouvelle tâche

  const get = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/memo');
      if (response.ok) {
        const data = await response.json();
        update(() => data);
      } else {
        console.error(`Error fetching memos: ${response.status}`);
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  };

  const add = async (description) => {
    console.log(JSON.stringify({ ...description }));
    try {
      // Envoyer la description à la BDD pour créer un nouveau memo
      const response = await fetch('http://localhost:3000/api/memo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...description }),
      });

      if (response.ok) {
        const newmemo = await response.json();
        // Mettre à jour le store avec le nouveau memo de la BDD
        update(($memos) => [...$memos, newmemo]);
      } else {
        console.error(`Error adding memo: ${response.status}`);
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  };

  // Méthode pour supprimer une tâche
  const remove = async (memo) => {
    try {
      // Envoyer la demande de suppression à la BDD
      const response = await fetch(`http://localhost:3000/api/memo/${memo.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Mettre à jour le store en excluant la tâche supprimée
        update(($memos) => $memos.filter((t) => t.id !== memo.id));
      } else {
        console.error(`Error removing memo: ${response.status}`);
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  };

  const mark = async (memo) => {
    const done = !memo.done;
    const { description } = memo;

    try {
      const response = await fetch(`http://localhost:3000/api/memo/${memo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ done, description }),
      });

      if (response.ok) {
        update(($memos) => [
          ...$memos.filter((t) => t !== memo),
          { ...memo, done },
        ]);
      } else {
        console.error(`Error marking memo: ${response.status}`);
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  };

  return {
    set,
    update,
    subscribe,
    add,
    remove,
    mark,
    get,
  };
})();
