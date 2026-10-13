import { FolderGit2 } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-2 px-5 font-semibold">
        <FolderGit2 size={22} />
        <span>Repo Explorer</span>
      </div>
    </header>
  );
}
