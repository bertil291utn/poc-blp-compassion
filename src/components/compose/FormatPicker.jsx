import { useState } from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';
import { letterFormats } from '../../data/mockData';

function FormatPreviewModal({ format, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-xs p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100"
        >
          <X size={18} className="text-gray-500" />
        </button>
        <h3 className="font-bold text-gray-900 mb-1">{format.name}</h3>
        <p className="text-sm text-gray-500 mb-4">{format.description}</p>
        <div
          className="w-full h-48 rounded-xl border-4 flex flex-col items-center justify-center gap-2"
          style={{ backgroundColor: format.bgColor, borderColor: format.borderColor }}
        >
          <span className="text-4xl">{format.emoji}</span>
          <span className="text-sm text-gray-600 font-medium">{format.name}</span>
          <div className="w-3/4 space-y-1.5">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-2 bg-gray-300/60 rounded-full" style={{ width: `${80 - i * 15}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FormatPicker({ selected, onSelect }) {
  const [preview, setPreview] = useState(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 p-4">
        {letterFormats.map((format) => {
          const isSelected = selected?.id === format.id;
          return (
            <div
              key={format.id}
              className={clsx(
                'relative rounded-xl border-2 p-3 cursor-pointer transition-all',
                isSelected
                  ? 'border-compassion-blue shadow-md'
                  : 'border-gray-200 hover:border-gray-300'
              )}
              style={{ backgroundColor: format.bgColor }}
              onClick={() => onSelect(format)}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-compassion-blue flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
              <div className="flex flex-col items-center text-center gap-1">
                <span className="text-2xl">{format.emoji}</span>
                <span className="text-sm font-semibold text-gray-800">{format.name}</span>
                <span className="text-xs text-gray-500">{format.description}</span>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setPreview(format); }}
                className="mt-2 w-full text-xs text-compassion-blue font-medium py-1 rounded-lg hover:bg-white/50 transition-colors"
              >
                Ver preview
              </button>
            </div>
          );
        })}
      </div>

      {preview && (
        <FormatPreviewModal format={preview} onClose={() => setPreview(null)} />
      )}
    </>
  );
}
