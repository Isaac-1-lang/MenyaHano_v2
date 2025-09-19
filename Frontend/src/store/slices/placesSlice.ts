import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Place {
  id: string
  name: string
  description: string
  imageUrl: string
  location: {
    address: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  category: string
  rating: number
  priceRange: 'budget' | 'moderate' | 'expensive'
  amenities: string[]
  openingHours: {
    [key: string]: string
  }
  contact: {
    phone?: string
    email?: string
    website?: string
  }
  isRecommended: boolean
  tags: string[]
  country: 'EAC' | 'USA' | 'France' | 'Korea' | 'China'
}

export interface PlacesState {
  items: Place[]
  recommendedItems: Place[]
  categories: string[]
  isLoading: boolean
  error: string | null
  currentPage: number
  totalPages: number
  hasMore: boolean
  selectedCategory: string | null
  selectedCountry: 'EAC' | 'USA' | 'France' | 'Korea' | 'China' | null
}

// Mock data
const mockPlaces: Place[] = [
  {
    id: '1',
    name: 'Historic Downtown District',
    description: 'Explore the charming historic downtown with its cobblestone streets and colonial architecture.',
    imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop',
    location: {
      address: '123 Main Street, Downtown',
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    category: 'Historic Sites',
    rating: 4.8,
    priceRange: 'moderate',
    amenities: ['Parking', 'Guided Tours', 'Gift Shop', 'Restaurant'],
    openingHours: {
      monday: '9:00 AM - 6:00 PM',
      tuesday: '9:00 AM - 6:00 PM',
      wednesday: '9:00 AM - 6:00 PM',
      thursday: '9:00 AM - 6:00 PM',
      friday: '9:00 AM - 8:00 PM',
      saturday: '10:00 AM - 8:00 PM',
      sunday: '10:00 AM - 5:00 PM'
    },
    contact: {
      phone: '+1-555-0123',
      email: 'info@historicdowntown.com',
      website: 'https://historicdowntown.com'
    },
    isRecommended: true,
    tags: ['history', 'architecture', 'culture'],
    country: 'USA'
  },
  {
    id: '2',
    name: 'Mountain View National Park',
    description: 'Breathtaking mountain views and hiking trails for all skill levels.',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-04b1e0e0e4b0?w=800&h=400&fit=crop',
    location: {
      address: 'Mountain View Road, National Park',
      coordinates: { lat: 40.7589, lng: -73.9851 }
    },
    category: 'Nature & Parks',
    rating: 4.9,
    priceRange: 'budget',
    amenities: ['Hiking Trails', 'Visitor Center', 'Parking', 'Restrooms'],
    openingHours: {
      monday: '6:00 AM - 8:00 PM',
      tuesday: '6:00 AM - 8:00 PM',
      wednesday: '6:00 AM - 8:00 PM',
      thursday: '6:00 AM - 8:00 PM',
      friday: '6:00 AM - 8:00 PM',
      saturday: '6:00 AM - 8:00 PM',
      sunday: '6:00 AM - 8:00 PM'
    },
    contact: {
      phone: '+1-555-0456',
      website: 'https://nationalparks.gov/mountainview'
    },
    isRecommended: true,
    tags: ['nature', 'hiking', 'scenic-views'],
    country: 'EAC'
  },
  {
    id: '3',
    name: 'Artisan Market Square',
    description: 'Local crafts, fresh produce, and unique handmade items from local artisans.',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop',
    location: {
      address: '456 Market Street, Arts District',
      coordinates: { lat: 40.7505, lng: -73.9934 }
    },
    category: 'Shopping',
    rating: 4.6,
    priceRange: 'moderate',
    amenities: ['Free WiFi', 'Food Court', 'Parking', 'ATM'],
    openingHours: {
      monday: 'Closed',
      tuesday: '10:00 AM - 6:00 PM',
      wednesday: '10:00 AM - 6:00 PM',
      thursday: '10:00 AM - 6:00 PM',
      friday: '10:00 AM - 8:00 PM',
      saturday: '9:00 AM - 8:00 PM',
      sunday: '10:00 AM - 5:00 PM'
    },
    contact: {
      phone: '+1-555-0789',
      email: 'info@artisanmarket.com'
    },
    isRecommended: false,
    tags: ['shopping', 'local', 'crafts', 'food'],
    country: 'France'
  }
]

// Mock API functions
const mockApi = {
  getPlaces: async (page: number = 1, category?: string, country?: 'EAC' | 'USA' | 'France' | 'Korea' | 'China'): Promise<{
    items: Place[]
    totalPages: number
    hasMore: boolean
  }> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    let filteredItems = [...mockPlaces]
    
    if (category) {
      filteredItems = filteredItems.filter(item => 
        item.category.toLowerCase() === category.toLowerCase()
      )
    }

    if (country) {
      filteredItems = filteredItems.filter(item => item.country === country)
    }
    
    const limit = 10
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedItems = filteredItems.slice(startIndex, endIndex)
    
    return {
      items: paginatedItems,
      totalPages: Math.ceil(filteredItems.length / limit),
      hasMore: endIndex < filteredItems.length
    }
  },
  
  getRecommendedPlaces: async (country?: 'EAC' | 'USA' | 'France' | 'Korea' | 'China'): Promise<Place[]> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    let items = mockPlaces.filter(place => place.isRecommended)
    if (country) {
      items = items.filter(p => p.country === country)
    }
    return items
  },
  
  getPlaceById: async (id: string): Promise<Place | null> => {
    await new Promise(resolve => setTimeout(resolve, 200))
    return mockPlaces.find(place => place.id === id) || null
  }
}

// Async thunks
export const fetchPlaces = createAsyncThunk(
  'places/fetchPlaces',
  async ({ page = 1, category, country }: { page?: number; category?: string; country?: 'EAC' | 'USA' | 'France' | 'Korea' | 'China' }, { rejectWithValue }) => {
    try {
      const response = await mockApi.getPlaces(page, category, country)
      return { ...response, page }
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchRecommendedPlaces = createAsyncThunk(
  'places/fetchRecommendedPlaces',
  async (country?: 'EAC' | 'USA' | 'France' | 'Korea' | 'China', { rejectWithValue }) => {
    try {
      const response = await mockApi.getRecommendedPlaces(country)
      return response
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchPlaceById = createAsyncThunk(
  'places/fetchPlaceById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await mockApi.getPlaceById(id)
      return response
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState: PlacesState = {
  items: [],
  recommendedItems: [],
  categories: ['Historic Sites', 'Nature & Parks', 'Shopping', 'Restaurants', 'Entertainment'],
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  hasMore: false,
  selectedCategory: null,
  selectedCountry: null,
}

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearPlaces: (state) => {
      state.items = []
      state.recommendedItems = []
      state.currentPage = 1
      state.totalPages = 1
      state.hasMore = false
    },
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload
    },
    setSelectedCountry: (state, action: PayloadAction<'EAC' | 'USA' | 'France' | 'Korea' | 'China' | null>) => {
      state.selectedCountry = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch places
      .addCase(fetchPlaces.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchPlaces.fulfilled, (state, action) => {
        state.isLoading = false
        if (action.payload.page === 1) {
          state.items = action.payload.items
        } else {
          state.items = [...state.items, ...action.payload.items]
        }
        state.currentPage = action.payload.page
        state.totalPages = action.payload.totalPages
        state.hasMore = action.payload.hasMore
        state.error = null
      })
      .addCase(fetchPlaces.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Fetch recommended places
      .addCase(fetchRecommendedPlaces.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchRecommendedPlaces.fulfilled, (state, action) => {
        state.isLoading = false
        state.recommendedItems = action.payload
        state.error = null
      })
      .addCase(fetchRecommendedPlaces.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { clearError, clearPlaces, setSelectedCategory, setSelectedCountry } = placesSlice.actions
export default placesSlice.reducer
