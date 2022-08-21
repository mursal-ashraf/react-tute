import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('mario');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, body, author };
        console.log(blog);

        setIsPending(true);

        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: { 'Content-type': 'application/json'},
            body: JSON.stringify(blog)
        }).then(() => {
            setIsPending(false);
            history.push('/');
        })
    }

    return ( 
        <div className="create">
            <h2>Create a new blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input 
                type="text"
                required
                value={title}
                onChange={(e) => { setTitle(e.target.value)}}
                />
                <label>Blog Body:</label>
                <textarea 
                required
                value={body}
                onChange={ (e) => { setBody(e.target.value)}}
                ></textarea>
                <label>Blog Author</label>
                <select
                value={author}
                onChange= {(e) => { setAuthor(e.target.value) }}
                >
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                { !isPending && <button>Add blog</button> }
                { isPending && <button>Adding blog</button> }
            </form>
        </div>
     );
}
 
export default Create;