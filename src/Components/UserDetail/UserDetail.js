import React from 'react';
import styles from './UserDetail.module.css';

const userDetail = (props) => {
    // console.log("details : ", props.detail);
    return(
        <div className={styles.container}>
            <div className={styles.subContainer}>
                <div className={styles.col_30}>Name</div>
                <div className={styles.col_70}>{props.detail.name}</div>
            </div>
            <div className={styles.subContainer}>
                <div className={styles.col_30}>Height</div>
                <div className={styles.col_70}>{props.detail.height}</div>
            </div>
            <div className={styles.subContainer}>
                <div className={styles.col_30}>Mass</div>
                <div className={styles.col_70}>{props.detail.mass}</div>
            </div>
            <div className={styles.subContainer}>
                <div className={styles.col_30}>Hair Color</div>
                <div className={styles.col_70}>{props.detail.hair_color}</div>
            </div>
            <div className={styles.subContainer}>
                <div className={styles.col_30}>Skin Color</div>
                <div className={styles.col_70}>{props.detail.skin_color}</div>
            </div>
            <div className={styles.subContainer}>
                <div className={styles.col_30}>Eye Color</div>
                <div className={styles.col_70}>{props.detail.eye_color}</div>
            </div>
            <div className={styles.subContainer}>
                <div className={styles.col_30}>Birth Year</div>
                <div className={styles.col_70}>{props.detail.birth_year}</div>
            </div>
            <div className={styles.subContainer}>
                <div className={styles.col_30}>Gender</div>
                <div className={styles.col_70}>{props.detail.gender}</div>
            </div>
            <div className={styles.subContainer}>
                <div className={styles.col_30}>Home World</div>
                <div className={styles.col_70}>{props.detail.homeworld}</div>
            </div>
            <div className={styles.subContainer}>
                <div className={styles.col_30}>Films</div>
                <div className={styles.col_70}>
                    {
                        props.films.map((film, index)=> (
                            <div key={index}>
                                {film}
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className={styles.subContainer}>
                <div className={styles.col_30}>Specises</div>
                <div className={styles.col_70}>{props.species}</div>
            </div>
            <div className={styles.subContainer}>
                <div className={styles.col_30}>Vehicles</div>
                <div className={styles.col_70}>
                    {
                        props.vehicles.map((vehicle, index)=> (
                            <div key={index}>
                                {vehicle}
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className={styles.subContainer}>
                <div className={styles.col_30}>Startships</div>
                <div className={styles.col_70}>
                    {
                        props.starships.map((starship, index)=> (
                            <div key={index}>
                                {starship}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default userDetail;