import { useMemo } from "react";

export const useSortedPosts = (posts, sort) => {
  const sortedPosts = useMemo(() => {
    if (posts.length !== 0) {
      if (sort === "date") {
        return [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
      } else if (sort !== "") {
        return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]));
      }
    }
    return posts;
  }, [sort, posts]);

  return sortedPosts;
};

export const usePosts = (posts, sort, query) => {
  const sortedPosts = useSortedPosts(posts, sort);

  const sorterAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.desc
        ? post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.desc.toLowerCase().includes(query.toLowerCase())
        : post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.body.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, sortedPosts]);
  return sorterAndSearchedPosts;
};
