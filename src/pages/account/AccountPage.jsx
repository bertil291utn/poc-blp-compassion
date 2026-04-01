import { useNavigate } from 'react-router-dom';
import { Send, Inbox, PenLine, Calendar } from 'lucide-react';
import { userProfile } from '../../data/mockData';
import StatCard from '../../components/account/StatCard';
import SponsoredChildCard from '../../components/account/SponsoredChildCard';

export default function AccountPage() {
  const navigate = useNavigate();
  const { sponsor, sponsoredChild, stats } = userProfile;

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('es-ES', {
      day: '2-digit', month: 'long', year: 'numeric',
    });
  }

  return (
    <div className="max-w-lg mx-auto p-4 space-y-4">
      {/* Profile header */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-compassion-blue flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-xl">{sponsor.initials}</span>
        </div>
        <div>
          <h1 className="font-bold text-gray-900 text-lg leading-tight">{sponsor.name}</h1>
          <p className="text-sm text-gray-500">{sponsor.email}</p>
          <div className="flex items-center gap-1.5 mt-1">
            <Calendar size={12} className="text-gray-400" />
            <span className="text-xs text-gray-400">
              Padrino desde {formatDate(sponsor.memberSince)}
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div>
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-1">
          Resumen de cartas
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
            color="#0077C8"
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

      {/* Sponsored child */}
      <SponsoredChildCard child={sponsoredChild} />

      {/* Quick action */}
      <button
        onClick={() => navigate('/compose')}
        className="w-full bg-compassion-blue text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-compassion-blue-dark transition-colors"
      >
        <PenLine size={18} />
        Escribir carta a {sponsoredChild.name.split(' ')[0]}
      </button>

      <p className="text-xs text-center text-gray-400 pb-2">
        MyConnect v1.8.0 · Compassion International
      </p>
    </div>
  );
}
