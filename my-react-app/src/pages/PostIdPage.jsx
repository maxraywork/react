import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostService from "../API/PostService";
import { useFetching } from "../hooks/useFetching";

const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id);
    setPost(response.data);
  });

  const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
    const response = await PostService.getCommentsById(id);
    setComments(response.data);
  });

  useEffect(() => {
    fetchPostById(params.id);
    fetchComments(params.id);
  }, []);

  return (
    <div>
      <h1>Post page</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {post.id}. {post.title}
        </div>
      )}
      <h2>Comments</h2>
      {isComLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {comments.map((comm) => {
           return <div style={{ marginTop: 15 }} key={comm.id}>
              <h5>{comm.email}</h5>
              <div>{comm.body}</div>
            </div>;
          })}
        </div>
      )}
    </div>
  );
};

export default PostIdPage;
