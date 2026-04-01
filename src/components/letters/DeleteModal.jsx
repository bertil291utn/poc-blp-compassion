import { Trash2 } from 'lucide-react';

export default function DeleteModal({ letter, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onCancel}
      />
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 animate-in">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
          <Trash2 size={22} className="text-red-600" />
        </div>
        <h2 className="text-lg font-bold text-gray-900 text-center mb-2">
          Eliminar carta
        </h2>
        <p className="text-gray-600 text-sm text-center mb-6">
          ¿Estás seguro de que quieres eliminar{' '}
          <span className="font-semibold">"{letter.subject}"</span>?
          Esta acción no se puede deshacer.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 px-4 rounded-xl border border-gray-300 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 text-white font-medium text-sm hover:bg-red-700 transition-colors"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
