import { link } from '../stores/link';

export const saveLinks = (contents, id, linkList) => {
  contents.map((content) => {
    const linkMatch = content.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      const linkUrl = linkMatch[2];
      // si le store link contient déjà l'url on ne fait rien
      console.log(linkList)
      if (linkList.includes(linkUrl)) {
        console.log('link already exists');
        return null;
      }
      const linkText = linkMatch[1];
      return link.add({ name: linkText, url: linkUrl, memo_id: id });
    }
    return null;
  });
};
