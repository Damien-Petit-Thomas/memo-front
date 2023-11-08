<script>
        import {categories} from '$lib/data.js';
</script>
<ul class="category-list">
    <!-- Parcourir les catégories et afficher des liens pour chaque catégorie -->
    {#each categories as category (category.id)}
        <li class="category-item" >
            <a href="/{category.slug}" class="category-link" style="background-color: {category.color}">
                {category.title}
            </a>
        </li>
    {/each}
</ul>



<style>

.category-list {
        list-style: none;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
    }

    .category-item {
        margin-bottom: 10px;
    }

    .category-link {
        text-decoration: none;
        color: #333;
        display: block;
        border: 1px solid #ccc;
        margin: 5px;
        padding: 10px;
        border-radius: 5px;
    }

    .category-link:hover {
        background-color: #f0f0f0;
    }
</style>