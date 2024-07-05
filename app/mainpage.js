'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
export default function MainPage() {
  const [news, setNews] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();
  useEffect(()=>{
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news')
        const data = await response.json();
        setNews(data.articles)
      } catch (error) {
        
      }
    }
    fetchNews();
  },[])

  const toArticle = (url) => {
    setSearchInput("");
    router.push(url)
  };
  const searchArticle = async () => {
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchInput)}&category=sports`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setNews(data.articles || []);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className='Main_Container'>
      <div className='News_Wrapper'>
        <div className='News_Container'>
          <div className='News_header'>
            <div className='header_content'>
            </div>
            <div className='header_content'>
             <a href='/'><h1>Sports News</h1></a>
            </div>
            <div className='header_content'>
            <form onSubmit={(e) => { e.preventDefault(); searchArticle(); }}>
                <input
                  type='text'
                  placeholder='search keyword'
                  onChange={event => setSearchInput(event.target.value)}
                />
                <button type="button" onClick={searchArticle}>
                  <img src='search.png' width={16} height={16} alt="search" />
                </button>
              </form>
            </div>
            
          </div>
          {news.map((article, index)=>(
            <div key={index} className='article' onClick={() => toArticle(article.url)}>
              <p className='article_title'> {article.title}</p>
              <p className='article_date'> {new Date(article.publishedAt).toLocaleString()}</p>
            </div>
          ))}
         </div>
      </div>
    </div>
  );
}