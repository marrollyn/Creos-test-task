import { useSelector, useDispatch } from 'react-redux';
import {getCommentsSelector, fetchComments} from '../../../slice/commentSlice';
import {AppDispatch} from '../../../store/store'
import { useEffect } from 'react';
// import { CommentList} from "../../../types/index";

export const CommentList = () => {
    
    const dispatch = useDispatch<AppDispatch>();
    const comments = useSelector(getCommentsSelector);

    useEffect(() => {
        if (!comments.length) {
            dispatch(fetchComments());
        }
    }, []);

    //const showComments;
    //const commentsCount = comments.length;
    const commentsShow = comments.slice(-10);
    //console.log(commentsShow);
    //return ()

    function getTime (date: string) {
        const currentDateTime = new Date();
        const previousDateTime = new Date(date);
        const timeDifference = currentDateTime.valueOf() - previousDateTime.valueOf();
        const secondsDifference = Math.floor(timeDifference / 1000);

        if (secondsDifference < 60) {
            return `${secondsDifference} секунд назад`;
        } else if (secondsDifference < 3600) {
            const minutes = Math.floor(secondsDifference / 60);
            return `${minutes} минут назад`;
        } else if (secondsDifference < 86400) {
            const hours = Math.floor(secondsDifference / 3600);
            const minutes = Math.floor((secondsDifference % 3600) / 60);
            return `${hours} часов и ${minutes} минут назад`;
        } else {
            const days = Math.floor(secondsDifference / 86400);
            const hours = Math.floor((secondsDifference % 86400) / 3600);
            const minutes = Math.floor(((secondsDifference % 86400) % 3600) / 60);
            return `${days} дней, ${hours} часов и ${minutes} минут назад`;
        }
    }

    return (
        <section>
        {commentsShow.map((comment) => (
            <article key={comment.id}>
                <h2>{commentsShow.length}</h2>
                <img src={comment.designer.avatar} alt="Аватар дизайнера"/>
                <h4>{comment.designer.username}</h4>
                <h5>Task № {comment.issue}</h5>
                <p>{comment.message}</p>
                <p><small>Опубликовано: {getTime(comment.date_created)}</small></p>
                {/* <p>{comment.message}</p> */}
            </article>
        ))}
    </section>
    )
}
