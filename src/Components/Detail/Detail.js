import React from 'react';
import styles from './Detail.module.css';

const detail = (props) => {
    return (
        <div className={styles.container} onClick={props.OnClick}>
            <div className={styles.col}>
                {props.name}
            </div>
            <div className={styles.col}>
                {
                    props.gender === "n/a"
                        ?
                        props.gender
                        :
                        props.gender.charAt(0).toUpperCase() + props.gender.slice(1)
                }
            </div>
            <div className={styles.col}>
                {
                    props.height === "unknown"
                        ?
                        props.height
                        :
                        props.height + " cm"
                }
            </div>
            <div className={styles.col}>
                {props.homeworld}
            </div>
            <div className={styles.col}>
                {props.birthYear}
            </div>
        </div>
    );
}

export default detail;