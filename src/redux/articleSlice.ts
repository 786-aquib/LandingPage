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

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
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
      });
  },
});

export default articlesSlice.reducer;
