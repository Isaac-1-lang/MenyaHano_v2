import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface HealthcareProvider {
  id: string
  name: string
  type: 'hospital' | 'clinic' | 'pharmacy' | 'emergency'
  description: string
  imageUrl: string
  location: {
    address: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  services: string[]
  languages: string[]
  rating: number
  contact: {
    phone: string
    email?: string
    website?: string
  }
  openingHours: {
    [key: string]: string
  }
  isEmergency: boolean
  is24Hours: boolean
  insuranceAccepted: string[]
  tags: string[]
  country: 'EAC' | 'USA' | 'France' | 'Korea' | 'China'
}

export interface HealthcareState {
  providers: HealthcareProvider[]
  emergencyProviders: HealthcareProvider[]
  categories: string[]
  isLoading: boolean
  error: string | null
  selectedType: string | null
  selectedCountry: 'EAC' | 'USA' | 'France' | 'Korea' | 'China' | null
}

// Mock data
const mockHealthcareProviders: HealthcareProvider[] = [
  {
    id: '1',
    name: 'City General Hospital',
    type: 'hospital',
    description: 'Full-service hospital with emergency department and specialized care units.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop',
    location: {
      address: '789 Medical Center Drive',
      coordinates: { lat: 40.7614, lng: -73.9776 }
    },
    services: ['Emergency Care', 'Surgery', 'Cardiology', 'Pediatrics', 'Maternity'],
    languages: ['English', 'Spanish', 'French'],
    rating: 4.7,
    contact: {
      phone: '+1-555-9111',
      email: 'info@citygeneral.com',
      website: 'https://citygeneral.com'
    },
    openingHours: {
      monday: '24/7',
      tuesday: '24/7',
      wednesday: '24/7',
      thursday: '24/7',
      friday: '24/7',
      saturday: '24/7',
      sunday: '24/7'
    },
    isEmergency: true,
    is24Hours: true,
    insuranceAccepted: ['Blue Cross', 'Aetna', 'Cigna', 'Medicare'],
    tags: ['emergency', 'hospital', 'full-service'],
    country: 'USA'
  },
  {
    id: '2',
    name: 'Downtown Medical Clinic',
    type: 'clinic',
    description: 'Primary care clinic offering general medical services and preventive care.',
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop',
    location: {
      address: '456 Health Street, Downtown',
      coordinates: { lat: 40.7505, lng: -73.9934 }
    },
    services: ['General Medicine', 'Preventive Care', 'Vaccinations', 'Health Screenings'],
    languages: ['English', 'Spanish'],
    rating: 4.5,
    contact: {
      phone: '+1-555-2222',
      email: 'appointments@downtownclinic.com'
    },
    openingHours: {
      monday: '8:00 AM - 6:00 PM',
      tuesday: '8:00 AM - 6:00 PM',
      wednesday: '8:00 AM - 6:00 PM',
      thursday: '8:00 AM - 6:00 PM',
      friday: '8:00 AM - 5:00 PM',
      saturday: '9:00 AM - 2:00 PM',
      sunday: 'Closed'
    },
    isEmergency: false,
    is24Hours: false,
    insuranceAccepted: ['Blue Cross', 'Aetna', 'Medicare'],
    tags: ['primary-care', 'clinic', 'preventive'],
    country: 'EAC'
  },
  {
    id: '3',
    name: '24/7 Emergency Pharmacy',
    type: 'pharmacy',
    description: 'Round-the-clock pharmacy services for urgent medication needs.',
    imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=400&fit=crop',
    location: {
      address: '321 Pharmacy Lane',
      coordinates: { lat: 40.7589, lng: -73.9851 }
    },
    services: ['Prescription Filling', 'Over-the-Counter Medications', 'Health Consultations'],
    languages: ['English', 'Spanish', 'Mandarin'],
    rating: 4.3,
    contact: {
      phone: '+1-555-3333',
      email: 'info@24pharmacy.com'
    },
    openingHours: {
      monday: '24/7',
      tuesday: '24/7',
      wednesday: '24/7',
      thursday: '24/7',
      friday: '24/7',
      saturday: '24/7',
      sunday: '24/7'
    },
    isEmergency: true,
    is24Hours: true,
    insuranceAccepted: ['Blue Cross', 'Aetna', 'Cigna', 'Medicare', 'Medicaid'],
    tags: ['pharmacy', '24-hours', 'emergency'],
    country: 'France'
  }
]

// Mock API functions
const mockApi = {
  getHealthcareProviders: async (type?: string, country?: 'EAC' | 'USA' | 'France' | 'Korea' | 'China'): Promise<HealthcareProvider[]> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    let filteredProviders = [...mockHealthcareProviders]
    
    if (type) {
      filteredProviders = filteredProviders.filter(provider => 
        provider.type === type
      )
    }

    if (country) {
      filteredProviders = filteredProviders.filter(provider => provider.country === country)
    }
    
    return filteredProviders
  },
  
  getEmergencyProviders: async (country: 'EAC' | 'USA' | 'France' | 'Korea' | 'China' | undefined): Promise<HealthcareProvider[]> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    let items = mockHealthcareProviders.filter(provider => provider.isEmergency)
    if (country) {
      items = items.filter(p => p.country === country)
    }
    return items
  },
  
  getProviderById: async (id: string): Promise<HealthcareProvider | null> => {
    await new Promise(resolve => setTimeout(resolve, 200))
    return mockHealthcareProviders.find(provider => provider.id === id) || null
  }
}

// Async thunks
export const fetchHealthcareProviders = createAsyncThunk(
  'healthcare/fetchProviders',
  async ({ type, country }: { type?: string; country?: 'EAC' | 'USA' | 'France' | 'Korea' | 'China' }, { rejectWithValue }) => {
    try {
      const response = await mockApi.getHealthcareProviders(type, country)
      return response
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchEmergencyProviders = createAsyncThunk(
  'healthcare/fetchEmergencyProviders',
  async (country: 'EAC' | 'USA' | 'France' | 'Korea' | 'China' | undefined, { rejectWithValue }) => {
    try {
      const response = await mockApi.getEmergencyProviders(country)
      return response
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchProviderById = createAsyncThunk(
  'healthcare/fetchProviderById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await mockApi.getProviderById(id)
      return response
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState: HealthcareState = {
  providers: [],
  emergencyProviders: [],
  categories: ['hospital', 'clinic', 'pharmacy', 'emergency'],
  isLoading: false,
  error: null,
  selectedType: null,
  selectedCountry: null,
}

const healthcareSlice = createSlice({
  name: 'healthcare',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setSelectedType: (state, action: PayloadAction<string | null>) => {
      state.selectedType = action.payload
    },
    setSelectedCountry: (state, action: PayloadAction<'EAC' | 'USA' | 'France' | 'Korea' | 'China' | null>) => {
      state.selectedCountry = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch healthcare providers
      .addCase(fetchHealthcareProviders.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchHealthcareProviders.fulfilled, (state, action) => {
        state.isLoading = false
        state.providers = action.payload
        state.error = null
      })
      .addCase(fetchHealthcareProviders.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Fetch emergency providers
      .addCase(fetchEmergencyProviders.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchEmergencyProviders.fulfilled, (state, action) => {
        state.isLoading = false
        state.emergencyProviders = action.payload
        state.error = null
      })
      .addCase(fetchEmergencyProviders.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { clearError, setSelectedType, setSelectedCountry } = healthcareSlice.actions
export default healthcareSlice.reducer
