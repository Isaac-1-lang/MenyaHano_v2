import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface NewsItem {
  id: string
  title: string
  excerpt: string
  content: string
  imageUrl: string
  category: string
  author: string
  publishedAt: string
  tags: string[]
  isFeatured: boolean
  readTime: number
  country: 'EAC' | 'USA' | 'France' | 'Korea' | 'China'
}

export interface NewsState {
  items: NewsItem[]
  featuredItems: NewsItem[]
  categories: string[]
  isLoading: boolean
  error: string | null
  currentPage: number
  totalPages: number
  hasMore: boolean
  selectedCountry: 'EAC' | 'USA' | 'France' | 'Korea' | 'China' | null
}

// Mock data
const mockNewsItems: NewsItem[] = [
  {
    id: '1',
    title: 'New Travel Regulations for International Visitors',
    excerpt: 'Updated guidelines for travelers entering the country with new health and safety protocols.',
    content: 'The government has announced new travel regulations that will affect all international visitors...',
    imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop',
    category: 'Travel Updates',
    author: 'Travel Bureau',
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['travel', 'regulations', 'international'],
    isFeatured: true,
    readTime: 5,
    country: 'USA'
  },
  {
    id: '2',
    title: 'Best Hidden Gems to Visit This Season',
    excerpt: 'Discover amazing off-the-beaten-path destinations that offer unique experiences.',
    content: 'Looking for something different? Here are some incredible hidden gems...',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-04b1e0e0e4b0?w=800&h=400&fit=crop',
    category: 'Destinations',
    author: 'Travel Guide',
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['destinations', 'hidden-gems', 'seasonal'],
    isFeatured: true,
    readTime: 7,
    country: 'EAC'
  },
  {
    id: '3',
    title: 'Healthcare Services for Tourists',
    excerpt: 'Complete guide to accessing medical services while traveling in the region.',
    content: 'When traveling, it\'s important to know where to find quality healthcare...',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop',
    category: 'Healthcare',
    author: 'Health Department',
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['healthcare', 'tourists', 'medical'],
    isFeatured: false,
    readTime: 4,
    country: 'France'
  },
  {
    id: '4',
    title: 'Job Opportunities in Tourism Sector',
    excerpt: 'Exciting career opportunities available in the growing tourism industry.',
    content: 'The tourism sector is experiencing rapid growth, creating numerous job opportunities...',
    imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop',
    category: 'Jobs',
    author: 'Career Center',
    publishedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['jobs', 'tourism', 'careers'],
    isFeatured: false,
    readTime: 6,
    country: 'Korea'
  },
  {
    id: '5',
    title: 'Cultural Events and Festivals This Month',
    excerpt: 'Don\'t miss these amazing cultural events happening throughout the region.',
    content: 'This month brings a variety of cultural celebrations and festivals...',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=400&fit=crop',
    category: 'Culture',
    author: 'Cultural Center',
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['culture', 'events', 'festivals'],
    isFeatured: false,
    readTime: 3,
    country: 'China'
  }
]

// Mock API functions
const mockApi = {
  getNews: async (page: number = 1, limit: number = 10, category?: string, country?: 'EAC' | 'USA' | 'France' | 'Korea' | 'China'): Promise<{
    items: NewsItem[]
    totalPages: number
    hasMore: boolean
  }> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    let filteredItems = [...mockNewsItems]
    
    if (category) {
      filteredItems = filteredItems.filter(item => 
        item.category.toLowerCase() === category.toLowerCase()
      )
    }

    if (country) {
      filteredItems = filteredItems.filter(item => item.country === country)
    }
    
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedItems = filteredItems.slice(startIndex, endIndex)
    
    return {
      items: paginatedItems,
      totalPages: Math.ceil(filteredItems.length / limit),
      hasMore: endIndex < filteredItems.length
    }
  },
  
  getFeaturedNews: async (country?: 'EAC' | 'USA' | 'France' | 'Korea' | 'China'): Promise<NewsItem[]> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    let items = mockNewsItems.filter(item => item.isFeatured)
    if (country) {
      items = items.filter(i => i.country === country)
    }
    return items
  },
  
  getNewsById: async (id: string): Promise<NewsItem | null> => {
    await new Promise(resolve => setTimeout(resolve, 200))
    return mockNewsItems.find(item => item.id === id) || null
  }
}

// Async thunks
export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async ({ page = 1, category, country }: { page?: number; category?: string; country?: 'EAC' | 'USA' | 'France' | 'Korea' | 'China' }, { rejectWithValue }) => {
    try {
      const response = await mockApi.getNews(page, 10, category, country)
      return { ...response, page }
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchFeaturedNews = createAsyncThunk(
  'news/fetchFeaturedNews',
  async (country?: 'EAC' | 'USA' | 'France' | 'Korea' | 'China', { rejectWithValue }) => {
    try {
      const response = await mockApi.getFeaturedNews(country)
      return response
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchNewsById = createAsyncThunk(
  'news/fetchNewsById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await mockApi.getNewsById(id)
      return response
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState: NewsState = {
  items: [],
  featuredItems: [],
  categories: ['Travel Updates', 'Destinations', 'Healthcare', 'Jobs', 'Culture'],
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  hasMore: false,
  selectedCountry: null,
}

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearNews: (state) => {
      state.items = []
      state.featuredItems = []
      state.currentPage = 1
      state.totalPages = 1
      state.hasMore = false
    },
    setSelectedCountry: (state, action: PayloadAction<'EAC' | 'USA' | 'France' | 'Korea' | 'China' | null>) => {
      state.selectedCountry = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch news
      .addCase(fetchNews.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
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
      .addCase(fetchNews.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Fetch featured news
      .addCase(fetchFeaturedNews.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchFeaturedNews.fulfilled, (state, action) => {
        state.isLoading = false
        state.featuredItems = action.payload
        state.error = null
      })
      .addCase(fetchFeaturedNews.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { clearError, clearNews, setSelectedCountry } = newsSlice.actions
export default newsSlice.reducer
