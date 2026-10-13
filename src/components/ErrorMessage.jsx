export default function ErrorMessage({ title, text }) {
  return (
    <div role="alert" className="mx-auto max-w-md rounded-xl border border-red-200 bg-red-50 px-5 py-8 text-center">
      <h3 className="font-semibold text-red-700">{title}</h3>
      <p className="mt-1 text-muted">{text}</p>
    </div>
  );
}
