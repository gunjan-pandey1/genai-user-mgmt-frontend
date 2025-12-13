import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addUser, updateUser } from '../store/usersSlice';
import { X } from 'lucide-react';

const UserForm = ({ existingUser, onClose }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'user',
        bio: '',    
    });

    useEffect(() => {
        if (existingUser) {
            setFormData({
                name: existingUser.name,
                email: existingUser.email,
                role: existingUser.role,
                bio: existingUser.bio || '',
            });
        }
    }, [existingUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (existingUser) {
            await dispatch(updateUser({ id: existingUser._id || existingUser.id, data: formData }));
        } else {
            await dispatch(addUser(formData));
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="glass-panel w-full max-w-md p-8 rounded-2xl relative animate-slide-up">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <X size={24} />
                </button>
                <h2 className="text-2xl font-bold mb-6 text-white">
                    {existingUser ? 'Edit User' : 'Add New User'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Role</label>
                        <select
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        >
                            <option value="user" className="bg-gray-800">User</option>
                            <option value="admin" className="bg-gray-800">Admin</option>
                            <option value="editor" className="bg-gray-800">Editor</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Bio</label>
                        <textarea
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all h-24"
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-accent hover:bg-accent-hover text-white font-semibold py-3 rounded-lg transition-all transform hover:scale-[1.02]"
                    >
                        {existingUser ? 'Update User' : 'Create User'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserForm;
