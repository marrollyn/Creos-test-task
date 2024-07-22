import { CommentList } from "./CommentsList/CommentList";
import { TopTenDesigners } from "./TopDesingners/TopTenDesingners";
import styles from './HomePage.module.css'

export function HomePage() {
    return (
        <section className={styles.container}>
            <TopTenDesigners />
            <CommentList />
        </section>
    );
}
