export default function HistoryPage() {
  return (
    <div className="p-6 mt-5 bg-background rounded-xl border">
      <h2 className="text-xl md:text-2xl font-semibold">
        Histórico de Conversas
      </h2>
      <div className="px-2 md:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"></div>
    </div>
  );
}
