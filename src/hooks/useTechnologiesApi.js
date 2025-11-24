import { useCallback, useEffect, useState } from 'react';

const API_URL = 'https://dummyjson.com/products?limit=18';

const productToTechnology = (product) => ({
  id: product.id,
  title: product.title,
  description: product.description,
  category: product.category,
  difficulty:
    product.rating >= 4.5
      ? 'advanced'
      : product.price > 100
        ? 'intermediate'
        : 'beginner',
  resources: [
    {
      label: 'Страница продукта',
      url: `https://dummyjson.com/products/${product.id}`
    },
    {
      label: 'Обзор в Google',
      url: `https://www.google.com/search?q=${encodeURIComponent(
        `${product.title} tutorial`
      )}`
    }
  ]
});

function useTechnologiesApi() {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTechnologies = useCallback(async (controller) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(API_URL, { signal: controller?.signal });
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();
      setTechnologies(data.products.map(productToTechnology));
    } catch (err) {
      if (err.name === 'AbortError') return;
      setError(err.message || 'Не удалось загрузить технологии');
    } finally {
      setLoading(false);
    }
  }, []);

  const addTechnology = useCallback(async (techData) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const newTech = {
      id: Date.now(),
      title: techData.title || 'Без названия',
      description: techData.description || '',
      category: techData.category || 'frontend',
      difficulty: techData.difficulty || 'beginner',
      resources: techData.resources || []
    };

    setTechnologies((prev) => [...prev, newTech]);
    return newTech;
  }, []);

  const refetch = useCallback(() => {
    const controller = new AbortController();
    fetchTechnologies(controller);
    return () => controller.abort();
  }, [fetchTechnologies]);

  useEffect(() => {
    const controller = new AbortController();
    fetchTechnologies(controller);

    return () => controller.abort();
  }, [fetchTechnologies]);

  return {
    technologies,
    loading,
    error,
    refetch,
    addTechnology
  };
}

export default useTechnologiesApi;


