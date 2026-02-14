const Shimmer = ({ layout = "grid" }) => {
  const isHorizontal = layout === "horizontal";

  return (
    <div
      className={
        isHorizontal
          ? "flex gap-4"
          : "grid grid-cols-1 gap-4 pb-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      }
    >
      {Array(isHorizontal ? 6 : 12)
        .fill(null)
        .map((_, i) => (
          <div
            key={i}
            className={`animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm ${
              isHorizontal ? "w-[280px] flex-none" : ""
            }`}
          >
            <div className="mb-3 h-40 w-full rounded-xl bg-slate-200" />
            <div className="mb-2 h-4 w-3/4 rounded bg-slate-200" />
            <div className="mb-2 h-3 w-full rounded bg-slate-200" />
            <div className="mb-2 h-3 w-2/3 rounded bg-slate-200" />
            <div className="h-3 w-1/2 rounded bg-slate-200" />
          </div>
        ))}
    </div>
  );
};

export default Shimmer;
