import { useMemo, useRef, useState } from 'react';
import Header from './components/Header.jsx';
import SearchBar from './components/SearchBar.jsx';
import UserProfile from './components/UserProfile.jsx';
import FilterBar from './components/FilterBar.jsx';
import RepositoryList from './components/RepositoryList.jsx';
import Pagination from './components/Pagination.jsx';
import LoadingState from './components/LoadingState.jsx';
import ErrorMessage from './components/ErrorMessage.jsx';
import { fetchUserAndRepos } from './services/githubApi.js';

const PAGE_SIZE = 9;

const ERRORS = {
  invalid: {
    title: 'Invalid username',
    text: 'Usernames can only have letters, numbers and hyphens.',
  },
  not_found: {
    title: 'User not found',
    text: 'No GitHub user with that name. Check the spelling and try again.',
  },
  rate_limit: {
    title: 'Rate limit reached',
    text: 'GitHub allows only 60 requests per hour without a token. Please try again later.',
  },
  network: {
    title: 'Network error',
    text: 'Could not reach GitHub. Check your internet connection.',
  },
  unknown: {
    title: 'Something went wrong',
    text: 'Please try again.',
  },
};

// Search + language filter + sorting on the repos we already have
function getVisibleRepos(repos, query, language, sort) {
  const text = query.trim().toLowerCase();

  const result = repos.filter((repo) => {
    const matchesText =
      repo.name.toLowerCase().includes(text) ||
      (repo.description || '').toLowerCase().includes(text);
    const matchesLanguage = language === 'all' || repo.language === language;
    return matchesText && matchesLanguage;
  });
  console.log(result);

  result.sort((a, b) => {
    if (sort === 'stars') return b.stargazers_count - a.stargazers_count;
    if (sort === 'forks') return b.forks_count - a.forks_count;
    if (sort === 'name') return a.name.localeCompare(b.name);
    return new Date(b.updated_at) - new Date(a.updated_at);
  });

  return result;
}

export default function App() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('all');
  const [sort, setSort] = useState('updated');
  const [page, setPage] = useState(1);

  const controllerRef = useRef(null);
  const lastSearchRef = useRef('');

  //handle search function
  async function handleSearch(input) {
    const username = input.trim();

    if (!/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(username)) {
      controllerRef.current?.abort();
      lastSearchRef.current = '';
      setSearched(true);
      setLoading(false);
      setUser(null);
      setError('invalid');
      return;
    }

    // same user is already loading or loaded, no need to fetch again
    if (username.toLowerCase() === lastSearchRef.current) return;
    lastSearchRef.current = username.toLowerCase();

    // cancel the old request so it can't overwrite the new one
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setSearched(true);
    setLoading(true);
    setError(null);

    try {
      const [userData, repoData] = await fetchUserAndRepos(username, controller.signal);
      setUser(userData);
      setRepos(repoData);
      setQuery('');
      setLanguage('all');
      setSort('updated');
      setPage(1);
      setLoading(false);
    } catch (err) {
      if (err.name === 'AbortError') return;
      lastSearchRef.current = '';
      setUser(null);
      setError(ERRORS[err.message] ? err.message : 'unknown');
      setLoading(false);
    }
  }

  function handleFilterChange(name, value) {
    if (name === 'query') setQuery(value);
    if (name === 'language') setLanguage(value);
    if (name === 'sort') setSort(value);
    setPage(1);
  }

  const languages = useMemo(() => {
    const all = repos.map((repo) => repo.language).filter(Boolean);
    return [...new Set(all)].sort();
  }, [repos]);

  const visibleRepos = useMemo(
    () => getVisibleRepos(repos, query, language, sort),
    [repos, query, language, sort]
  );

  const totalPages = Math.max(1, Math.ceil(visibleRepos.length / PAGE_SIZE));
  const pageRepos = visibleRepos.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <Header />

      <main className="mx-auto min-h-[70vh] max-w-5xl px-5">
        <section className="mx-auto mb-8 mt-10 max-w-xl text-center">
          <h1 className="text-3xl font-bold">Explore GitHub Repositories</h1>
          <p className="mb-5 mt-2 text-muted">
            Search for a GitHub username to see their profile and public repositories.
          </p>
          <SearchBar onSearch={handleSearch} loading={loading} />
        </section>

        {!searched && (
          <div className="mx-auto max-w-md rounded-xl border border-dashed border-line bg-white px-5 py-8 text-center">
            <h3 className="font-semibold">Nothing to show yet</h3>
            <p className="mt-1 text-muted">Enter a username above and press Enter, for example "octocat".</p>
          </div>
        )}

        {loading && <LoadingState />}

        {!loading && error && <ErrorMessage {...ERRORS[error]} />}

        {!loading && !error && user && (
          <>
            <UserProfile user={user} />

            <div className="mb-3 flex items-baseline gap-2.5">
              <h2 className="text-xl font-semibold">Repositories</h2>
              <span className="text-sm text-muted">{visibleRepos.length} found</span>
            </div>

            <FilterBar
              query={query}
              language={language}
              sort={sort}
              languages={languages}
              onChange={handleFilterChange}
            />

            <RepositoryList repos={pageRepos} />
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </>
        )}
      </main>

      <footer className="mt-12 border-t border-line bg-white p-5 text-center text-sm text-muted">
        Data from the{' '}
        <a href="https://docs.github.com/en/rest" target="_blank" rel="noreferrer" className="text-accent hover:underline">
          GitHub REST API
        </a>
      </footer>
    </>
  );
}
