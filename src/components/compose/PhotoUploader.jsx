import { Plus, X, Image } from 'lucide-react';

const MOCK_PHOTOS = [
  'https://picsum.photos/seed/letter1/200/150',
  'https://picsum.photos/seed/letter2/200/150',
  'https://picsum.photos/seed/letter3/200/150',
  'https://picsum.photos/seed/letter4/200/150',
  'https://picsum.photos/seed/letter5/200/150',
];

export default function PhotoUploader({ photos, onChange }) {
  const canAdd = photos.length < 5;

  function addPhoto() {
    if (!canAdd) return;
    const url = MOCK_PHOTOS[photos.length % MOCK_PHOTOS.length];
    onChange([...photos, url]);
  }

  function removePhoto(idx) {
    onChange(photos.filter((_, i) => i !== idx));
  }

  return (
    <div className="p-4">
      <p className="text-sm text-gray-600 mb-3">
        Puedes adjuntar hasta 5 fotos con tu carta.{' '}
        <span className="text-gray-400">({photos.length}/5)</span>
      </p>

      <div className="flex flex-wrap gap-3">
        {photos.map((url, idx) => (
          <div key={idx} className="relative w-24 h-24 rounded-xl overflow-hidden shadow-sm">
            <img src={url} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" />
            <button
              onClick={() => removePhoto(idx)}
              className="absolute top-1 right-1 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center"
            >
              <X size={11} className="text-white" />
            </button>
          </div>
        ))}

        {canAdd && (
          <button
            onClick={addPhoto}
            className="w-24 h-24 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-1 hover:border-compassion-blue hover:bg-compassion-blue-light transition-colors"
          >
            <Plus size={20} className="text-gray-400" />
            <span className="text-xs text-gray-400">Añadir</span>
          </button>
        )}
      </div>

      {photos.length === 0 && (
        <div className="mt-6 flex flex-col items-center text-gray-300 gap-2">
          <Image size={40} />
          <p className="text-sm text-gray-400">No has añadido fotos todavía</p>
        </div>
      )}
    </div>
  );
}
