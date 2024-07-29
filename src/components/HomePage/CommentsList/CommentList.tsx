import { useSelector, useDispatch } from "react-redux";
import {
    getCommentsSelector,
    fetchComments,
} from "../../../slice/commentSlice";
import { AppDispatch } from "../../../store/store";
import { useEffect } from "react";
import styles from './CommentList.module.css';
import { useTranslation } from "react-i18next";

export function CommentList() {
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();
    const comments = useSelector(getCommentsSelector);

    useEffect(() => {
        if (!comments.length) {
            dispatch(fetchComments());
        }
    }, []);

    const commentsShow = comments.slice(0, 10);

    function getTime(date: string) {
        const currentDateTime = new Date();
        const previousDateTime = new Date(date);
        const timeDifference =
            currentDateTime.valueOf() - previousDateTime.valueOf();
        const secondsDifference = Math.floor(timeDifference / 1000);

        if (secondsDifference < 60) {
            return `${secondsDifference} секунд назад`;
        } else if (secondsDifference < 3600) {
            const minutes = Math.floor(secondsDifference / 60);
            return `${minutes} ${t("HomePage.minutes")} ${t("HomePage.ago")}`;
        } else if (secondsDifference < 86400) {
            const hours = Math.floor(secondsDifference / 3600);
            const minutes = Math.floor((secondsDifference % 3600) / 60);
            return `${hours} ${t("HomePage.hours")} ${minutes} ${t("HomePage.minutes")} ${t("HomePage.ago")}`;
        } else {
            const days = Math.floor(secondsDifference / 86400);
            const hours = Math.floor((secondsDifference % 86400) / 3600);
            const minutes = Math.floor(((secondsDifference % 86400) % 3600) / 60);
            return `${days} ${t("HomePage.days")} ${hours} ${t("HomePage.hours")} ${minutes} ${t("HomePage.minutes")} ${t("HomePage.ago")}`;
        }
    }

    return (
        <section className={styles.comments_container}>
            <h2 className={styles.comments__header}>{t("HomePage.last_comments")}</h2>
            <div className={styles.comments__subcontainer}>{commentsShow.map((comment) => (
                <article key={comment.id} className={styles.comment}>
                    <img src={comment.designer.avatar} alt={`${t("Designers.avatar")}`} className={styles.avatar} /> 
                    <div className={styles.comments_details}>
                        <p className={styles.username}>{comment.designer.username}</p>
                        <small className={styles.time}>{t("HomePage.posted")}: <br />{getTime(comment.date_created)}</small>
                        <p className={styles.task_number}>{t("HomePage.task")} № {comment.issue}</p>
                        <p className={styles.message}>{comment.message}</p>
                    </div>
                </article>
            ))}</div>
        </section>
    );
}
