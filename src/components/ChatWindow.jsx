import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, clearChat } from '../store/chatSlice';
import { Send, Bot, User, Trash2, X } from 'lucide-react';

const ChatWindow = ({ onClose }) => {
    const dispatch = useDispatch();
    const { messages, status } = useSelector((state) => state.chat);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        dispatch(sendMessage(input));
        setInput('');
    };

    return (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] glass-panel rounded-2xl flex flex-col shadow-2xl animate-fade-in z-40 border border-white/20">
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5 rounded-t-2xl">
                <h3 className="font-bold text-white flex items-center gap-2">
                    <Bot className="text-accent" /> AI Assistant
                </h3>
                <div className="flex gap-2">
                    <button onClick={() => dispatch(clearChat())} className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white" title="Clear Chat">
                        <Trash2 size={18} />
                    </button>
                    {onClose && (
                        <button onClick={onClose} className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white">
                            <X size={18} />
                        </button>
                    )}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
                {messages.length === 0 && (
                    <div className="text-center text-gray-400 mt-20">
                        <Bot size={48} className="mx-auto mb-2 opacity-50" />
                        <p>Ask me anything about the users!</p>
                    </div>
                )}
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.type === 'user' ? 'bg-blue-500' : 'bg-accent'}`}>
                            {msg.type === 'user' ? <User size={16} text-white /> : <Bot size={16} text-white />}
                        </div>
                        <div className={`p-3 rounded-2xl max-w-[80%] text-sm ${msg.type === 'user'
                                ? 'bg-blue-500/20 text-white rounded-tr-none'
                                : 'bg-white/10 text-gray-200 rounded-tl-none'
                            }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {status === 'loading' && (
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0">
                            <Bot size={16} text-white />
                        </div>
                        <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none flex items-center gap-1">
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-white/5 rounded-b-2xl">
                <div className="relative">
                    <input
                        type="text"
                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-white focus:ring-1 focus:ring-accent outline-none placeholder-gray-500"
                        placeholder="Type your question..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                        type="submit"
                        disabled={status === 'loading' || !input.trim()}
                        className="absolute right-2 top-2 p-1.5 bg-accent hover:bg-accent-hover rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatWindow;
