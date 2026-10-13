const field =
  'h-10 rounded-lg border border-line bg-white px-3 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20';

export default function FilterBar({ query, language, sort, languages, onChange }) {
  return (
    <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_200px_200px]">
      <input
        type="search"
        aria-label="Search repositories"
        placeholder="Search by name or description"
        value={query}
        onChange={(e) => onChange('query', e.target.value)}
        className={`${field} sm:col-span-2 lg:col-span-1`}
      />

      <select
        aria-label="Filter by language"
        value={language}
        onChange={(e) => onChange('language', e.target.value)}
        className={field}
      >
        <option value="all">All Languages</option>
        {languages.map((lang) => (
          <option key={lang} value={lang}>{lang}</option>
        ))}
      </select>

      <select
        aria-label="Sort repositories"
        value={sort}
        onChange={(e) => onChange('sort', e.target.value)}
        className={field}
      >
        <option value="updated">Recently updated</option>
        <option value="stars">Most stars</option>
        <option value="forks">Most forks</option>
        <option value="name">Name (A-Z)</option>
      </select>
    </div>
  );
}
