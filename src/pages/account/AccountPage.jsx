import { useNavigate } from 'react-router-dom';
import { Send, Inbox, PenLine, Calendar, Hash, MapPin } from 'lucide-react';
import { userProfile } from '../../data/mockData';
import StatCard from '../../components/account/StatCard';
import SponsorCard from '../../components/account/SponsoredChildCard';

export default function AccountPage() {
  const navigate = useNavigate();
  const { beneficiary, sponsor, stats } = userProfile;

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('es-ES', {
      day: '2-digit', month: 'long', year: 'numeric',
    });
  }

  return (
    <div className="max-w-lg mx-auto p-4 space-y-4">
      {/* Profile header — the logged-in user (apadrinado) */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-compassion-blue flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-xl">{beneficiary.initials}</span>
        </div>
        <div>
          <h1 className="font-bold text-gray-900 text-lg leading-tight">{beneficiary.name}</h1>
          <div className="flex items-center gap-1.5 mt-0.5">
            <MapPin size={12} className="text-gray-400" />
            <span className="text-sm text-gray-500">{beneficiary.country} · {beneficiary.program}</span>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Hash size={12} className="text-gray-400" />
            <span className="text-xs text-gray-400">ID: {beneficiary.childId}</span>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Calendar size={12} className="text-gray-400" />
            <span className="text-xs text-gray-400">
              En el programa desde {formatDate(beneficiary.memberSince)}
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div>
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-1">
          Mis cartas
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            value={stats.lettersSent}
            label="Cartas enviadas"
            icon={Send}
            color="#2E7D32"
          />
          <StatCard
            value={stats.lettersReceived}
            label="Cartas recibidas"
            icon={Inbox}
            color="#1f5eb8"
          />
        </div>
        <div className="mt-2 bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100 flex items-center gap-2">
          <Calendar size={14} className="text-gray-400" />
          <span className="text-sm text-gray-600">
            Última carta recibida:{' '}
            <span className="font-medium">{formatDate(stats.lastLetterDate)}</span>
          </span>
        </div>
      </div>

      {/* Sponsor info */}
      <SponsorCard sponsor={sponsor} />

      {/* Quick action */}
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
