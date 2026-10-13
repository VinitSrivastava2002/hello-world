import RepositoryCard from './RepositoryCard.jsx';

export default function RepositoryList({ repos }) {
  if (repos.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-line bg-white px-5 py-8 text-center">
        <h3 className="font-semibold">No repositories found</h3>
        <p className="mt-1 text-muted">Try a different search or language.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {repos.map((repo) => (
        <RepositoryCard key={repo.id} repo={repo} />
      ))}
    </div>
  );
}
