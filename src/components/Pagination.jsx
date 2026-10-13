const btn =
  'h-10 rounded-lg border border-line bg-white px-4 text-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50';

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-6 flex items-center justify-center gap-4">
      <button className={btn} disabled={page === 1} onClick={() => onPageChange(page - 1)}>
        Previous
      </button>
      <span className="text-sm text-muted">Page {page} of {totalPages}</span>
      <button className={btn} disabled={page === totalPages} onClick={() => onPageChange(page + 1)}>
        Next
      </button>
    </div>
  );
}
