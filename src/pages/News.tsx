import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Newspaper, Search, ExternalLink, Clock, TrendingUp } from 'lucide-react';

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  source: string;
  publishedAt: string;
  url: string;
  ticker?: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}

export default function News() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [searchTicker, setSearchTicker] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock news data
  const mockNews: NewsArticle[] = [
    {
      id: '1',
      title: 'Apple Reports Strong Q4 Earnings, iPhone Sales Exceed Expectations',
      summary: 'Apple Inc. reported better-than-expected quarterly results driven by strong iPhone 15 sales and growing services revenue. The company also announced a new $90 billion share buyback program.',
      source: 'Reuters',
      publishedAt: '2024-01-15T10:30:00Z',
      url: '#',
      ticker: 'AAPL',
      sentiment: 'positive'
    },
    {
      id: '2',
      title: 'Tesla Delivers Record Number of Vehicles in Q4',
      summary: 'Tesla delivered a record 484,507 vehicles in the fourth quarter, beating analyst expectations. The company also provided guidance for 50% annual growth.',
      source: 'Bloomberg',
      publishedAt: '2024-01-15T09:15:00Z',
      url: '#',
      ticker: 'TSLA',
      sentiment: 'positive'
    },
    {
      id: '3',
      title: 'Microsoft Azure Growth Slows, Shares Drop in After-Hours Trading',
      summary: 'Microsoft reported slower growth in its Azure cloud computing division, raising concerns about increasing competition from Amazon Web Services and Google Cloud.',
      source: 'CNBC',
      publishedAt: '2024-01-15T08:45:00Z',
      url: '#',
      ticker: 'MSFT',
      sentiment: 'negative'
    },
    {
      id: '4',
      title: 'Fed Signals Potential Rate Cuts in 2024',
      summary: 'Federal Reserve officials indicated they may cut interest rates three times this year if inflation continues to decline toward their 2% target.',
      source: 'Wall Street Journal',
      publishedAt: '2024-01-15T07:20:00Z',
      url: '#',
      sentiment: 'positive'
    },
    {
      id: '5',
      title: 'NVIDIA Stock Surges on AI Chip Demand',
      summary: 'NVIDIA shares jumped 8% in premarket trading after the company reported record data center revenue driven by artificial intelligence applications.',
      source: 'MarketWatch',
      publishedAt: '2024-01-15T06:30:00Z',
      url: '#',
      ticker: 'NVDA',
      sentiment: 'positive'
    }
  ];

  useEffect(() => {
    setNews(mockNews);
  }, []);

  const filteredNews = searchTicker
    ? news.filter(article => 
        article.ticker?.toLowerCase().includes(searchTicker.toLowerCase()) ||
        article.title.toLowerCase().includes(searchTicker.toLowerCase())
      )
    : news;

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-gain';
      case 'negative': return 'text-loss';
      default: return 'text-neutral';
    }
  };

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-gain/10 text-gain border-gain/20';
      case 'negative': return 'bg-loss/10 text-loss border-loss/20';
      default: return 'bg-neutral/10 text-neutral border-neutral/20';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours === 1) return '1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Market News</h1>
          <p className="text-muted-foreground">Stay updated with the latest financial news</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by ticker or keyword..."
              value={searchTicker}
              onChange={(e) => setSearchTicker(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
        </div>
      </div>

      {/* News Feed */}
      <div className="space-y-4">
        {filteredNews.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="space-y-4">
                <Newspaper className="w-16 h-16 text-muted-foreground mx-auto" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground">No news found</h3>
                  <p className="text-muted-foreground">
                    {searchTicker ? 'Try a different search term' : 'Check back later for updates'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredNews.map((article) => (
            <Card key={article.id} className="gradient-card shadow-card transition-smooth hover:shadow-primary">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-2">
                        {article.ticker && (
                          <Badge className="bg-primary/10 text-primary border-primary/20">
                            {article.ticker}
                          </Badge>
                        )}
                        <Badge className={getSentimentBadge(article.sentiment)}>
                          {article.sentiment}
                        </Badge>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-foreground leading-tight">
                        {article.title}
                      </h3>
                      
                      <p className="text-muted-foreground leading-relaxed">
                        {article.summary}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-4">
                          <span className="font-medium">{article.source}</span>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{formatTimeAgo(article.publishedAt)}</span>
                          </div>
                        </div>
                        
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Read More
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Trending Topics */}
      <Card className="gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span>Trending Topics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {['AI Revolution', 'Fed Policy', 'Earnings Season', 'EV Growth', 'Cloud Computing', 'Cybersecurity'].map((topic) => (
              <Badge 
                key={topic} 
                variant="outline" 
                className="cursor-pointer hover:bg-primary/10 hover:border-primary/30 transition-smooth"
              >
                {topic}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}