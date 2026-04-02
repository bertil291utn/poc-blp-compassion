import { useNavigate } from 'react-router-dom';
import { Send, Inbox, PenLine, Calendar, MapPin, Mail } from 'lucide-react';
import { userProfile } from '../../data/mockData';
import StatCard from '../../components/account/StatCard';
import SponsorCard from '../../components/account/SponsoredChildCard';

export default function AccountPage() {
  const navigate = useNavigate();
  const { beneficiary, sponsor, stats } = userProfile;

  const sinceYear = new Date(beneficiary.memberSince).getFullYear();
  const yearsInProgram = new Date().getFullYear() - sinceYear;

  return (
    <div className="max-w-lg mx-auto p-4 space-y-4">

      {/* Profile — beneficiary */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-compassion-blue flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-xl">{beneficiary.initials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-gray-900 text-lg leading-tight">{beneficiary.name}</h1>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Activo</span>
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <MapPin size={12} className="text-gray-400" />
            <span className="text-sm text-gray-500">{beneficiary.country} · {beneficiary.age} años</span>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Calendar size={12} className="text-gray-400" />
            <span className="text-xs text-gray-400">
              {yearsInProgram} año{yearsInProgram !== 1 ? 's' : ''} en el programa
            </span>
          </div>
        </div>
      </div>

      {/* Letter stats */}
      <div>
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-1">
          Cartas ({stats.total} en total)
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            value={stats.lettersSent}
            label="Enviadas"
            icon={Send}
            color="#2E7D32"
          />
          <StatCard
            value={stats.lettersReceived}
            label="Recibidas"
            icon={Inbox}
            color="#1f5eb8"
          />
        </div>
        <div className="mt-2 bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100 flex items-center gap-2">
          <Mail size={14} className="text-gray-400" />
          <span className="text-sm text-gray-600">
            Última de Jessica:{' '}
            <span className="font-medium">
              {new Date(stats.lastLetterDate).toLocaleDateString('es-ES', { day: '2-digit', month: 'long' })}
            </span>
          </span>
        </div>
      </div>

      {/* Sponsor */}
      <SponsorCard sponsor={sponsor} />

      {/* CTA */}
      <button
        onClick={() => navigate('/compose')}
        className="w-full bg-compassion-blue text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-compassion-blue-dark transition-colors"
      >
        <PenLine size={18} />
        Escribir carta a {sponsor.name}
      </button>

      <p className="text-xs text-center text-gray-400 pb-2">
        MyConnect v1.8.0 · Compassion International
      </p>
    </div>
  );
}
