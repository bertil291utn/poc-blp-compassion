import { useLocation, useNavigate } from 'react-router-dom';
import { Mail, PenLine, User } from 'lucide-react';
import clsx from 'clsx';

const tabs = [
  { label: 'Cartas', icon: Mail, path: '/letters' },
  { label: 'Escribir', icon: PenLine, path: '/compose' },
  { label: 'Cuenta', icon: User, path: '/account' },
];

export default function BottomTabBar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      {/* Mobile: bottom bar */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-pb">
        <div className="flex">
          {tabs.map(({ label, icon: Icon, path }) => {
            const active = location.pathname.startsWith(path);
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={clsx(
                  'flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors',
                  active ? 'text-compassion-blue' : 'text-gray-400'
                )}
              >
                <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
                <span className={clsx('text-xs', active ? 'font-semibold' : 'font-normal')}>
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Desktop: left sidebar */}
      <aside className="hidden sm:flex flex-col fixed left-0 top-0 bottom-0 w-56 bg-white border-r border-gray-200 z-50 pt-6 pb-4">
        <div className="px-4 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-compassion-blue rounded-lg flex items-center justify-center">
              <Mail size={16} className="text-white" />
            </div>
            <span className="font-bold text-compassion-blue text-lg">MyConnect</span>
          </div>
        </div>
        {tabs.map(({ label, icon: Icon, path }) => {
          const active = location.pathname.startsWith(path);
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={clsx(
                'flex items-center gap-3 mx-3 px-3 py-3 rounded-lg mb-1 transition-colors text-left',
                active
                  ? 'bg-compassion-blue-light text-compassion-blue font-semibold'
                  : 'text-gray-600 hover:bg-gray-100'
              )}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
              <span className="text-sm">{label}</span>
            </button>
          );
        })}
      </aside>
    </>
  );
}
