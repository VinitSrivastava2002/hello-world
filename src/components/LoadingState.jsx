export default function LoadingState() {
  return (
    <div role="status" className="mx-auto max-w-md rounded-xl border border-dashed border-line bg-white px-5 py-8 text-center">
      <div className="mx-auto mb-3 h-7 w-7 animate-spin rounded-full border-[3px] border-line border-t-accent" />
      <p className="text-muted">Loading profile and repositories...</p>
    </div>
  );
}
