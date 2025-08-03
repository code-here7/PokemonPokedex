import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllPokemons = createAsyncThunk("pokemon/getAll", async () => {
  const response = await axios.get("/api/pokedox/allPokemons");
  return response.data.data;
});

export const addPokemon = createAsyncThunk("pokemon/add", async (data) => {
  const response = await axios.post("/api/pokedox/addPokemon", data);
  return response.data.data;
});

export const deletePokemon = createAsyncThunk("pokemon/delete", async (id) => {
  await axios.delete(`/api/pokedox/deletePokemon/${id}`);
  return id;
});

export const updatePokemon = createAsyncThunk(
  "pokemon/update",
  async ({ id, data }) => {
    const response = await axios.put(
      `/api/pokedox/editPokemon/edit?id=${id}`,
      data
    );
    return response.data.data;
  }
);

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    pokemons: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPokemons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPokemons.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemons = action.payload;
      })
      .addCase(getAllPokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(addPokemon.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPokemon.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemons.push(action.payload);
      })
      .addCase(addPokemon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(deletePokemon.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePokemon.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemons = state.pokemons.filter(
          (poke) => poke._id !== action.payload
        );
      })
      .addCase(deletePokemon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(updatePokemon.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePokemon.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemons = action.payload;
      })
      .addCase(updatePokemon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default pokemonSlice.reducer;
