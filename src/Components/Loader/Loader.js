import React from 'react';
import styles from './Loader.module.css';
import bb8LoaderGIF from '../../assets/GIF/bb8Loader.gif';

const loader = (props) => {
    return (
        <div className={styles.container}>
            <img src={bb8LoaderGIF} alt="loader..." />
        </div>
    );
}

export default loader;