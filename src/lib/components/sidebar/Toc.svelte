<script>


export let doc;

let toc = [];




function generateToc(content)  {
  const lines = content.split('\n');
  const toc = [];
  const tocRegex = /^#{1,6} (.*)$/;
  lines.forEach((line) => {
    const match = line.match(tocRegex);
    if (match) {
      const title = match[1];
      console.log(title)
      const level = match[0].match(/#/g).length;
      const link = `#${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
      toc.push({ title, level, link });
    }
  });
  return toc;

}

doc.forEach((content) => {
toc.push(generateToc(content.content))
})




</script>



<div class="wrapper">
  
  <nav>
    <h3>Dans ce memo</h3>
    <ul>
      {#each toc[0] as { title, level, link }}
        <li class="level-{level}">
          <a href={link}>{title}</a>
        </li>
      {/each}
    </ul>
  </nav>
  
  
  
  
  
  <div class="option">
    <a href="/admin/create-memo"><button>modifier le memo</button></a>
  </div>
</div>





<style>



.wrapper {
  min-width: 15%;
  display: flex;
  flex-direction: column;
  border-left : 1px solid #818181;

}
.level-1 {
  margin-left: 0;
}

.level-2 {
  margin-left: 1rem;
}

.level-3 {
  margin-left: 2rem;
}

.level-4 {
  margin-left: 3rem;
}

.level-5 {
  margin-left: 4rem;
}

.level-6 {
  margin-left: 5rem;
}

nav {
  color: #ddd;
  position: fixed;
  top: 10%;
  height: 100vh;
  overflow-y: auto;
  padding: 1rem;

}

nav h3 {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

ul {
  list-style: none;
  padding-left: 1rem;
  border-left: 1px solid #ddd;
}

li {
  padding: .2rem;
  margin-bottom: 0.5rem;
}


li:hover {
  background-color: #6b3939;
}

.option {
        
        align-self: flex-end;
        justify-content: center;
        align-items: center;
        min-width: 15%;
        widows: 15%;
  }




</style>