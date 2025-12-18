export function SectionHeader({ title }) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-black uppercase tracking-tighter text-white">
          {title}
        </h2>
        <div className="mt-1 h-1 w-10 bg-orange-500" />
      </div>
    </div>
  );
}
