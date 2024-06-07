import React, { useState } from "react";
import { Dumy_Posts } from "../dumyPosts/data";
import PostItem from "./PostItem";

function Posts() {
  const [posts, setPosts] = useState(Dumy_Posts);

  return (
    <div className=" text-white p-3 m-3 flex flex-wrap justify-evenly">
      {posts.map(
        ({ id, thumbnail, category, title, description, autherId }) => (
          <PostItem
            key={id}
            posId={id}
            thumbnail={thumbnail}
            category={category}
            title={title}
            description={description}
            autherId={autherId}
          />
        )
      )}
    </div>
  );
}

export default Posts;
