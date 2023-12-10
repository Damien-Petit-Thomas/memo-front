import { createStyleTag } from '@tiptap/core';
import { link } from '../stores/link';

let insideList = false;
export const textToMarkdown = (text, id, linkList) => {
  // on damare un miniteur pour mesurer le temps de traitement
  console.time('textToMarkdown');
  // on crée un tableau de lignes
  const lines = text.split('\n');

  // on crée un tableau de lignes markdown
  const markdownLines = lines.map((line) => {
    // si la ligne commence par un #, on la transforme en titre
    const headingMatch = line.match(/^(#{1,6})\s*(.+)$/);
    if (headingMatch) {
      const headingLevel = headingMatch[1].length;
      const headingText = headingMatch[2];
      return `</p><h${headingLevel}>${headingText}</h${headingLevel}><p>`;
    }

    // si la ligne commence par un -, on la transforme en liste non ordonnée
    if (line.startsWith('- ')) {
      if (!insideList) {
        insideList = true;
        return `<ul><li>${line.slice(2)}</li>`;
      }
      return `<li>${line.slice(2)}</li>`;
    }
    if (insideList) {
      insideList = false;
      return `</ul><p>${line}</p>`;
    }


    const orderedListMatch = line.match(/^\d+\.\s(.+)$/);
    if (orderedListMatch) {
      if (!insideList) {
        insideList = true;
        return `<ol><li>${orderedListMatch[1]}</li>`;
      }
      return `<li>${orderedListMatch[1]}</li>`;
    }


    // si la ligne contient un lien [texte](url), on le transforme en balise a
    const linkMatch = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      const linkText = linkMatch[1];
      const linkUrl = linkMatch[2];
      if (linkList.find((links) => links.url === linkUrl)) {
        return `<a href="${linkUrl}">${linkText}</a>`;
      }
      link.add({ name: linkText, url: linkUrl, memo_id: id });
      return `<a href="${linkUrl}">${linkText}</a>`;
    }
    const linkMatch2 = line.match(/(https?:\/\/[^\s]+)/);
    if (linkMatch2) {
      const linkText = linkMatch2[1];
      if (linkList.find((links) => links.url === linkText)) {
        return `<a href="${linkText}">${linkText}</a>`;
      }
      link.add({ name: linkText, url: linkText, memo_id: id });
      return `<a href="${linkText}">${linkText}</a>`;
    }

    // si la ligne contient du texte en gras **texte**, on le transforme en balise strong
    const boldMatch = line.match(/\*\*(.+?)\*\*/);
    if (boldMatch) {
      const boldText = boldMatch[1];
      return `<span style="font-weight: bold">${boldText}</span>`;
    }

    // si la ligne contient du texte en italique *texte*, on le transforme en balise em
    const italicMatch = line.match(/\*(.+?)\*/);
    if (italicMatch) {
      const italicText = italicMatch[1];
      return `<span style="font-style: italic">${italicText}</span>`;
    }

    const codeMatch = line.match(/`(.+?)`/);
    if (codeMatch) {
      const codeText = codeMatch[1];
      return `<code>${codeText}</code>`;
    }

    // sinon, on la laisse telle quelle
    return line;
  });

  // on retourne le markdown
  console.timeEnd('textToMarkdown');
  return markdownLines.join('\n');
};
