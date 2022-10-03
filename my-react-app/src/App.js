import {useState} from "react";
import PostForm from "./components/UI/PostForm";
import PostList from "./components/UI/PostList";
import './styles/App.css';
import MySelect from "./components/UI/select/MySelect";

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: 'cJavascript 1', body: 'aDescription'},
        {id: 2, title: 'bJavascript 2', body: 'bDescription'},
        {id: 3, title: 'aJavascript 3', body: 'cDescription'},
    ]);

    const [selectedSort, setSelectedSort] = useState('');


    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
    }
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const sortPosts = sort => {
        setSelectedSort(sort);
        setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort])));
    }

    return (
        <div className="App">
            <PostForm create={createPost}/>

            <hr style={{margin: "15px 0"}}/>
            <div>
                <MySelect value={selectedSort} onChange={sortPosts} defaultValue={"Sort by"} options={[
                    {value: 'title', name: 'By title'},
                    {value: 'body', name: 'By description'}
                ]}/>
            </div>
            <PostList remove={removePost} posts={posts} title={"Posts about JS"}/>
        </div>
    );
}

export default App;
