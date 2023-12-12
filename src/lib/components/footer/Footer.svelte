<footer>
  <nav>
    <a href="/">retour à l'accueil</a>
    <a href="/test">test</a>
<a href="/new-memo">new</a>
<a href="/admin">home-admin</a>
<a href="/lexicon">lexique</a>
<a href="/links">liens utiles</a>
  </nav>
</footer>


<style>
footer {
  background-color: red;
  color: black;
  font-weight: 700;
  text-align: center;
  margin: 0;
  position: fixed;
  padding: 0;
  bottom: 0;
  width: 100%;
}

a {
  text-decoration: none; /* Suppression du soulignement par défaut */
  color: inherit;
  cursor: pointer;
  background-color: royalblue;
}

a:hover {
  background-color: salmon;
  text-decoration: underline; /* Ajout du soulignement lors du survol */
}
nav {
  display: flex;
  justify-content: center;
  align-items: center;
}

nav a {
  margin: 0 1rem;
}

</style>