import React, { useState, useEffect, useRef } from 'react';
import { Outlet, NavLink, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { useAdminData } from '../../context/AdminDataContext';
import { 
  Home, 
  Map, 
  Sparkles, 
  BookOpen, 
  Users, 
  Inbox, 
  Calendar,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: Home },
  { name: 'Destinations', href: '/admin/destinations', icon: Map },
  { name: 'Experiences', href: '/admin/experiences', icon: Sparkles },
  { name: 'Bookings', href: '/admin/bookings', icon: Calendar },
  { name: 'Enquiries', href: '/admin/enquiries', icon: Inbox },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Journal', href: '/admin/journal', icon: BookOpen },
];

export default function AdminLayout() {
  const { isAdminAuthenticated, logoutAdmin } = useAdminData();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mainRef = useRef(null);

  // Reset scroll position on route change
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [location.pathname]);

  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      logoutAdmin();
      navigate('/admin/login');
    }
  };

  return (
    <div className="h-screen bg-gray-50 dark:bg-charcoal flex flex-col font-sans transition-colors duration-200">

      <div className="flex flex-1 overflow-hidden">
        {/* Mobile sidebar */}
        <div className={`fixed inset-0 flex z-40 lg:hidden ${mobileMenuOpen ? '' : 'pointer-events-none'}`}>
          <div 
            className={`fixed inset-0 bg-gray-600 dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-80 transition-opacity duration-300 ease-linear ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`} 
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className={`relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white dark:bg-ink transition ease-in-out duration-300 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white dark:focus:ring-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <X className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
            <div className="flex-shrink-0 flex items-center px-4">
              <span className="text-2xl font-serif font-bold text-primary dark:text-white">TripCanvas</span>
            </div>
            <div className="mt-5 flex-1 h-0 overflow-y-auto">
              <nav className="px-2 space-y-1">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                        isActive ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <item.icon
                          className={`mr-4 flex-shrink-0 h-6 w-6 ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'}`}
                          aria-hidden="true"
                        />
                        {item.name}
                      </>
                    )}
                  </NavLink>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-800 p-4 space-y-1 flex-col">
              <NavLink to="/admin/settings" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) => `group flex items-center px-2 py-2 text-base font-medium rounded-md ${isActive ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'}`}>
                {({ isActive }) => (
                  <>
                    <Settings className={`mr-4 h-6 w-6 ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'}`} />
                    Settings
                  </>
                )}
              </NavLink>
              <button onClick={handleLogout} className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white w-full">
                <LogOut className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-ink">
            <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <span className="text-2xl font-serif font-bold text-primary dark:text-white">TripCanvas</span>
              </div>
              <nav className="mt-8 flex-1 px-2 bg-white dark:bg-ink space-y-1">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                        isActive ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <item.icon
                          className={`mr-3 flex-shrink-0 h-5 w-5 ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'}`}
                          aria-hidden="true"
                        />
                        {item.name}
                      </>
                    )}
                  </NavLink>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-800 p-4 flex-col space-y-1">
              <NavLink to="/admin/settings" className={({ isActive }) => `group flex w-full items-center px-2 py-2 text-sm font-medium rounded-md ${isActive ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'}`}>
                {({ isActive }) => (
                  <>
                    <Settings className={`mr-3 h-5 w-5 ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'}`} />
                    Settings
                  </>
                )}
              </NavLink>
              <button onClick={handleLogout} className="group flex w-full items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white">
                <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main column */}
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          {/* Mobile top navigation */}
          <div className="lg:hidden relative z-10 flex-shrink-0 flex h-16 bg-white dark:bg-ink border-b border-gray-200 dark:border-gray-800">
            <button
              type="button"
              className="px-4 border-r border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-1 flex justify-between px-4 sm:px-6 lg:px-8">
              <div className="flex-1 flex items-center">
                <span className="text-xl font-serif font-bold text-primary dark:text-white">TripCanvas Admin</span>
              </div>
            </div>
          </div>

          <main ref={mainRef} className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-900 dark:text-gray-100">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
