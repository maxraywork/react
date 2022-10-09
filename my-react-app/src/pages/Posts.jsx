import { useEffect, useRef, useState, useContext } from "react";
import PostForm from "../components/UI/PostForm";
import PostList from "../components/UI/PostList";
import "../styles/App.css";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/MyModal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import { usePosts } from "../hooks/usePosts";
import PostService from "../API/PostService";
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from "../components/utils/pages";
import { useObserver } from "../hooks/useObserver";

import { AuthContext, User } from "../context";
import { useDatabase } from "../hooks/useDatabase";

function Posts() {
  const [posts, setPosts] = useState([]);

  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const sorterAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const lastElement = useRef();

  const user = useContext(User);


  const [fetchPosts, isPostLoading, postError] = useFetching(
    async (limit, page) => {
      const response = await PostService.getAll(limit, page);
      setPosts([...posts, ...response.data]);
      const totalCount = response.headers["x-total-count"];
      setTotalPages(getPageCount(totalCount, limit));
    }
  );

  
  useObserver(lastElement, page < totalPages, isPostLoading, () => {
    setPage(page + 1);
  });

  // const useDatabaseFirebase
  

  useEffect(() => {
    fetchPosts(limit, page);

    // useDatabase(`posts/${user.uid}`);
    
  }, [page]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  // const changePage = (page) => {
  //   setPage(page);
  //   fetchPosts(limit, page);
  // };

  return (
    <div className="App">
      <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
        Create post
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {postError && <h1>Error ${postError}</h1>}
      <PostList
        remove={removePost}
        posts={sorterAndSearchedPosts}
        title={"Posts about JS"}
      />
      <div ref={lastElement}></div>
      {isPostLoading && <h1>Loading...</h1>}
      {/* <Pagination page={page} changePage={changePage} totalPages={totalPages} /> */}
    </div>
  );
}

export default Posts;
