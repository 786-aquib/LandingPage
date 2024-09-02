import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
}

interface ArticlesState {
  articles: Article[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
  hasMore: boolean;
  offset: number;
}

const initialState: ArticlesState = {
  articles: [],
  status: 'idle',
  error: null,
  hasMore: true,
  offset: 0,
};

// Async thunk for fetching articles
export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (offset: number) => {
    const response = await fetch(`https://api.realworld.io/api/articles?offset=${offset}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  }
);

// Async thunk for favoriting an article
// In articleSlice.ts
export const favoriteArticle = createAsyncThunk(
  'articles/favoriteArticle',
  async (slug: string, { rejectWithValue }) => {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    if (!token) {
      return rejectWithValue('No token found');
    }
    
    try {
      const response = await fetch(`https://api.realworld.io/api/articles/${slug}/favorite`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`, // Include the token in the Authorization header
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.article; // Assuming the response contains the updated article
    } catch (error) {
      return rejectWithValue('Error');
    }
  }
);


const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    // Optional: Add any synchronous reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'idle';
        state.articles = [...state.articles, ...action.payload.articles];
        state.offset += action.payload.articles.length;
        state.hasMore = action.payload.articles.length > 0;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch articles';
      })
      .addCase(favoriteArticle.pending, (state) => {
        // Optionally, handle the pending state for the favorite action
      })
      .addCase(favoriteArticle.fulfilled, (state, action) => {
        // Update the article in the state with the new favorited status
        const updatedArticle = action.payload;
        const index = state.articles.findIndex(article => article.slug === updatedArticle.slug);
        if (index !== -1) {
          state.articles[index] = updatedArticle;
        }
      })
      .addCase(favoriteArticle.rejected, (state, action) => {
        // Handle errors for the favorite action
        state.error = action.payload as string;
      });
  },
});

export default articlesSlice.reducer;
