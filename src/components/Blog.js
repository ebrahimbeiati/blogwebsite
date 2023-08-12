import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInput, setBlogData } from "../features/userSlice";

import "../styling/blog.css";

const Blogs = () => {
  const searchInput = useSelector(selectUserInput);
  const blog_url = `https://gnews.io/api/v4/search?q=${searchInput}&token=8aa64a2b046f8492a0427a6d7b75bbd0`;
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(blog_url)
      .then((response) => {
        dispatch(setBlogData(response.data));
        setBlogs(response.data.articles);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [searchInput]);

  return (
    <div className="blog__page">
      <h1 className="blog__page__header">Blogs</h1>
      {loading ? <h1 className="loading">Loading...</h1> : null}
      <div className="blog__grid">
        {blogs.map((blog, index) => (
          <a key={index} className="blog__item" target="_blank" href={blog.url}>
            <img src={blog.image} alt={blog.title} />
            <div className="blog__content">
              <h3 className="sourceName">
                <span>{blog.source.name}</span>
                <p>{blog.publishedAt}</p>
              </h3>
              <h2>{blog.title}</h2>
              <p>{blog.description}</p>
            </div>
          </a>
        ))}
        {blogs.length === 0 && (
          <h1 className="no__blogs">
            No blogs available 😞. Search for something else to read blogs on
            the greatest platform.
          </h1>
        )}
      </div>
    </div>
  );
};

export default Blogs;
