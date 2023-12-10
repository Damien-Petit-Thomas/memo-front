export const textToMarkdown = (text) => {
  // on crée un tableau de lignes
  const lines = text.split('\n');

  // on crée un tableau de lignes markdown
  const markdownLines = lines.map((line) => {
    // si la ligne commence par un #, on la transforme en titre
    const headingMatch = line.match(/^(#{1,6})\s*(.+)$/);
    if (headingMatch) {
      const headingLevel = headingMatch[1].length;
      const headingText = headingMatch[2];
      return `<h${headingLevel}>${headingText}</h${headingLevel}>`;
    }

    // si la ligne commence par un -, on la transforme en liste non ordonnée
    if (line.startsWith('- ')) {
      return `<ul><li>${line.slice(2)}</li></ul>`;
    }

    const orderedListMatch = line.match(/^\d+\.\s(.+)$/);
    if (orderedListMatch) {
      return `<ol><li>${orderedListMatch[1]}</li></ol>`;
    }

    // si la ligne contient un lien [texte](url), on le transforme en balise a
    const linkMatch = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      const linkText = linkMatch[1];
      const linkUrl = linkMatch[2];
      return `<a href="${linkUrl}">${linkText}</a>`;
    }

    // si la ligne contient du texte en gras **texte**, on le transforme en balise strong
    const boldMatch = line.match(/\*\*(.+?)\*\*/);
    if (boldMatch) {
      const boldText = boldMatch[1];
      return `<strong>${boldText}</strong>`;
    }

    // si la ligne contient du texte en italique *texte*, on le transforme en balise em
    const italicMatch = line.match(/\*(.+?)\*/);
    if (italicMatch) {
      const italicText = italicMatch[1];
      return `<em>${italicText}</em>`;
    }

    // sinon, on la laisse telle quelle
    return line;
  });

  // on retourne le markdown
  return markdownLines.join('\n');
};
