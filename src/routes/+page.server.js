import { error } from '@sveltejs/kit'
import axios from 'axios'


// on fait un appel à l'api locale pour récupérer les tags sur le endpoint http://localhost:3000/api/tag


export async function load({ params }) {
    try {
        const { data: categories } = await axios.get(`http://localhost:3000/api/tag`);
     
        return {
        
            categories
        
        };
    } catch (err) {
        return error(err);
    }
    }