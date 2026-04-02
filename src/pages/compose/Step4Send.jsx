import { useNavigate } from 'react-router-dom';
import { CheckCircle, Image } from 'lucide-react';
import { useCompose } from '../../context/ComposeContext';

function SuccessScreen() {
  const navigate = useNavigate();
  const { resetCompose } = useCompose();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-8 text-center">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4 animate-bounce-once">
        <CheckCircle size={40} className="text-green-500" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Carta enviada!</h2>
      <p className="text-gray-500 text-sm mb-8">
        Tu carta para Jessica ha sido enviada exitosamente y está siendo procesada por el equipo de Compassion.
      </p>
      <button
        onClick={() => { resetCompose(); navigate('/letters'); }}
        className="bg-compassion-blue text-white font-semibold py-3 px-8 rounded-xl hover:bg-compassion-blue-dark transition-colors"
      >
        Ver mis cartas
      </button>
    </div>
  );
}

export default function Step4Send() {
  const { selectedFormat, text, photos, wordCount, isSent } = useCompose();

  if (isSent) return <SuccessScreen />;

  return (
    <div>
      <div className="px-4 pt-4 pb-2">
        <h2 className="font-bold text-gray-900 text-lg">Vista previa</h2>
        <p className="text-sm text-gray-500 mt-0.5">Revisa tu carta antes de enviarla</p>
      </div>

      <div className="px-4 space-y-4 pb-6">
        {/* Format preview */}
        <div
          className="rounded-xl border-2 p-4"
          style={{
            backgroundColor: selectedFormat?.bgColor ?? '#fff',
            borderColor: selectedFormat?.borderColor ?? '#e5e7eb',
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">{selectedFormat?.emoji ?? '📄'}</span>
            <span className="text-sm font-semibold text-gray-700">{selectedFormat?.name ?? 'Sin formato'}</span>
          </div>
          <p className="text-xs text-gray-500 mb-2">Para: Jessica (mi patrocinadora)</p>
          <p className="text-sm text-gray-800 leading-relaxed line-clamp-4 whitespace-pre-line">
            {text || '(Sin texto)'}
          </p>
          <p className="text-xs text-gray-400 mt-2">{wordCount()} palabras</p>
        </div>

        {/* Photos */}
        {photos.length > 0 && (
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <Image size={15} className="text-gray-400" />
              <span className="text-sm font-medium text-gray-700">
                {photos.length} foto{photos.length > 1 ? 's' : ''} adjunta{photos.length > 1 ? 's' : ''}
              </span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {photos.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`Foto ${i + 1}`}
                  className="w-20 h-16 object-cover rounded-lg shadow-sm"
                />
              ))}
            </div>
          </div>
        )}

        <p className="text-xs text-gray-400 text-center">
          Una vez enviada, la carta será revisada por el equipo de Compassion antes de llegar a Jessica.
        </p>
      </div>
    </div>
  );
}
