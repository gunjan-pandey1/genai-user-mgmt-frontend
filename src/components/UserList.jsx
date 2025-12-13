import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, deleteUser } from '../store/usersSlice';
import { Trash2, Edit, User } from 'lucide-react';

const UserList = ({ onEdit }) => {
    const dispatch = useDispatch();
    const { list: users, status } = useSelector((state) => state.users);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchUsers());
        }
    }, [status, dispatch]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteUser(id));
        }
    };

    return (
        <div className="glass-panel p-6 rounded-2xl animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                <User className="w-6 h-6 text-accent" /> Users Directory
            </h2>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {users.map((user) => (
                    <div key={user._id || user.id} className="glass-card p-4 rounded-xl relative group">
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => onEdit(user)} className="p-2 bg-blue-500/20 hover:bg-blue-500/40 rounded-full text-blue-300">
                                <Edit size={16} />
                            </button>
                            <button onClick={() => handleDelete(user._id || user.id)} className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-full text-red-300">
                                <Trash2 size={16} />
                            </button>
                        </div>
                        <h3 className="text-xl font-semibold text-white">{user.name}</h3>
                        <p className="text-gray-400 text-sm">{user.email}</p>
                        <span className="inline-block mt-2 px-3 py-1 bg-accent/20 text-accent text-xs rounded-full">
                            {user.role}
                        </span>
                        {user.bio && <p className="mt-3 text-gray-300 text-sm line-clamp-2">{user.bio}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserList;
