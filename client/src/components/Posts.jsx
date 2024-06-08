import React, { useState } from "react";
import { Dumy_Posts } from "../dumyPosts/data";
import PostItem from "./PostItem";

function Posts() {
  const [posts, setPosts] = useState(Dumy_Posts);

  return (
    <section>
      { posts.length > 0 ?  <div className=" text-white p-3 m-3 flex flex-wrap justify-evenly">
      {posts.map(
        ({ id, thumbnail, category, title, description, autherId }) => (
          <PostItem
            key={id}
            postId={id}
            thumbnail={thumbnail}
            category={category}
            title={title}
            description={description}
            autherId={autherId}
          />
        )
      )}
    </div> : <h2 className=" text-center p-6 md text-[2rem] mb-[3rem] pt-10">No Post Founds</h2> }
    </section>
  );
}

export default Posts;
