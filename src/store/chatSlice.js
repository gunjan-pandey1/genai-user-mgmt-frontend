import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const sendMessage = createAsyncThunk('chat/sendMessage', async (message) => {
    const response = await axios.post(`${API_URL}/chat`, { question: message });
    return { question: message, answer: response.data.answer };
});

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messages: [], // Array of { type: 'user' | 'bot', text: string }
        status: 'idle',
    },
    reducers: {
        clearChat: (state) => {
            state.messages = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendMessage.pending, (state, action) => {
                state.status = 'loading';
                state.messages.push({ type: 'user', text: action.meta.arg });
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.messages.push({ type: 'bot', text: action.payload.answer });
            })
            .addCase(sendMessage.rejected, (state) => {
                state.status = 'failed';
                state.messages.push({ type: 'bot', text: 'Error processing request.' });
            });
    },
});

export const { clearChat } = chatSlice.actions;
export default chatSlice.reducer;
