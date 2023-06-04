import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
	isAuthenticated: boolean;
}
const initalAuthState: AuthState = {
	isAuthenticated: false,
};

const authSlice = createSlice({
	name: 'authentication',
	initialState: initalAuthState,
	reducers: {
		login(state) {
			state.isAuthenticated = true;
		},
		logout(state) {
			state.isAuthenticated = false;
		},
	},
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
