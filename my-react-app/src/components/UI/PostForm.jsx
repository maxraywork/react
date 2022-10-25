import React from "react";
import { Form, FormLayout, TextField } from "@shopify/polaris";

const PostForm = ({post, setPost}) => {
  

  const handleChangesTitle = (newValue) =>
    setPost({ ...post, title: newValue });
  const handleChangesDesc = (newValue) => setPost({ ...post, desc: newValue });
  const handleChangesBody = (newValue) => setPost({ ...post, body: newValue });

  return (
    <Form noValidate preventDefault>
      <FormLayout>
        <TextField
          label="Title"
          onChange={handleChangesTitle}
          autoComplete="off"
          value={post.title}
        />
        <TextField
          label="Description"
          onChange={handleChangesDesc}
          autoComplete="off"
          value={post.desc}
          multiline={4}
        />
        <TextField
          label="Your post"
          onChange={handleChangesBody}
          autoComplete="off"
          value={post.body}
          multiline={9}
        />
      </FormLayout>
    </Form>
  );
};

export default PostForm;
