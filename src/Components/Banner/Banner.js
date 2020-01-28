import React from 'react';
import styles from './Banner.module.css';
import StarWars from '../../assets/image/Star-Wars.jpg';

const banner = (props)=>{
    return(
        <div className={styles.container}>
            <img src={StarWars} alt="banner" />
        </div>
    );
}

export default banner;