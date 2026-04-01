import { MapPin, User, Hash } from 'lucide-react';

export default function SponsoredChildCard({ child }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
        Mi Apadrinado/a
      </h3>
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-full bg-compassion-blue-light flex items-center justify-center flex-shrink-0">
          <span className="text-compassion-blue font-bold text-lg">{child.initials}</span>
        </div>
        <div>
          <p className="font-bold text-gray-900">{child.name}</p>
          <p className="text-sm text-gray-500">{child.age} años · {child.gender}</p>
        </div>
      </div>
      <div className="mt-3 space-y-1.5">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin size={14} className="text-gray-400" />
          {child.country} · {child.program}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Hash size={14} className="text-gray-400" />
          ID: {child.childId}
        </div>
      </div>
    </div>
  );
}
