import React, { useState, useEffect } from 'react';
import { Settings, Bell, Lock, User, Palette } from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';

export default function AdminSettings() {
  const { adminCredentials, updateAdminCredentials } = useAdminData();
  const [displayName, setDisplayName] = useState("TripCanvas Administrator");
  const [email, setEmail] = useState("Admin");
  const [theme, setTheme] = useState(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [enquirySummaries, setEnquirySummaries] = useState(false);

  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [currentIdInput, setCurrentIdInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (currentIdInput !== adminCredentials.id) {
      setPasswordError('Current ID does not match.');
      return;
    }
    
    if (newPasswordInput.length < 6) {
      setPasswordError('New password must be at least 6 characters.');
      return;
    }

    updateAdminCredentials(adminCredentials.id, newPasswordInput);
    setPasswordSuccess('Password successfully updated!');
    setCurrentIdInput('');
    setNewPasswordInput('');
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setPasswordSuccess('');
      setIsEditingPassword(false);
    }, 3000);
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 dark:text-gray-100">
      <div>
        <h1 className="text-2xl font-bold font-serif text-gray-900 dark:text-white">Settings</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage your admin preferences and platform configurations.</p>
      </div>

      <div className="bg-white dark:bg-charcoal shadow sm:rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          
          {/* Profile Section */}
          <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="flex items-center gap-2 mb-2">
                <User className="h-5 w-5 text-gray-400 dark:text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Admin Profile</h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Update your account information and email address.</p>
            </div>
            <div className="md:w-2/3 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Display Name</label>
                <input 
                  type="text" 
                  value={displayName} 
                  onChange={(e) => setDisplayName(e.target.value)} 
                  className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border dark:bg-gray-800 dark:border-gray-600 dark:text-white" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">ID / Email</label>
                <input 
                  type="text" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border dark:bg-gray-800 dark:border-gray-600 dark:text-white" 
                />
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="flex items-center gap-2 mb-2">
                <Palette className="h-5 w-5 text-gray-400 dark:text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Appearance</h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Customize the look and feel of the admin dashboard.</p>
            </div>
            <div className="md:w-2/3">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="theme" 
                    checked={theme === 'light'} 
                    onChange={() => setTheme('light')}
                    className="text-primary focus:ring-primary" 
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Light Mode</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="theme" 
                    checked={theme === 'dark'} 
                    onChange={() => setTheme('dark')}
                    className="text-primary focus:ring-primary" 
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Dark Mode</span>
                </label>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="flex items-center gap-2 mb-2">
                <Bell className="h-5 w-5 text-gray-400 dark:text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Notifications</h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Manage how you receive alerts for new bookings and enquiries.</p>
            </div>
            <div className="md:w-2/3 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Email Alerts</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Receive an email when a new booking is made.</p>
                </div>
                <button 
                  type="button" 
                  onClick={() => setEmailAlerts(!emailAlerts)}
                  className={`${emailAlerts ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-600'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                >
                  <span aria-hidden="true" className={`${emailAlerts ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}></span>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Enquiry Summaries</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Receive a weekly digest of all enquiries.</p>
                </div>
                <button 
                  type="button" 
                  onClick={() => setEnquirySummaries(!enquirySummaries)}
                  className={`${enquirySummaries ? 'bg-blue-600 dark:border-transparent' : 'bg-gray-200 dark:bg-transparent border-transparent dark:border-white'} border-2 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                >
                  <span aria-hidden="true" className={`${enquirySummaries ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}></span>
                </button>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="h-5 w-5 text-gray-400 dark:text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Security</h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Ensure your account stays secure.</p>
            </div>
            <div className="md:w-2/3">
              {!isEditingPassword ? (
                <button 
                  type="button"
                  onClick={() => setIsEditingPassword(true)}
                  className="bg-white dark:bg-gray-800 dark:text-white py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Change Password
                </button>
              ) : (
                <form onSubmit={handlePasswordChange} className="space-y-4 max-w-sm">
                  {passwordError && (
                    <div className="text-sm text-red-600 dark:text-red-400">{passwordError}</div>
                  )}
                  {passwordSuccess && (
                    <div className="text-sm text-green-600 dark:text-green-400">{passwordSuccess}</div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Current ID</label>
                    <input 
                      type="text"
                      required
                      value={currentIdInput}
                      onChange={e => setCurrentIdInput(e.target.value)}
                      className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
                    <input 
                      type="password"
                      required
                      value={newPasswordInput}
                      onChange={e => setNewPasswordInput(e.target.value)}
                      className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditingPassword(false);
                        setPasswordError('');
                        setPasswordSuccess('');
                      }}
                      className="bg-white dark:bg-gray-800 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-primary text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Save Password
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
