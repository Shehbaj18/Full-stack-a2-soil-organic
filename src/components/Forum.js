import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getPosts, createPost } from "./data/repository"; // Ensure correct import

export default function Forum(props) {
  const [post, setPost] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  // Load posts.
  useEffect(() => {
    async function loadPosts() {
      const currentPosts = await getPosts();

      setPosts(currentPosts);
      setIsLoading(false);
    }

    loadPosts();
  }, []);

  const resetPostContent = () => {
    setPost("");
    setErrorMessage(null);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // As React Quill uses HTML tags within the text the empty check first removes all HTML elements using a regex.
    if(post.replace(/<(.|\n)*?>/g, "").trim().length === 0) {
      setErrorMessage("A post cannot be empty.");
      return;
    }

    // Create post.
    const newPost = { text: post, username: props.user.username };
    await createPost(newPost);

    // Add post to locally stored posts.
    setPosts([...posts, newPost]);

    resetPostContent();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>New Post</legend>
          <div className="form-group" style={{ marginBottom: "60px" }}>
              <ReactQuill theme="snow" value={post} onChange={setPost} style={{ height: "180px" }} />
          </div>
          {errorMessage !== null &&
            <div className="form-group">
              <span className="text-danger">{errorMessage}</span>
            </div>
          }
          <div className="form-group">
            <input type="button" className="btn btn-danger mr-5" value="Cancel" onClick={resetPostContent} />
            <input type="submit" className="btn btn-primary" value="Post" />
          </div>
        </fieldset>
      </form>

      <hr />
      <h1>Forum</h1>
      <div>
        {isLoading ?
          <div>Loading posts...</div>
          :
          posts.length === 0 ?
            <span className="text-muted">No posts have been submitted.</span>
            :
            posts.map((x, index) =>
              <div key={index} className="border my-3 p-3">
                <h6 className="text-primary">{x.username}</h6>
                <div dangerouslySetInnerHTML={{ __html: x.text }} />
              </div>
            )
        }
      </div>
    </div>
  );
}
