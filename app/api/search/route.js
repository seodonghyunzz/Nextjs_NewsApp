import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const category = searchParams.get('category') || 'sports';
  const API_KEY = process.env.NEXT_PUBLIC_API_Key;

  const url = `https://newsapi.org/v2/top-headlines?q=${encodeURIComponent(query)}&category=${encodeURIComponent(category)}&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error('Error fetching news:', response.statusText);
      return NextResponse.json({ message: 'Failed to fetch news' }, { status: response.status });
    }

    const data = await response.json();
    console.log('Fetched data:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in GET /api/search:', error);
    return NextResponse.json({ message: 'Failed to fetch news', details: error.message }, { status: 500 });
  }
}