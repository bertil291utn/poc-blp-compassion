import { MapPin, Globe, User } from 'lucide-react';

export default function SponsorCard({ sponsor }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
        Mi Patrocinadora
      </h3>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-compassion-blue-light flex items-center justify-center flex-shrink-0">
          <span className="text-compassion-blue font-bold">{sponsor.initials}</span>
        </div>
        <div>
          <p className="font-bold text-gray-900">{sponsor.name}</p>
          <p className="text-sm text-gray-500">{sponsor.globalPartner}</p>
        </div>
      </div>
      <div className="mt-3 space-y-1.5">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <User size={13} className="text-gray-400 flex-shrink-0" />
          Patrocinando desde {new Date(sponsor.joinedDate).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Globe size={13} className="text-gray-400 flex-shrink-0" />
          Escribe en inglés · las cartas son traducidas por Compassion
        </div>
      </div>
    </div>
  );
}
