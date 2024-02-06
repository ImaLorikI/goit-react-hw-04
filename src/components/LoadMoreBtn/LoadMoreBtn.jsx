import css from './LoadMoreBtn.module.css'

export const LoadMoreBtn = ({ loadMore }) => {
    return <button className={css.btn} onClick={loadMore}>Load more</button>;
}