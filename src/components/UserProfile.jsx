import { ExternalLink } from 'lucide-react';

export default function UserProfile({ user }) {
  return (
    <section className="mb-8 flex flex-col items-start gap-5 rounded-xl border border-line bg-white p-5 sm:flex-row sm:items-center">
      <img src={user.avatar_url} alt={`${user.login} avatar`} className="h-20 w-20 rounded-full" />

      <div className="flex-1">
        <h2 className="text-xl font-semibold">{user.name || user.login}</h2>
        <p className="text-sm text-muted">@{user.login}</p>
        {user.bio && <p className="mt-1">{user.bio}</p>}
        <p className="mt-2 flex flex-wrap gap-4 text-sm text-muted">
          <span><b className="text-ink">{user.followers.toLocaleString()}</b> followers</span>
          <span><b className="text-ink">{user.following.toLocaleString()}</b> following</span>
          <span><b className="text-ink">{user.public_repos.toLocaleString()}</b> repos</span>
        </p>
      </div>

      <a
        href={user.html_url}
        target="_blank"
        rel="noreferrer"
        className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-line px-4 text-sm hover:bg-slate-50"
      >
        Profile <ExternalLink size={14} />
      </a>
    </section>
  );
}
