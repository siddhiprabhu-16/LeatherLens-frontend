export async function fetchProducts(query: string) {
  const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
  const CX = import.meta.env.VITE_GOOGLE_CX;

  const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
    query
  )}&key=${API_KEY}&cx=${CX}`;

  const res = await fetch(url);
  const data = await res.json();

  return data.items || [];
}
