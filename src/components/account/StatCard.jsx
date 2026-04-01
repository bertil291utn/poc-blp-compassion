export default function StatCard({ value, label, icon: Icon, color }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon size={18} style={{ color }} />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900 leading-none">{value}</p>
        <p className="text-xs text-gray-500 mt-0.5">{label}</p>
      </div>
    </div>
  );
}
