import { useEffect, useRef, useState, useContext, useMemo } from "react";
import PostForm from "../components/UI/PostForm";
import "../styles/App.css";
import { usePosts } from "../hooks/usePosts";
import FirebaseService from "../API/FirebaseService";
import {
  Card,
  EmptyState,
  Filters,
  Icon,
  Layout,
  Modal,
  Page,
  ResourceList,
  Select,
  Stack,
  TextStyle,
} from "@shopify/polaris";
import { DeleteMajor, DeleteMinor } from "@shopify/polaris-icons";
import { useCallback } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filter, setFilter] = useState({ sort: "date", query: "" });
  const [modal, setModal] = useState(false);
  const sorterAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [isPostLoading, setIsPostLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: "", desc: "", body: "" });

  const addNewPost = () => {
    const newPost = {
      ...post,
      id: Date.now(),
      date: Date.now(),
    };
    createPost(newPost);
    setPost({ title: "", desc: "", body: "" });
  };

  useEffect(() => {
    FirebaseService.subscribeOnPosts((snapshot) => {
      setIsPostLoading(false);
      const data = snapshot.val();
      let postsArray = [];
      for (let i in data) {
        postsArray.push(data[i]);
      }
      setPosts(postsArray);
    });
  }, []);

  const createPost = (newPost) => {
    FirebaseService.setPostById(newPost.id, {
      title: newPost.title,
      body: newPost.body,
      date: newPost.date,
      id: newPost.id,
    });
    setModal(false);
  };
  const removePost = (post) => {
    FirebaseService.removePostById(post.id);
  };
  const onChangeModal = useCallback(() => setModal(!modal), [modal]);

  const promotedBulkActions = [
    {
      content: "Delete posts",
      icon: <Icon source={DeleteMinor} color="critical" />,
      onAction: () => console.log("Todo: implement bulk edit"),
    },
  ];

  const modalComponent = useMemo(
    () => (
      <Modal
        open={modal}
        title="Create new post"
        primaryAction={{
          content: "Create post",
          onAction: addNewPost,
        }}
        onClose={onChangeModal}
      >
        <Modal.Section>
          <PostForm post={post} setPost={setPost} />
        </Modal.Section>
      </Modal>
    ),
    [modal, post, setPost, setModal]
  );

  const onPostClick = (id) => {
    navigate(`/${id}`);
  }

  const renderItem = (item) => {
    const { id, title, desc, body, date } = item;
    return (
      <ResourceList.Item id={id} title={title} desc={desc} body={body} onClick={onPostClick}>
        <h3>
          <TextStyle variation="strong">{title}</TextStyle>
        </h3>
        <div>{desc ? desc : body}</div>
        <div>
          {new Date(date).getDate()}.{new Date(date).getMonth() + 1}.
          {new Date(date).getFullYear()}
        </div>
      </ResourceList.Item>
    );
  };

  const listComponent = useMemo(
    () => (
      <ResourceList
        resourceName={{ singular: "post", plural: "posts" }}
        sortValue={filter.sort}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        selectable
        promotedBulkActions={promotedBulkActions}
        emptySearchState={
          <EmptyState
            heading="No posts were founded"
            action={{
              content: "Create Post",
              onAction: onChangeModal,
            }}
          />
        }
        filterControl={
          <Filters
            queryValue={filter.query}
            filters={[]}
            queryPlaceholder={"Search..."}
            appliedFilters={[]}
            onQueryChange={(newValue) =>
              setFilter({ ...filter, query: newValue })
            }
            onQueryClear={() => setFilter({ ...filter, query: "" })}
            onClearAll={() => setFilter({ sort: "date", query: "" })}
          >
            <Stack>
              <div></div>
              <Select
                label="Sort by"
                labelInline
                options={[
                  { value: "date", label: "By date" },
                  { value: "title", label: "By title" },
                  { value: "body", label: "By description" },
                ]}
                onChange={(value) => setFilter({ ...filter, sort: value })}
                value={filter.sort}
              />
            </Stack>
          </Filters>
        }
        items={sorterAndSearchedPosts}
        renderItem={renderItem}
      ></ResourceList>
    ),
    [sorterAndSearchedPosts, filter, selectedItems, onChangeModal]
  );

  return (
    <Page
      title="Posts"
      compactTitle
      fullWidth
      primaryAction={{ content: "Create Post", onAction: onChangeModal }}
    >
      <Layout>
        <Layout.Section>
          <Card>{listComponent}</Card>
          {modalComponent}
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default Posts;
