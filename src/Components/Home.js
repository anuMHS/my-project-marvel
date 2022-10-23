import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import Card from "./Card";
import "./home.css";

const Home = () => {
  const API_KEY = "2942c1fcec2bd56c30c3a84da3d65a17";
  const HASH = "41ec9558d3576a8856574c48c38d5420";
  const [marvelChars, setMarvelChars] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = debounce((e) => {
    setSearch(e.target.value);
  }, 1000);

  useEffect(() => {
    setLoading(true);
    setMarvelChars([]);
    const url = search
      ? `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${search}&ts=1&apikey=${API_KEY}&hash=${HASH}`
      : `http://gateway.marvel.com/v1/public/characters?ts=1&apikey=${API_KEY}&hash=${HASH}`;

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        setMarvelChars(res.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [search]);

  return (
    <>
      <div className="header">
        <div className="img-header">
          <img
            src="https://www.pixelstalk.net/wp-content/uploads/images6/Cool-Marvel-Wallpaper-HD.jpg"
            alt=""
          />
        </div>
        <div className="input-header">
          <input
            type="text"
            onChange={handleChange}
            placeholder="Search Character"
            className="search-bar"
          ></input>
        </div>
      </div>
      {loading && <p>Loading...</p>}
        {marvelChars.length !== 0 ? (
          <Card marvelChars={marvelChars} />
        ) : loading ? null : (
          <p>No data found</p>
        )}
    </>
  );
};

export default Home;
