import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPokemon, updatePokemon } from '../slices/pokemonSlice';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const AddPoke = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const pokemons = useSelector((state) => state.pokemon.pokemons);
  const existingPoke = pokemons.find(p => String(p.id) === id || String(p._id) === id);

  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    gender: '',
    category: '',
    abilities: '',
    height: '',
    weight: '',
    image: '',
    description: ''
  });

  useEffect(() => {
    if (existingPoke) {
      setFormData(existingPoke);
    }
  }, [existingPoke]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (existingPoke) {
        await dispatch(updatePokemon({ id: existingPoke.id, data: formData }));
      } else {
         const seed = formData.name?.trim() || Math.random().toString(36).substring(2, 10);
       const imageUrl = `https://avatar.iran.liara.run/username?username=${encodeURIComponent(seed)}`;
        const newPoke = {
          ...formData,
          id: uuidv4(),
       image: (formData.image?.startsWith("http") ? formData.image.trim() : imageUrl)
  };
  console.log("Image used:", newPoke.image);
        await dispatch(addPokemon(newPoke));
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving Pokemon:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md relative">
      <div className="absolute right-6 top-6">
        <Link
          to="/"
          className="text-sm text-indigo-900 hover:text-indigo-800 font-medium"
        >
          🔙 Back to Home
        </Link>
      </div>

      <h2 className="text-2xl font-bold text-indigo-700 mb-6">
        {existingPoke ? 'Edit Pokemon' : 'Add New Pokemon'}
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[
          { label: 'Name', name: 'name' },
          { label: 'Breed', name: 'breed' },
          { label: 'Gender', name: 'gender' },
          { label: 'Category', name: 'category' },
          { label: 'Abilities', name: 'abilities' },
          { label: 'Height', name: 'height' },
          { label: 'Weight', name: 'weight' },
          { label: 'Image URL', name: 'image' }
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
            <input
              type="text"
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              required={field.name !== 'image'}
              className="w-full border border-gray-300 p-2 rounded focus:ring-indigo-500 focus:outline-none"
            />
          </div>
        ))}

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full border border-gray-300 p-2 rounded focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div className="sm:col-span-2 flex justify-end">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 transition-all"
          >
            {existingPoke ? 'Update Pokemon' : 'Add Pokemon'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPoke;
