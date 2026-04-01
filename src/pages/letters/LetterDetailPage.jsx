import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Image, PenLine } from 'lucide-react';
import { letters } from '../../data/mockData';

export default function LetterDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const letter = letters.find(l => l.id === id);

  if (!letter) {
    return (
      <div className="p-8 text-center text-gray-400">
        <p>Carta no encontrada</p>
        <button
          onClick={() => navigate('/letters')}
          className="mt-4 text-compassion-blue text-sm"
        >
          Volver a cartas
        </button>
      </div>
    );
  }

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('es-ES', {
      weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
    });
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Back button */}
      <div className="px-4 py-3 flex items-center gap-2 border-b border-gray-100 bg-white sticky top-0 sm:top-0">
        <button
          onClick={() => navigate('/letters')}
          className="flex items-center gap-1.5 text-compassion-blue text-sm font-medium"
        >
          <ArrowLeft size={16} />
          Volver
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Meta */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-900 text-lg mb-2">{letter.subject}</h2>
          <div className="text-sm text-gray-500 space-y-1">
            <p><span className="text-gray-400">De:</span> {letter.from}</p>
            <p><span className="text-gray-400">Para:</span> {letter.to}</p>
            <p><span className="text-gray-400">Fecha:</span> {formatDate(letter.date)}</p>
            {letter.tag && (
              <p className="text-xs text-gray-400 italic pt-1">
                ℹ️ "{letter.tag}" indica que esta carta fue procesada por el equipo de Compassion.
              </p>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-line">
            {letter.preview}
            {'\n\n'}
            [El contenido completo de esta carta se mostraría aquí. En el POC usamos el preview como muestra del texto.]
          </p>
        </div>

        {/* Photos */}
        {letter.hasPhotos && (
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <Image size={15} className="text-gray-400" />
              <span className="text-sm font-medium text-gray-700">
                {letter.photoCount} foto{letter.photoCount > 1 ? 's' : ''} adjunta{letter.photoCount > 1 ? 's' : ''}
              </span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {[...Array(letter.photoCount)].map((_, i) => (
                <img
                  key={i}
                  src={`https://picsum.photos/seed/detail${i}/120/90`}
                  alt={`Foto ${i + 1}`}
                  className="w-24 h-20 object-cover rounded-lg shadow-sm"
                />
              ))}
            </div>
          </div>
        )}

        {/* Reply button — only for received letters */}
        {letter.status === 'received' && (
          <button
            onClick={() => navigate('/compose')}
            className="w-full bg-compassion-blue text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-compassion-blue-dark transition-colors"
          >
            <PenLine size={18} />
            Responder a Jessica
          </button>
        )}
      </div>
    </div>
  );
}
