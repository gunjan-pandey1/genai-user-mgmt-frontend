import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get(`${API_URL}/users/`);
    return response.data;
});

export const addUser = createAsyncThunk('users/addUser', async (user) => {
    const response = await axios.post(`${API_URL}/users/`, user);
    return response.data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
    await axios.delete(`${API_URL}/users/${id}`);
    return id;
});

export const updateUser = createAsyncThunk('users/updateUser', async ({ id, data }) => {
    const response = await axios.put(`${API_URL}/users/${id}`, data);
    return response.data;
});

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        list: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.list = state.list.filter((u) => u._id !== action.payload && u.id !== action.payload);
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const index = state.list.findIndex((u) => (u._id || u.id) === (action.payload._id || action.payload.id));
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            });
    },
});

export default usersSlice.reducer;
