import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store'; 

export const useAppDispatch = () => useDispatch<AppDispatch>();

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
export const favoriteArticle = createAsyncThunk(
  'articles/favoriteArticle',
  async (slug: string, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return rejectWithValue('No token found');
    }
    
    try {
      const response = await fetch(`https://api.realworld.io/api/articles/${slug}/favorite`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',  
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
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

// Async thunk for following a user
export const followUser = createAsyncThunk(
  'users/followUser',
  async (username: string, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return rejectWithValue('No token found');
    }

    try {
      const response = await fetch(`https://api.realworld.io/api/profiles/${username}/follow`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Error following user');
      }

      const data = await response.json();
      return data.profile; // Adjust if needed
    } catch (error) {
      return rejectWithValue('Error following user');
    }
  }
);

// Async thunk for Unfollowing a user

export const UnfollowUser = createAsyncThunk(
  'users/UnfollowUser',
  async (username: string, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return rejectWithValue('No token found');
    }

    try {
      const response = await fetch(`https://api.realworld.io/api/profiles/${username}/follow`, {
        method:  'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Error following user');
      }

      const data = await response.json();
      return data.profile; // Adjust if needed
    } catch (error) {
      return rejectWithValue('Error following user');
    }
  }            
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {

    // Optional: Add any synchronous reducers here
    addArticle(state, action) {
      state.articles = [action.payload, ...state.articles];
    },
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
        state.status = 'loading';
      })
      .addCase(favoriteArticle.fulfilled, (state, action) => {
        const updatedArticle = action.payload;
        const index = state.articles.findIndex(article => article.slug === updatedArticle.slug);
        if (index !== -1) {
          state.articles[index] = updatedArticle;
        }
      })
      .addCase(favoriteArticle.rejected, (state, action) => {
        state.error = action.payload as string;
      })


      .addCase(followUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(followUser.fulfilled, (state, action) => {
          let userProfile = action.payload; // This should be the returned profile from the API with the correct `following` status
          console.log("UserProfile ==> " + userProfile.username);
          const index = state.articles.findIndex(article => article.author.username === userProfile.username);
          
          if (index !== -1) {
            // Directly update the `following` status from the API response
            console.log("Before update => ", state.articles[index].author.following);
            state.articles[index].author.following = !state.articles[index].author.following;
            userProfile.following = state.articles[index].author.following;
            console.log("After update => ", state.articles[index].author.following);
          }
                })
      .addCase(followUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })


      .addCase(UnfollowUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(UnfollowUser.fulfilled, (state, action) => {
          let userProfile = action.payload; // This should be the returned profile from the API with the correct `following` status
          console.log("UserProfile ==> " + userProfile.username);
          const index = state.articles.findIndex(article => article.author.username === userProfile.username);
          
          if (index !== -1) {
            // Directly update the `following` status from the API response
            console.log("Before update => ", state.articles[index].author.following);
            state.articles[index].author.following = !state.articles[index].author.following;
            console.log("After update => ", state.articles[index].author.following);
          }
         })
      .addCase(UnfollowUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default articlesSlice.reducer;                


