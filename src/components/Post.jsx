import React from 'react';
import '../styles/commentary.css';
import MyButton from "./UI/buttons/MyButton";
import {Link} from 'react-router-dom'

function Post(props) {


    return (
        <div className="commentDiv">
            <p style={{ fontSize: '35px'}}>{props.post.title}</p>
            <p>{props.post.body}</p>
            <MyButton onClick={() => props.remove(props.comment)}>Удалитб</MyButton>
            <Link to={"/posts/" + props.post.id } >
                <MyButton style={{ marginLeft: '20px'}} >Подробнее</MyButton>
            </Link>
        </div>
    );
}

export default Post;

