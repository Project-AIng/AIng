import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Deep() {
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('auth_token');

        axios.post('http://localhost:5000/analyze', {
            token: token
        })
        .then(response => setImageSrc(response.data.image))
        .catch(error => console.error(error));
    }, []);

    return (
        <div>
            분석 결과
            {imageSrc && <img src={imageSrc} alt="Score Radar Chart" />}
        </div>
    );
}