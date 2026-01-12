'use client';

import { useState, useEffect } from 'react';

interface AdminUser {
    id: number;
    username: string;
    role: 'admin' | 'developer';
    created_at: string;
}

interface UserManagerProps {
    onClose: () => void;
    currentUserId: number;
}

export default function UserManager({ onClose, currentUserId }: UserManagerProps) {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'users' | 'password'>('users');

    // Add user form
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newRole, setNewRole] = useState<'admin' | 'developer'>('developer');
    const [addingUser, setAddingUser] = useState(false);

    // Password change form
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPasswordChange, setNewPasswordChange] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [changingPassword, setChangingPassword] = useState(false);

    // Messages
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const response = await fetch('/api/admin/users');
            const data = await response.json();
            setUsers(data.users || []);
            setLoading(false);
        } catch (error) {
            console.error('Failed to load users:', error);
            setLoading(false);
        }
    };

    const showMessage = (type: 'success' | 'error', text: string) => {
        setMessage({ type, text });
        setTimeout(() => setMessage(null), 3000);
    };

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setAddingUser(true);

        try {
            const response = await fetch('/api/admin/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: newUsername,
                    password: newPassword,
                    role: newRole,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                showMessage('error', data.error || 'Failed to add user');
                setAddingUser(false);
                return;
            }

            showMessage('success', `User "${newUsername}" created successfully!`);
            setNewUsername('');
            setNewPassword('');
            setNewRole('developer');
            loadUsers();
        } catch (error) {
            showMessage('error', 'Failed to add user');
        }
        setAddingUser(false);
    };

    const handleDeleteUser = async (user: AdminUser) => {
        if (user.id === currentUserId) {
            showMessage('error', 'Cannot delete your own account');
            return;
        }

        if (!confirm(`Are you sure you want to delete user "${user.username}"?`)) {
            return;
        }

        try {
            const response = await fetch(`/api/admin/users/${user.id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (!response.ok) {
                showMessage('error', data.error || 'Failed to delete user');
                return;
            }

            showMessage('success', 'User deleted successfully');
            loadUsers();
        } catch (error) {
            showMessage('error', 'Failed to delete user');
        }
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPasswordChange !== confirmPassword) {
            showMessage('error', 'New passwords do not match');
            return;
        }

        setChangingPassword(true);

        try {
            const response = await fetch('/api/admin/change-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    currentPassword,
                    newPassword: newPasswordChange,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                showMessage('error', data.error || 'Failed to change password');
                setChangingPassword(false);
                return;
            }

            showMessage('success', 'Password changed successfully!');
            setCurrentPassword('');
            setNewPasswordChange('');
            setConfirmPassword('');
        } catch (error) {
            showMessage('error', 'Failed to change password');
        }
        setChangingPassword(false);
    };

    const getRoleBadgeColor = (role: string) => {
        return role === 'admin'
            ? 'bg-purple-100 text-purple-800'
            : 'bg-blue-100 text-blue-800';
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50 sm:p-4">
            <div className="bg-white rounded-t-2xl sm:rounded-lg w-full sm:max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="p-4 sm:p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                            <i className="fa-solid fa-users-gear mr-2 text-purple-600"></i>
                            User Management
                        </h2>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
                        >
                            <i className="fa-solid fa-times text-xl text-gray-500"></i>
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 mt-4">
                        <button
                            onClick={() => setActiveTab('users')}
                            className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === 'users'
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            <i className="fa-solid fa-users mr-2"></i>
                            Users
                        </button>
                        <button
                            onClick={() => setActiveTab('password')}
                            className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === 'password'
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            <i className="fa-solid fa-key mr-2"></i>
                            Change Password
                        </button>
                    </div>
                </div>

                {/* Message Toast */}
                {message && (
                    <div className={`mx-4 mt-4 p-3 rounded-lg flex items-center gap-2 ${message.type === 'success'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                        }`}>
                        <i className={`fa-solid ${message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
                        {message.text}
                    </div>
                )}

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                    {activeTab === 'users' && (
                        <div className="space-y-6">
                            {/* Add User Form */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="font-semibold text-gray-800 mb-3">
                                    <i className="fa-solid fa-user-plus mr-2 text-green-600"></i>
                                    Add New User
                                </h3>
                                <form onSubmit={handleAddUser} className="space-y-3">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <input
                                            type="text"
                                            placeholder="Username"
                                            value={newUsername}
                                            onChange={(e) => setNewUsername(e.target.value)}
                                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            required
                                            minLength={3}
                                        />
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            required
                                            minLength={6}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={addingUser}
                                        className="w-full sm:w-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                                    >
                                        {addingUser ? (
                                            <i className="fa-solid fa-spinner fa-spin"></i>
                                        ) : (
                                            <>
                                                <i className="fa-solid fa-plus mr-2"></i>
                                                Add User
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>

                            {/* User List */}
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-3">
                                    <i className="fa-solid fa-list mr-2 text-blue-600"></i>
                                    All Users ({users.length})
                                </h3>
                                {loading ? (
                                    <div className="text-center py-8">
                                        <i className="fa-solid fa-spinner fa-spin text-2xl text-purple-600"></i>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        {users.map((user) => (
                                            <div
                                                key={user.id}
                                                className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                                        <i className="fa-solid fa-user text-gray-500"></i>
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900 flex items-center gap-2">
                                                            {user.username}
                                                            {user.id === currentUserId && (
                                                                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                                                                    You
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            Created: {new Date(user.created_at).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getRoleBadgeColor(user.role)}`}>
                                                        {user.role}
                                                    </span>
                                                    {user.id !== currentUserId && (
                                                        <button
                                                            onClick={() => handleDeleteUser(user)}
                                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                                            title="Delete user"
                                                        >
                                                            <i className="fa-solid fa-trash"></i>
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'password' && (
                        <div className="max-w-md mx-auto">
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="font-semibold text-gray-800 mb-4">
                                    <i className="fa-solid fa-lock mr-2 text-orange-600"></i>
                                    Change Your Password
                                </h3>
                                <form onSubmit={handleChangePassword} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Current Password
                                        </label>
                                        <input
                                            type="password"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            New Password
                                        </label>
                                        <input
                                            type="password"
                                            value={newPasswordChange}
                                            onChange={(e) => setNewPasswordChange(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            required
                                            minLength={6}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Confirm New Password
                                        </label>
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            required
                                            minLength={6}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={changingPassword}
                                        className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:opacity-50 font-semibold"
                                    >
                                        {changingPassword ? (
                                            <i className="fa-solid fa-spinner fa-spin"></i>
                                        ) : (
                                            <>
                                                <i className="fa-solid fa-check mr-2"></i>
                                                Update Password
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
