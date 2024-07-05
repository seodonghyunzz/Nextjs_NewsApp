import { NextResponse } from "next/server";
const Countries = ['us','gb','de','es','fr'];
const mainkeywords = ['football', 'soccer','EPL','Manchester','united', 'Chelsea','Tottenham ','transfer','breaking'];

export async function GET() {
 const API_KEY = process.env.NEXT_PUBLIC_API_Key;
 const Category = "sports";
 const promises = [];

 Countries.forEach(Country => {
    mainkeywords.forEach(mainkeywords => {
      const url = `https://newsapi.org/v2/top-headlines?q=${mainkeywords}&country=${Country}&apiKey=${API_KEY}&category=${Category}&pageSize=100`;
      promises.push(fetch(url).then(response => response.json()));
    });
  });
  try {
    const results = await Promise.all(promises);
    const articles = results.flatMap(result => result.articles);
    const uniqueArticles = [];
    const titles = new Set();

    articles.forEach(article => {
      if (!titles.has(article.title)) {
        titles.add(article.title);
        uniqueArticles.push(article);
      }
    });
    uniqueArticles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    return NextResponse.json({ articles: uniqueArticles });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch football news', details: error.message }, { status: 500 });
  }
 
}

