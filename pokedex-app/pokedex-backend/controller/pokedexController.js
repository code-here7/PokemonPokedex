let pokemons = require("../data/pokedexData");

exports.allPokemons = (_, resp) => {
  try {
    const data = pokemons;
    // console.log(data);
    resp
      .status(200)
      .json({ success: true, message: "Fetching pokemon", data: data });
  } catch (e) {
    console.log(e);
    resp.status(500).json({ success: false, error: "Server Error!!" });
  }
};

exports.addPokemon = (req, resp) => {
  try {
    const newPoke = req.body;
    // console.log(newPoke);
    pokemons.push(newPoke);
    resp.status(201).json({
      success: true,
      message: "Data Added Successfully!!",
      data: pokemons,
    });
  } catch (e) {
    console.log(e);
    resp
      .status(500)
      .json({ success: false, message: "Data Can not be added!!" });
  }
};

exports.deletePokemon = (req, resp) => {
  try {
    const id = req.params.id;
    // console.log(id);
    const beforeLength = pokemons.length;

    const update = pokemons.filter((item) => item.id != id);

    if (update.length === beforeLength) {
      return resp
        .status(404)
        .json({ success: false, message: "Pokemon not found" });
    }

    pokemons.length = 0;
    pokemons.push(...update);
    console.log(pokemons);
    resp.status(200).json({
      success: true,
      message: "Data Deleted Successfully!!",
      data: pokemons,
    });
  } catch (e) {
    console.log(e);
    resp
      .status(500)
      .json({ success: false, message: "Data Can not be Deleted!!" });
  }
};

exports.editPokemon = (req, resp) => {
  try {
    const id = req.query.id;
    // console.log(id);
    const nwData = req.body;
    // console .log (nwData);
    let found = false;
    const update = pokemons.map((item) => {
      if (item.id == id) {
        found = true;
        return { ...item, ...nwData };
      } else {
        return item;
      }
    });
    if (!found) {
      return resp
        .status(404)
        .json({ success: false, message: "Pokemon Not Found!!!" });
    } else {
      pokemons.length = 0;
      pokemons.push(...update);
      console.log(pokemons);
      return resp
        .status(200)
        .json({
          success: true,
          message: "Data Updated Successfully!!",
          data: pokemons,
        });
    }
  } catch (e) {
    console.log(e);
    resp
      .status(500)
      .json({ success: false, message: "Pokemon can not be edited!" });
  }
};
