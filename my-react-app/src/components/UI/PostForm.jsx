import React, {useState, useRef} from 'react';
import MyInput from "./input/MyInput";
import MyButton from "./button/MyButton";

const PostForm = (props) => {
    const [post, setPost] = useState({title: '', body: ''});

    const addNewPost = e => {
        e.preventDefault()
        const newPost = {
            ...post, id: Date.now()
        }
        props.create(newPost);
        setPost({title: '', body: ''})
    }

    const [title, setTitle] = useState('');
    const bodyInputRef = useRef();



    return (
        <form>
            <MyInput value={post.title} onChange={e => setPost({...post, title: e.target.value})} type={"text"} placeholder={"Post name"} />
            <MyInput value={post.body} onChange={e => setPost({...post, body: e.target.value})} type={"text"} placeholder={"Post description"} />
            <MyButton onClick={addNewPost}>Add new post</MyButton>
        </form>
    );
}

export default PostForm;