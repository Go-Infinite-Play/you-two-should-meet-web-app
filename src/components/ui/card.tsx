export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-3xl bg-card p-8 shadow-sm sm:p-10 ${className}`}>
      {children}
    </div>
  );
}
