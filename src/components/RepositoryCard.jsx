import { Star, GitFork, CircleDot, ExternalLink } from 'lucide-react';

export default function RepositoryCard({ repo }) {
  const updated = new Date(repo.updated_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <article className="flex h-full flex-col gap-2.5 rounded-xl border border-line bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex justify-between gap-2">
        <h3 className="break-all font-semibold">{repo.name}</h3>
        <span className="h-fit rounded-full border border-line px-2 text-xs text-muted">
          {repo.private ? 'Private' : 'Public'}
        </span>
      </div>

      <p className="flex-1 break-words text-sm text-muted">{repo.description || 'No description'}</p>
      <p className="text-sm">{repo.language || 'No language'}</p>

      <div className="flex gap-4 text-sm text-muted">
        <span className="inline-flex items-center gap-1"><Star size={14} /> {repo.stargazers_count.toLocaleString()}</span>
        <span className="inline-flex items-center gap-1"><GitFork size={14} /> {repo.forks_count.toLocaleString()}</span>
        <span className="inline-flex items-center gap-1"><CircleDot size={14} /> {repo.open_issues_count.toLocaleString()}</span>
      </div>

      <div className="flex justify-between border-t border-line pt-2.5 text-sm">
        <span className="text-muted">Updated {updated}</span>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-accent hover:underline"
        >
          Open <ExternalLink size={13} />
        </a>
      </div>
    </article>
  );
}
