import React from 'react';
import useScrollCount from '../../Hooks/useScrollCount';

const DownloadCountPage = () => {
const { ref } = useScrollCount(650, 0, 3000, 0);

return (
    <div style={{ textAlign: 'center' }}>
        
        <p
        ref={ref}
        style={{
            fontSize: '1.75rem',
            fontWeight: 'bold',
            color: 'black',
            display: 'inline-block',
        }}
        >
        0
        </p>
        <span style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'black' }}>
        +
        </span>
        <h1 style={{ color: 'black' }}>누적 다운로드 수</h1>
    </div>
    );
};

export default DownloadCountPage;