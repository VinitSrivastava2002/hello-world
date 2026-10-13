const API = 'https://api.github.com';

async function get(url) {
  let res;
  try {
    res = await fetch(url);
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    throw new Error('network');
  }

  if (res.ok) return res.json();
  if (res.status === 404) throw new Error('not_found');
  if (res.status === 403 || res.status === 429) throw new Error('rate_limit');
  throw new Error('unknown');
}

// Fetch the profile and the repos at the same time
export function fetchUserAndRepos(username) {
  return Promise.all([
    get(`${API}/users/${username}`),
    get(`${API}/users/${username}/repos?per_page=100&sort=updated&type=owner`),
  ]);
}
