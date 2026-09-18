import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ReviewDetails from './pages/ReviewDetails';
import ComingSoon from './pages/ComingSoon';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/ui/ScrollToTop';
import LegalPage from './pages/LegalPage';

import IndiaDestination from './pages/IndiaDestination';
import WorldDestination from './pages/WorldDestination';
import RegionPage from './pages/RegionPage';
import StoryPage from './pages/StoryPage';
import TourPage from './pages/TourPage';
import SpiritualDestinationPage from './pages/SpiritualDestinationPage';
import ExperiencesPage from './pages/ExperiencesPage';
import ExperienceDetailsPage from './pages/ExperienceDetailsPage';
import JournalPage from './pages/JournalPage';
import JournalDetailsPage from './pages/JournalDetailsPage';

import { GlobalCTA } from './components/sections/GlobalCTA';

import { TripPlannerProvider } from './context/TripPlannerContext';
import PlanPage from './pages/PlanPage';

import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import BookingDetailPage from './pages/BookingDetailPage';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { AdminDataProvider } from './context/AdminDataContext';
import { LoadingSpinner } from './components/ui/LoadingSpinner';

import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDestinations from './pages/admin/AdminDestinations';
import AdminDestinationForm from './pages/admin/AdminDestinationForm';
import AdminExperiences from './pages/admin/AdminExperiences';
import AdminExperienceForm from './pages/admin/AdminExperienceForm';
import AdminBookings from './pages/admin/AdminBookings';
import AdminBookingForm from './pages/admin/AdminBookingForm';
import AdminEnquiries from './pages/admin/AdminEnquiries';
import AdminEnquiryForm from './pages/admin/AdminEnquiryForm';
import AdminUsers from './pages/admin/AdminUsers';
import AdminUserForm from './pages/admin/AdminUserForm';
import AdminJournal from './pages/admin/AdminJournal';
import AdminJournalForm from './pages/admin/AdminJournalForm';
import AdminSettings from './pages/admin/AdminSettings';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/review/:id" element={<ReviewDetails />} />
          <Route path="/destinations/india" element={<IndiaDestination />} />
          <Route path="/destinations/world" element={<WorldDestination />} />
          <Route path="/spiritual/:id" element={<SpiritualDestinationPage />} />
          <Route path="/region/:id" element={<RegionPage />} />
          <Route path="/story/:id" element={<StoryPage />} />
          <Route path="/tour/:id" element={<TourPage />} />
          <Route path="/destinations" element={<ComingSoon />} />
          <Route path="/experiences" element={<ExperiencesPage />} />
          <Route path="/experiences/:slug" element={<ExperienceDetailsPage />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/journal/:slug" element={<JournalDetailsPage />} />
          <Route path="/plan" element={<PlanPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/booking/:id" element={<BookingDetailPage />} />
          <Route path="/privacy" element={<LegalPage title="Privacy Policy" />} />
          <Route path="/terms" element={<LegalPage title="Terms of Service" />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="destinations" element={<AdminDestinations />} />
            <Route path="destinations/:id" element={<AdminDestinationForm />} />
            <Route path="experiences" element={<AdminExperiences />} />
            <Route path="experiences/:id" element={<AdminExperienceForm />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="bookings/:id" element={<AdminBookingForm />} />
            <Route path="enquiries" element={<AdminEnquiries />} />
            <Route path="enquiries/:id" element={<AdminEnquiryForm />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="users/:id" element={<AdminUserForm />} />
            <Route path="journal" element={<AdminJournal />} />
            <Route path="journal/:id" element={<AdminJournalForm />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          <Route path="*" element={<ComingSoon />} />
        </Routes>
      </AnimatePresence>
  );
}

function ConditionalGlobalCTA() {
  const location = useLocation();
  if (location.pathname === '/profile' || location.pathname.startsWith('/booking/') || location.pathname.startsWith('/admin')) return null;
  return <GlobalCTA />;
}

function ConditionalNavbar() {
  const location = useLocation();
  if (location.pathname.startsWith('/admin')) return null;
  return <Navbar />;
}

function ConditionalFooter() {
  const location = useLocation();
  if (location.pathname.startsWith('/admin')) return null;
  return <Footer />;
}


function App() {
  return (
    <ToastProvider>
      <AdminDataProvider>
        <AuthProvider>
          <Router>
            <TripPlannerProvider>
              <ScrollToTop />
              <div className="flex flex-col min-h-screen bg-ivory text-charcoal">
                <ConditionalNavbar />
                <div className="flex-grow">
                  <AnimatedRoutes />
                </div>
                <ConditionalGlobalCTA />
                <ConditionalFooter />
              </div>
            </TripPlannerProvider>
          </Router>
        </AuthProvider>
      </AdminDataProvider>
    </ToastProvider>
  );
}

export default App;
