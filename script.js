document.addEventListener('DOMContentLoaded', () => {
  const repoList = document.getElementById('starred-list');

  fetch('events.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then((repositories) => {
      repoList.innerHTML = '';

      repositories.forEach((repo) => {
        const listItem = document.createElement('li');
        listItem.className = 'repo-item';

        const main = document.createElement('div');
        main.className = 'repo-main';

        const title = document.createElement('h2');
        title.className = 'repo-name';

        const link = document.createElement('a');
        link.href = repo.url;
        link.target = '_blank';
        link.rel = 'noreferrer';
        link.textContent = `${repo.owner}/${repo.name}`;

        title.appendChild(link);

        const description = document.createElement('p');
        description.className = 'repo-description';
        description.textContent = repo.description;

        main.appendChild(title);
        main.appendChild(description);

        const meta = document.createElement('div');
        meta.className = 'repo-meta';

        const language = document.createElement('span');
        language.className = 'repo-language';
        language.textContent = repo.language;

        const stars = document.createElement('span');
        stars.textContent = `${repo.stargazers.toLocaleString()} stars`;

        meta.appendChild(language);
        meta.appendChild(stars);

        listItem.appendChild(main);
        listItem.appendChild(meta);
        repoList.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error('Unable to load starred repositories:', error);
      repoList.innerHTML = '<li class="error">Unable to load your starred repositories right now.</li>';
    });
});
