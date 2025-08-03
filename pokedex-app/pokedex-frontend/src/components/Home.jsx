import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPokemons, deletePokemon } from '../slices/pokemonSlice';
import { FiArrowUpCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Home = () => {
    const dispatch = useDispatch();
    const { pokemons, loading, error } = useSelector((state) => state.pokemon);

    useEffect(() => {
        dispatch(getAllPokemons());
    }, [dispatch]);



    const handleDelete = (id) => {
        toast.warn(
            <div>
                Are you sure you want to delete this Pokemon? <br />
                <button
                    onClick={() => confirmDelete(id)}
                    style={{ marginRight: '10px', padding: '5px 10px', cursor: 'pointer' }}
                >
                    Yes
                </button>
                <button
                    onClick={() => toast.dismiss()}
                    style={{ padding: '5px 10px', cursor: 'pointer' }}
                >
                    No
                </button>
            </div>,
            { autoClose: false, closeOnClick: false }
        );
    };

    const confirmDelete = async (id) => {
        try {
            await dispatch(deletePokemon(id)).unwrap(); 
            toast.dismiss();
            toast.success('Pokemon deleted successfully!');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            toast.error('Failed to delete Pokemon.');
        }
    };

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <div className="p-6 bg-gray-100 min-h-screen rounded-lg relative">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-indigo-700">Pokemons</h1>
                    <div className="text-right">
                        <Link
                            to="/add"
                            className="inline-block bg-indigo-600 text-white px-4 py-1.5 rounded-md text-sm font-semibold shadow hover:bg-indigo-700 transition-all"
                        >
                            ADD
                        </Link>
                        <p className="text-xs text-gray-500 mt-1">Hey Ashley, Add Your Pokemon from here</p>
                    </div>
                </div>

                {loading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                ) : error ? (
                    <p className="text-center text-red-500">Error: {error}</p>
                ) : Array.isArray(pokemons) && pokemons.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {pokemons.map((poke) => {
                            const idStr = String(poke.id || poke._id); 
                            return (
                                <div
                                    key={idStr}
                                    className="bg-white shadow-lg rounded-2xl p-4 border border-gray-200 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-[460px]" 
                                >
                                    <div>
                                        <img
                                            loading="lazy"
                                            src={
                                                poke.image?.startsWith("http")
                                                    ? poke.image
                                                    : poke.image
                                                        ? `http://localhost:5000/uploads/${poke.image}`
                                                        : "https://via.placeholder.com/150?text=No+Image"
                                            }
                                            alt={poke.name}
                                            className="w-full h-40 object-contain mb-4 rounded-lg"
                                        />
                                        <h2 className="text-xl font-bold text-gray-800 capitalize">{poke.name}</h2>
                                        <p className="text-sm text-gray-600">Breed: <span className="text-gray-800">{poke.breed}</span></p>
                                        <p className="text-sm text-gray-600">Gender: <span className="text-gray-800">{poke.gender}</span></p>
                                        <p className="text-sm text-gray-600">Category: <span className="text-gray-800">{poke.category}</span></p>
                                        <p className="text-sm text-gray-600">Abilities: <span className="text-gray-800">{poke.abilities}</span></p>
                                        <p className="text-sm text-gray-600">Height: <span className="text-gray-800">{poke.height}</span></p>
                                        <p className="text-sm text-gray-600">Weight: <span className="text-gray-800">{poke.weight}</span></p>

                                        <p className="text-xs text-gray-500 mt-2 italic">
                                            "{poke.description}"
                                        </p>
                                    </div>


                                    <div className="flex justify-between mt-4">
                                        <Link
                                            to={`/add/${idStr}`}
                                            className="bg-indigo-900 text-white px-4 py-1.5 rounded-md text-sm font-semibold shadow hover:bg-indigo-700 transition-all"
                                        >
                                            Update
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(idStr)}
                                            className="bg-red-500 text-white px-4 py-1.5 rounded-md text-sm font-semibold shadow hover:bg-indigo-700 transition-all"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>

                            );
                        })}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No Pokemons found.</p>
                )}
            </div>

            <button
                onClick={handleScrollToTop}
                className="fixed bottom-6 right-6 bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg transition-all duration-300"
            >
                <FiArrowUpCircle size={28} />
            </button>
        </>
    );
};

export default Home;
