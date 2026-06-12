import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:8080/api/banner/get'; // 방금 만든 API 경로

const useBanner = () => {
    const [banners, setBanners] = useState({
        latesturl: '',
        besturl: '',
        aiRecommendurl: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                setLoading(true);
                const res = await fetch(API_URL);
                if (!res.ok) throw new Error("배너 정보를 불러오지 못했습니다.");
                const data = await res.json();
                setBanners(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBanners();
    }, []);

    return { banners, loading, error };
};

export default useBanner;