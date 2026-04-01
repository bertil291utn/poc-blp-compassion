import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Inbox, Mail, FileEdit, Send, Image, MoreVertical, Trash2 } from 'lucide-react';
import clsx from 'clsx';
import LetterStatusBadge from './LetterStatusBadge';
import DeleteModal from './DeleteModal';

function StatusIcon({ status, isUnread }) {
  if (status === 'received') {
    return (
      <div className="relative flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-compassion-blue-light flex items-center justify-center">
          <Inbox size={18} className="text-compassion-blue" />
        </div>
        {isUnread && (
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-orange-500 rounded-full border-2 border-white" />
        )}
      </div>
    );
  }
  if (status === 'draft') {
    return (
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
        <FileEdit size={18} className="text-gray-500" />
      </div>
    );
  }
  return (
    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
      <Send size={18} className="text-letter-sent" />
    </div>
  );
}

export default function LetterCard({ letter, onDelete }) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  return (
    <>
      <div
        className={clsx(
          'bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex gap-3 cursor-pointer hover:shadow-md transition-shadow relative',
          letter.isUnread && 'border-l-4 border-l-compassion-blue'
        )}
        onClick={() => navigate(`/letters/${letter.id}`)}
      >
        <StatusIcon status={letter.status} isUnread={letter.isUnread} />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className={clsx(
                'text-sm truncate',
                letter.isUnread ? 'font-bold text-gray-900' : 'font-medium text-gray-800'
              )}>
                {letter.status === 'received' ? letter.from : `Para: ${letter.to}`}
              </p>
              <p className={clsx(
                'text-sm truncate',
                letter.isUnread ? 'font-semibold text-gray-900' : 'text-gray-700'
              )}>
                {letter.subject}
              </p>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <span className="text-xs text-gray-400">{formatDate(letter.date)}</span>
              <button
                onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <MoreVertical size={15} className="text-gray-400" />
              </button>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
            {letter.preview}
          </p>

          <div className="flex items-center gap-2 mt-2">
            <LetterStatusBadge status={letter.status} />
            {letter.hasPhotos && (
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <Image size={12} />
                {letter.photoCount} foto{letter.photoCount > 1 ? 's' : ''}
              </span>
            )}
            {letter.status === 'draft' && letter.minWords && (
              <span className="text-xs text-orange-600 font-medium">
                {letter.wordCount}/{letter.minWords} palabras
              </span>
            )}
            {letter.tag && (
              <span className="text-xs text-gray-400 italic" title="Procesada por el equipo de Compassion">
                {letter.tag}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Inline menu */}
      {showMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowMenu(false)}
        >
          <div
            className="absolute bg-white rounded-xl shadow-lg border border-gray-100 py-1 w-40 z-50"
            style={{ top: '50%', right: '1rem' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => { setShowMenu(false); setShowDeleteModal(true); }}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <Trash2 size={15} />
              Eliminar
            </button>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <DeleteModal
          letter={letter}
          onConfirm={() => { setShowDeleteModal(false); onDelete(letter.id); }}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
}
