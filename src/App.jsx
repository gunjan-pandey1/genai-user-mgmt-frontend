import React, { useState } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import ChatWindow from './components/ChatWindow';
import { Plus, MessageSquare } from 'lucide-react';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setEditingUser(null);
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white font-sans selection:bg-accent selection:text-white">
      {/* Background Blobs */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              GenAI User Manager
            </h1>
            <p className="text-gray-400 mt-2">Manage users and ask AI about them.</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="glass-button flex items-center gap-2 px-5 py-2.5 rounded-xl hover:bg-white/10 transition-all border border-white/10"
            >
              <MessageSquare size={20} className="text-blue-400" />
              <span>{isChatOpen ? 'Close Chat' : 'Ask AI'}</span>
            </button>
            <button
              onClick={handleAddNew}
              className="bg-accent hover:bg-accent-hover text-white flex items-center gap-2 px-5 py-2.5 rounded-xl shadow-lg shadow-accent/20 transition-all transform hover:scale-105"
            >
              <Plus size={20} />
              <span>Add User</span>
            </button>
          </div>
        </header>

        <main>
          <UserList onEdit={handleEdit} />
        </main>

        {isFormOpen && (
          <UserForm
            existingUser={editingUser}
            onClose={() => setIsFormOpen(false)}
          />
        )}

        {isChatOpen && (
          <ChatWindow onClose={() => setIsChatOpen(false)} />
        )}
      </div>
    </div>
  );
}

export default App;
