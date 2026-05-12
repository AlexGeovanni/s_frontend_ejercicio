import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const loadFavorites = (): number[] => {
  return JSON.parse(localStorage.getItem("favorites") || "[]");
};

const saveFavorites = (favorites: number[]) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: loadFavorites(),
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const id = action.payload;

      const exists = state.includes(id);

      const updated = exists
        ? state.filter((fav) => fav !== id)
        : [...state, id];

      saveFavorites(updated);

      return updated;
    },

    clearFavorites: () => {
      saveFavorites([]);
      return [];
    },
  },
});

export const { toggleFavorite, clearFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;