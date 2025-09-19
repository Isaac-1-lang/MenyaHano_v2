import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'user' | 'admin'
  createdAt: string
  updatedAt: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

interface AuthResponse {
  user: User
  token: string
}

// Mock API functions - replace with real API calls
const mockApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (credentials.email === 'admin@menyahano.com' && credentials.password === 'admin123') {
      return {
        user: {
          id: '1',
          email: credentials.email,
          name: 'Admin User',
          role: 'admin',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        token: 'mock-jwt-token-' + Date.now()
      }
    }
    
    if (credentials.email === 'user@menyahano.com' && credentials.password === 'user123') {
      return {
        user: {
          id: '2',
          email: credentials.email,
          name: 'Regular User',
          role: 'user',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        token: 'mock-jwt-token-' + Date.now()
      }
    }
    
    throw new Error('Invalid credentials')
  },
  
  register: async (data: RegisterData): Promise<AuthResponse> => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (data.password !== data.confirmPassword) {
      throw new Error('Passwords do not match')
    }
    
    return {
      user: {
        id: Date.now().toString(),
        email: data.email,
        name: data.name,
        role: 'user',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      token: 'mock-jwt-token-' + Date.now()
    }
  },
  
  logout: async (): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500))
  }
}

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await mockApi.login(credentials)
      return response
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const registerUser = createAsyncThunk(
  'auth/register',
  async (data: RegisterData, { rejectWithValue }) => {
    try {
      const response = await mockApi.register(data)
      return response
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await mockApi.logout()
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearAuth: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false
        state.user = null
        state.token = null
        state.isAuthenticated = false
        state.error = null
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { clearError, clearAuth } = authSlice.actions
export default authSlice.reducer
