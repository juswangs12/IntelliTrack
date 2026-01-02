import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { User, Mail, Lock, Save, Edit } from 'lucide-react';

export function ProfileManagement() {
  const [activeTab, setActiveTab] = useState('personal');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // 'email' or 'password'
  
  // Personal Information State
  const [personalInfo, setPersonalInfo] = useState({
    lastName: 'Doe',
    firstName: 'John',
    middleName: 'Smith',
    birthday: '2000-01-15',
    email: 'john.doe@university.edu',
    studentId: '2021-00001',
    program: 'BS Computer Science',
    yearLevel: '4th Year',
    contactNumber: '+63 912 345 6789',
    address: '123 Main Street, City, Province'
  });

  const [isEditing, setIsEditing] = useState(false);

  // Modal State
  const [emailData, setEmailData] = useState({
    newEmail: '',
    confirmEmail: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '••••••••',
    newPassword: '',
    confirmPassword: ''
  });

  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSavePersonalInfo = async () => {
    console.log('Saving personal info:', personalInfo);
    setIsEditing(false);
  };

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleEmailChange = async () => {
    if (emailData.newEmail !== emailData.confirmEmail) {
      alert('Emails do not match!');
      return;
    }
    console.log('Changing email to:', emailData.newEmail);
    setIsModalOpen(false);
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Changing password');
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#800020]">Profile Management</h1>
          <p className="text-muted-foreground">Manage your personal information and account settings</p>
        </div>
        <User className="w-12 h-12 text-[#FFD700]" />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveTab('personal')}
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === 'personal'
              ? 'border-b-2 border-[#800020] text-[#800020]'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Personal Information
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === 'security'
              ? 'border-b-2 border-[#800020] text-[#800020]'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Security Settings
        </button>
      </div>

      {/* Personal Information Tab */}
      {activeTab === 'personal' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </div>
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button onClick={() => setIsEditing(false)} variant="outline">
                    Cancel
                  </Button>
                  <Button onClick={handleSavePersonalInfo} className="bg-[#800020] hover:bg-[#9B1B30]">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={personalInfo.lastName}
                  onChange={(e) => handlePersonalInfoChange('lastName', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={personalInfo.firstName}
                  onChange={(e) => handlePersonalInfoChange('firstName', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="middleName">Middle Name</Label>
                <Input
                  id="middleName"
                  value={personalInfo.middleName}
                  onChange={(e) => handlePersonalInfoChange('middleName', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* Birthday and Student ID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="birthday">Birthday</Label>
                <Input
                  id="birthday"
                  type="date"
                  value={personalInfo.birthday}
                  onChange={(e) => handlePersonalInfoChange('birthday', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="studentId">Student ID</Label>
                <Input
                  id="studentId"
                  value={personalInfo.studentId}
                  disabled
                  className="bg-muted"
                />
              </div>
            </div>

            {/* Email (Read-only, changed via modal) */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={personalInfo.email}
                disabled
                className="bg-muted"
              />
            </div>

            {/* Program and Year Level */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="program">Program</Label>
                <Input
                  id="program"
                  value={personalInfo.program}
                  onChange={(e) => handlePersonalInfoChange('program', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="yearLevel">Year Level</Label>
                <Input
                  id="yearLevel"
                  value={personalInfo.yearLevel}
                  onChange={(e) => handlePersonalInfoChange('yearLevel', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* Contact Number */}
            <div className="space-y-2">
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input
                id="contactNumber"
                value={personalInfo.contactNumber}
                onChange={(e) => handlePersonalInfoChange('contactNumber', e.target.value)}
                disabled={!isEditing}
              />
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={personalInfo.address}
                onChange={(e) => handlePersonalInfoChange('address', e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Security Settings Tab */}
      {activeTab === 'security' && (
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Manage your email and password</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <Mail className="w-8 h-8 text-[#800020]" />
                <div>
                  <h3 className="font-semibold">Email Address</h3>
                  <p className="text-sm text-muted-foreground">{personalInfo.email}</p>
                </div>
              </div>
              <Button onClick={() => openModal('email')} variant="outline">
                Change Email
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <Lock className="w-8 h-8 text-[#800020]" />
                <div>
                  <h3 className="font-semibold">Password</h3>
                  <p className="text-sm text-muted-foreground">••••••••••••</p>
                </div>
              </div>
              <Button onClick={() => openModal('password')} variant="outline">
                Change Password
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Change Email/Password Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {modalType === 'email' ? 'Change Email Address' : 'Change Password'}
            </DialogTitle>
            <DialogDescription>
              {modalType === 'email' 
                ? 'Enter your new email address below'
                : 'Enter your current password and choose a new one'}
            </DialogDescription>
          </DialogHeader>

          {modalType === 'email' ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newEmail">New Email</Label>
                <Input
                  id="newEmail"
                  type="email"
                  placeholder="new.email@university.edu"
                  value={emailData.newEmail}
                  onChange={(e) => setEmailData(prev => ({ ...prev, newEmail: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmEmail">Confirm Email</Label>
                <Input
                  id="confirmEmail"
                  type="email"
                  placeholder="new.email@university.edu"
                  value={emailData.confirmEmail}
                  onChange={(e) => setEmailData(prev => ({ ...prev, confirmEmail: e.target.value }))}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="text"
                  value={passwordData.currentPassword}
                  disabled
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Enter new password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setIsModalOpen(false)} variant="outline">
              Cancel
            </Button>
            <Button 
              onClick={modalType === 'email' ? handleEmailChange : handlePasswordChange}
              className="bg-[#800020] hover:bg-[#9B1B30]"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
