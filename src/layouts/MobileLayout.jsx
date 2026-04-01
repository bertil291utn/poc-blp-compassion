import { Outlet } from 'react-router-dom';
import BottomTabBar from '../components/navigation/BottomTabBar';

export default function MobileLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile header */}
      <header className="sm:hidden sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-compassion-blue rounded-md flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <span className="font-bold text-compassion-blue">MyConnect</span>
        </div>
      </header>

      {/* Main content */}
      <main className="sm:ml-56 pb-16 sm:pb-0 min-h-screen">
        <Outlet />
      </main>

      <BottomTabBar />
    </div>
  );
}
