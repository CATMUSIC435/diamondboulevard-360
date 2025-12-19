import { useState, useEffect } from "react";

export const useFetchPosts = (perPage = 8) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://diamondboulevard.com.vn/wp-json/wp/v2/posts?per_page=${perPage}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPosts(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error("Lỗi lấy bài viết:", err.message);
          setError(err.message);
        }
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchPosts();

    return () => controller.abort();
  }, [perPage]);

  return { posts, loading, error };
};
