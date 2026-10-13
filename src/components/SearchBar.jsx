import { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ onSearch, loading }) {
  const [value, setValue] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(value);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
      <label htmlFor="username" className="sr-only">GitHub username</label>
      <div className="relative flex-1">
        <Search size={18} className="absolute left-3.5 top-3.5 text-muted" />
        <input
          id="username"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter a GitHub username"
          autoComplete="off"
          className="h-11 w-full rounded-lg border border-line bg-white pl-10 pr-3 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>
      <button
        type="submit"
        className="h-11 rounded-lg bg-accent px-6 font-medium text-white hover:opacity-90"
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}
