import clsx from 'clsx';

const config = {
  draft: { label: 'Borrador', classes: 'bg-gray-100 text-gray-600' },
  sent: { label: 'Enviada', classes: 'bg-green-100 text-green-700' },
  received: { label: 'Recibida', classes: 'bg-blue-100 text-blue-700' },
};

export default function LetterStatusBadge({ status }) {
  const { label, classes } = config[status] ?? config.draft;
  return (
    <span className={clsx('text-xs font-medium px-2 py-0.5 rounded-full', classes)}>
      {label}
    </span>
  );
}
