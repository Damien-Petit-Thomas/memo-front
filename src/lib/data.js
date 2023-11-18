// place files you want to       import through the `$lib` alias in this folder.
export const categories = [
  {
    id: 1, title: 'Système', slug: 'systeme', color: 'lightblue',
  },
  {
    id: 2, title: 'réseau', slug: 'reseau', color: 'lightgreen',
  },
  {
    id: 3, title: 'Continuous Integration / Continuous Deployment (CI/CD)', slug: 'cicd', color: 'lightpink',
  },
  {
    id: 4, title: 'Monitoring et Logging', slug: 'monitoring', color: 'lightyellow',
  },
  {
    id: 5, title: 'Git', slug: 'git', color: 'lightgrey',
  },
  {
    id: 6, title: 'Docker', slug: 'docker', color: 'grey',
  },
  {
    id: 7, title: 'Kubernetes', slug: 'kubernetes', color: 'darkgrey',
  },
  {
    id: 8, title: 'Cloud', slug: 'cloud', color: 'darkblue',
  },
  {
    id: 9, title: 'Sécurité', slug: 'securite', color: 'darkgreen',
  },
  {
    id: 10, title: 'Scripting', slug: 'scripting', color: 'darkpink',
  },
  {
    id: 11, title: 'Bash', slug: 'bash', color: 'darkyellow',
  },
  {
    id: 12, title: 'Python', slug: 'python', color: 'yellow',
  },
  {
    id: 13, title: 'Ansible', slug: 'ansible', color: 'orange',
  },
  {
    id: 14, title: 'Terraform', slug: 'terraform', color: 'red',
  },
  {
    id: 15, title: 'Packer', slug: 'packer', color: 'purple',
  },
  {
    id: 16, title: 'Vagrant', slug: 'vagrant', color: 'rebeccapurple',
  },
  {
    id: 17, title: 'Jenkins', slug: 'jenkins', color: 'pink',
  },
  // Ajoutez d'autres catégories selon vos besoins
];

export const skills = [
  { id: 1, categoryId: 1, title: 'Linux' },
  { id: 2, categoryId: 1, title: 'Windows' },
  { id: 3, categoryId: 1, title: 'MacOS' },
  { id: 4, categoryId: 1, title: 'Unix' },
  { id: 5, categoryId: 1, title: 'Shell' },
];

export const posts = [
  {
    slug: 'systeme',
    title: 'administration système',
    content:
        `<p>Un administrateur système est chargé de la gestion et de la maintenance des 
        infrastructures informatiques d’une entreprise. Il est responsable du bon fonctionnement 
        des serveurs, des réseaux et des postes de travail. Il doit également veiller à la sécurité
        des données et à la protection du système d’information.</p>`,
  },
];
