import React, { createContext, useContext, useState, useEffect } from 'react';
import { destinations as staticDestinations } from '../data/destinations';
import { experiences as staticExperiences } from '../data/experiences';
import { journalArticles as staticJournal } from '../data/journal';

const AdminDataContext = createContext();

export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error('useAdminData must be used within an AdminDataProvider');
  }
  return context;
};

export const AdminDataProvider = ({ children }) => {
  const [destinations, setDestinations] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [journal, setJournal] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('admin_authenticated') === 'true' || sessionStorage.getItem('admin_authenticated') === 'true';
  });
  const [adminCredentials, setAdminCredentials] = useState({ id: 'Admin', password: 'Admin@123' });

  // Initialize data from static files + localStorage overlays
  useEffect(() => {
    const loadData = () => {
      try {
        // Destinations
        const localDestinations = JSON.parse(localStorage.getItem('admin_destinations')) || [];
        const mergedDestinations = mergeData(staticDestinations, localDestinations);
        setDestinations(mergedDestinations);

        // Experiences
        const localExperiences = JSON.parse(localStorage.getItem('admin_experiences')) || [];
        const mergedExperiences = mergeData(staticExperiences, localExperiences);
        setExperiences(mergedExperiences);

        // Journal
        const localJournal = JSON.parse(localStorage.getItem('admin_journal')) || [];
        const mergedJournal = mergeData(staticJournal, localJournal);
        setJournal(mergedJournal);

        // Enquiries
        const localEnquiries = JSON.parse(localStorage.getItem('admin_enquiries')) || [];
        setEnquiries(localEnquiries);

        // Bookings
        const localBookings = JSON.parse(localStorage.getItem('admin_bookings')) || [];
        setBookings(localBookings);

        // Users
        let localUsers = JSON.parse(localStorage.getItem('admin_users'));
        if (!localUsers) {
          localUsers = [];
          localStorage.setItem('admin_users', JSON.stringify(localUsers));
        }
        setUsers(localUsers);

        // Auth
        const authFlag = localStorage.getItem('admin_authenticated') === 'true' || sessionStorage.getItem('admin_authenticated') === 'true';
        setIsAdminAuthenticated(authFlag);
        
        const localCredentials = localStorage.getItem('admin_credentials');
        if (localCredentials) {
          setAdminCredentials(JSON.parse(localCredentials));
        } else {
          // Set default if empty to ensure it's saved in local storage eventually
          localStorage.setItem('admin_credentials', JSON.stringify({ id: 'Admin', password: 'Admin@123' }));
        }
      } catch (error) {
        console.error('Error loading admin data from localStorage:', error);
      }
    };

    loadData();
  }, []);

  // Helper to merge static data with local modifications based on id or slug
  const mergeData = (staticData, localData) => {
    // Start with static data
    let merged = [...staticData];
    
    // Create a map of local data by id/slug for fast lookup
    const localMap = new Map();
    localData.forEach(item => {
      const key = item.id || item.slug;
      if (key) {
        localMap.set(key, item);
      }
    });

    // Replace static items with local edits
    merged = merged.map(item => {
      const key = item.id || item.slug;
      if (localMap.has(key)) {
        return { ...item, ...localMap.get(key) };
      }
      return item;
    });

    // Add new local items that are not in static data
    const staticKeys = new Set(merged.map(item => item.id || item.slug));
    localData.forEach(item => {
      const key = item.id || item.slug;
      if (!staticKeys.has(key)) {
        merged.push(item);
      }
    });

    return merged;
  };

  const loginAdmin = (remember = false) => {
    if (remember) {
      localStorage.setItem('admin_authenticated', 'true');
    } else {
      sessionStorage.setItem('admin_authenticated', 'true');
    }
    setIsAdminAuthenticated(true);
  };

  const logoutAdmin = () => {
    localStorage.removeItem('admin_authenticated');
    sessionStorage.removeItem('admin_authenticated');
    setIsAdminAuthenticated(false);
  };

  const updateAdminCredentials = (newId, newPassword) => {
    const newCreds = { id: newId, password: newPassword };
    setAdminCredentials(newCreds);
    localStorage.setItem('admin_credentials', JSON.stringify(newCreds));
  };

  const updateDestination = (destination) => {
    setDestinations(prev => {
      const updated = updateOrAddItem(prev, destination);
      saveToLocal('admin_destinations', updated.filter(item => isLocalEdited(staticDestinations, item)));
      return updated;
    });
  };

  const updateExperience = (experience) => {
    setExperiences(prev => {
      const updated = updateOrAddItem(prev, experience);
      saveToLocal('admin_experiences', updated.filter(item => isLocalEdited(staticExperiences, item)));
      return updated;
    });
  };

  const updateJournal = (article) => {
    setJournal(prev => {
      const updated = updateOrAddItem(prev, article);
      saveToLocal('admin_journal', updated.filter(item => isLocalEdited(staticJournal, item)));
      return updated;
    });
  };

  const addEnquiry = (enquiry) => {
    setEnquiries(prev => {
      const updated = [{ ...enquiry, id: Date.now().toString(), date: new Date().toISOString() }, ...prev];
      saveToLocal('admin_enquiries', updated);
      return updated;
    });
  };

  const updateEnquiry = (enquiry) => {
    setEnquiries(prev => {
      const updated = updateOrAddItem(prev, enquiry);
      saveToLocal('admin_enquiries', updated);
      return updated;
    });
  };

  const deleteEnquiry = (id) => {
    setEnquiries(prev => {
      const updated = prev.filter(item => (item.id || item.slug) !== id);
      saveToLocal('admin_enquiries', updated);
      return updated;
    });
  };

  const updateUser = (user) => {
    setUsers(prev => {
      const updated = updateOrAddItem(prev, user);
      saveToLocal('admin_users', updated);
      return updated;
    });
  };

  const addBooking = (booking) => {
    setBookings(prev => {
      const updated = [{ ...booking, id: `BK-${Date.now()}` }, ...prev];
      saveToLocal('admin_bookings', updated);
      return updated;
    });
  };

  const updateBooking = (booking) => {
    setBookings(prev => {
      const updated = updateOrAddItem(prev, booking);
      saveToLocal('admin_bookings', updated);
      return updated;
    });
  };

  const deleteBooking = (id) => {
    setBookings(prev => {
      const updated = prev.filter(item => (item.id || item.slug) !== id);
      saveToLocal('admin_bookings', updated);
      return updated;
    });
  };

  const deleteUser = (id) => {
    setUsers(prev => {
      const updated = prev.filter(item => (item.id || item.slug) !== id);
      saveToLocal('admin_users', updated);
      return updated;
    });
  };

  const updateOrAddItem = (list, item) => {
    const key = item.id || item.slug;
    const index = list.findIndex(i => (i.id || i.slug) === key);
    if (index >= 0) {
      const newList = [...list];
      newList[index] = item;
      return newList;
    }
    return [...list, item];
  };

  const isLocalEdited = (staticList, item) => {
    // If it's a new item or changed from static, save it.
    // For simplicity, we just save all updated items that are passed to update functions.
    // A more robust implementation would diff it, but this is a frontend mock.
    return true; 
  };

  const saveToLocal = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  };

  const getPublicDestinations = () => destinations.filter(item => item.status !== 'draft');
  const getPublicExperiences = () => experiences.filter(item => item.status !== 'draft');
  const getPublicJournal = () => journal.filter(item => item.status !== 'draft');

  const deleteDestination = (id) => {
    setDestinations(prev => {
      const index = prev.findIndex(item => (item.id || item.slug) === id);
      if (index >= 0) {
        const item = prev[index];
        const updatedItem = { ...item, status: 'draft' };
        const updated = updateOrAddItem(prev, updatedItem);
        saveToLocal('admin_destinations', updated.filter(i => isLocalEdited(staticDestinations, i)));
        return updated;
      }
      return prev;
    });
  };

  const deleteExperience = (id) => {
    setExperiences(prev => {
      const index = prev.findIndex(item => (item.id || item.slug) === id);
      if (index >= 0) {
        const item = prev[index];
        const updatedItem = { ...item, status: 'draft' };
        const updated = updateOrAddItem(prev, updatedItem);
        saveToLocal('admin_experiences', updated.filter(i => isLocalEdited(staticExperiences, i)));
        return updated;
      }
      return prev;
    });
  };

  const deleteJournal = (id) => {
    setJournal(prev => {
      const index = prev.findIndex(item => (item.id || item.slug) === id);
      if (index >= 0) {
        const item = prev[index];
        const updatedItem = { ...item, status: 'draft' };
        const updated = updateOrAddItem(prev, updatedItem);
        saveToLocal('admin_journal', updated.filter(i => isLocalEdited(staticJournal, i)));
        return updated;
      }
      return prev;
    });
  };

  const value = {
    destinations,
    experiences,
    journal,
    enquiries,
    users,
    bookings,
    isAdminAuthenticated,
    adminCredentials,
    loginAdmin,
    logoutAdmin,
    updateAdminCredentials,
    updateDestination,
    deleteDestination,
    updateExperience,
    deleteExperience,
    updateJournal,
    deleteJournal,
    updateEnquiry,
    addEnquiry,
    deleteEnquiry,
    updateUser,
    deleteUser,
    addBooking,
    updateBooking,
    deleteBooking,
    getPublicDestinations,
    getPublicExperiences,
    getPublicJournal
  };

  return (
    <AdminDataContext.Provider value={value}>
      {children}
    </AdminDataContext.Provider>
  );
};
