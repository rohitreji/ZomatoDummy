import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ShoppingBag, Heart, MapPin, Settings, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import Input from '../../components/Input/Input';
import { updateUser } from '../../api/userApi';
import { changePassword } from '../../api/authApi';

const Profile = () => {
  const navigate = useNavigate();
  const { user, token, logout, isAuthenticated, updateUserProfile } = useAuth();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  // Edit Profile State
  const [profileData, setProfileData] = useState({ name: user?.name || '', email: user?.email || '' });
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState('');
  const [profileSuccess, setProfileSuccess] = useState('');

  // Change Password State
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  // If user is not authenticated, redirect to login page
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setProfileError('');
    setProfileSuccess('');
    setProfileLoading(true);
    try {
      const res = await updateUser(user._id, profileData);
      updateUserProfile(res.data);
      setProfileSuccess('Profile updated successfully!');
    } catch (err) {
      setProfileError(err?.response?.data?.message || 'Failed to update profile');
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }
    setPasswordLoading(true);
    try {
      await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      }, token);
      setPasswordSuccess('Password changed successfully!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setPasswordError(err?.response?.data?.message || 'Failed to change password');
    } finally {
      setPasswordLoading(false);
    }
  };

  const openSettings = () => {
    setProfileData({ name: user.name, email: user.email });
    setProfileError('');
    setProfileSuccess('');
    setPasswordError('');
    setPasswordSuccess('');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setIsSettingsOpen(true);
  };

  const menuItems = [
    { label: 'Your Orders', icon: <ShoppingBag size={18} />, path: '/orders', desc: 'Manage your active & past orders' },
    { label: 'Wishlist', icon: <Heart size={18} />, path: '/wishlist', desc: 'Saved food spots you love' },
    { label: 'Manage Addresses', icon: <MapPin size={18} />, path: '/checkout', desc: 'Edit home or work destinations' },
    { label: 'Settings', icon: <Settings size={18} />, path: '#', desc: 'Configure notifications and password' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 mt-4">
      {/* Profile Overview Header Card */}
      <div className="glass-card rounded-[32px] p-8 border border-outline-variant/30 shadow-premium flex flex-col sm:flex-row items-center gap-6 mb-8 text-center sm:text-left">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/25 shadow-md flex-shrink-0">
          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-grow">
          <span className="px-3.5 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-label-sm font-black uppercase tracking-wider select-none">
            Gold Member
          </span>
          <h1 className="font-display text-headline-lg font-black text-on-surface capitalize mt-2 mb-1">
            {user.name}
          </h1>
          <p className="text-on-surface-variant text-body-sm">{user.email}</p>
        </div>
        <Button variant="outline" onClick={logout} className="font-bold flex-shrink-0">
          <LogOut size={16} className="mr-1" />
          <span>Log Out</span>
        </Button>
      </div>

      {/* Profile Navigation Menus grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {menuItems.map((item, idx) => (
          <div
            key={idx}
            onClick={() => {
              if (item.label === 'Settings') {
                openSettings();
              } else if (item.path !== '#') {
                navigate(item.path);
              }
            }}
            className="p-6 rounded-2xl border border-outline-variant/30 bg-white hover:border-primary/50 cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 group flex items-start gap-4 select-none"
          >
            <div className="bg-primary/5 text-primary p-3.5 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
              {item.icon}
            </div>
            <div>
              <h3 className="font-display text-body-lg font-extrabold text-on-surface group-hover:text-primary transition-colors">
                {item.label}
              </h3>
              <p className="text-on-surface-variant text-label-lg mt-1 leading-normal">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Settings Modal */}
      <Modal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} title="Account Settings">
        <div className="flex gap-4 border-b border-outline-variant/30 mb-6">
          <button
            className={`pb-3 font-bold text-label-lg transition-colors border-b-2 ${activeTab === 'profile' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'}`}
            onClick={() => setActiveTab('profile')}
          >
            Edit Profile
          </button>
          <button
            className={`pb-3 font-bold text-label-lg transition-colors border-b-2 ${activeTab === 'password' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'}`}
            onClick={() => setActiveTab('password')}
          >
            Change Password
          </button>
        </div>

        {activeTab === 'profile' ? (
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <Input
              id="prof-name"
              label="Full Name"
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              icon={<User size={18} />}
              required
            />
            <Input
              id="prof-email"
              label="Email Address"
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              icon={<User size={18} />}
              required
            />
            {profileError && <p className="text-error text-label-sm font-medium px-2">{profileError}</p>}
            {profileSuccess && <p className="text-primary text-label-sm font-medium px-2">{profileSuccess}</p>}
            <Button type="submit" variant="primary" className="w-full mt-2" loading={profileLoading} disabled={profileLoading}>
              Save Profile Changes
            </Button>
          </form>
        ) : (
          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <Input
              id="pass-current"
              label="Current Password"
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              icon={<Shield size={18} />}
              required
            />
            <Input
              id="pass-new"
              label="New Password"
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              icon={<Shield size={18} />}
              required
            />
            <Input
              id="pass-confirm"
              label="Confirm New Password"
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              icon={<Shield size={18} />}
              required
            />
            {passwordError && <p className="text-error text-label-sm font-medium px-2">{passwordError}</p>}
            {passwordSuccess && <p className="text-primary text-label-sm font-medium px-2">{passwordSuccess}</p>}
            <Button type="submit" variant="primary" className="w-full mt-2" loading={passwordLoading} disabled={passwordLoading}>
              Update Password
            </Button>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default Profile;
