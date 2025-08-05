import { useState } from 'react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Lightbulb, 
  TrendingUp, 
  Shield, 
  DollarSign, 
  Plus, 
  Star,
  Filter,
  Loader2,
  Brain
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StockSuggestion {
  ticker: string;
  company: string;
  sector: string;
  price: number;
  reason: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  aiScore: number;
  marketCap: string;
  dividend: number;
}

export default function Suggestions() {
  const { portfolio, addStock } = usePortfolio();
  const { toast } = useToast();
  const [suggestions, setSuggestions] = useState<StockSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');

  const mockSuggestions: StockSuggestion[] = [
    {
      ticker: 'JNJ',
      company: 'Johnson & Johnson',
      sector: 'Healthcare',
      price: 164.23,
      reason: 'Adds defensive healthcare exposure to your tech-heavy portfolio. Strong dividend history and stable earnings.',
      riskLevel: 'Low',
      aiScore: 8.5,
      marketCap: '$435B',
      dividend: 2.9
    },
    {
      ticker: 'BRK.B',
      company: 'Berkshire Hathaway',
      sector: 'Financials',
      price: 342.15,
      reason: 'Diversified conglomerate with excellent long-term track record. Provides exposure to multiple sectors.',
      riskLevel: 'Low',
      aiScore: 8.2,
      marketCap: '$768B',
      dividend: 0.0
    },
    {
      ticker: 'KO',
      company: 'Coca-Cola',
      sector: 'Consumer Staples',
      price: 61.45,
      reason: 'Defensive consumer staple with global brand recognition. Excellent dividend aristocrat status.',
      riskLevel: 'Low',
      aiScore: 7.8,
      marketCap: '$265B',
      dividend: 3.1
    },
    {
      ticker: 'VTI',
      company: 'Vanguard Total Stock Market ETF',
      sector: 'ETF',
      price: 245.67,
      reason: 'Broad market diversification in a single purchase. Low fees and instant diversification.',
      riskLevel: 'Medium',
      aiScore: 9.1,
      marketCap: 'ETF',
      dividend: 1.4
    },
    {
      ticker: 'PLTR',
      company: 'Palantir Technologies',
      sector: 'Technology',
      price: 18.92,
      reason: 'High-growth data analytics company with government contracts. Speculative but high potential.',
      riskLevel: 'High',
      aiScore: 6.7,
      marketCap: '$42B',
      dividend: 0.0
    }
  ];

  const generateSuggestions = async () => {
    setLoading(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSuggestions(mockSuggestions);
    setLoading(false);
    
    toast({
      title: "AI Suggestions Generated",
      description: "Found 5 stocks that complement your portfolio",
    });
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-success/10 text-success border-success/20';
      case 'Medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'High': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-neutral/10 text-neutral border-neutral/20';
    }
  };

  const filteredSuggestions = filter === 'all' 
    ? suggestions 
    : suggestions.filter(s => s.riskLevel.toLowerCase() === filter);

  const handleAddToPortfolio = (suggestion: StockSuggestion) => {
    // For demo, we'll add 1 share at current price
    addStock({
      ticker: suggestion.ticker,
      quantity: 1,
      buyPrice: suggestion.price,
    });
    
    toast({
      title: "Stock Added",
      description: `Added ${suggestion.ticker} to your portfolio`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI Stock Suggestions</h1>
          <p className="text-muted-foreground">Get personalized stock recommendations based on your portfolio</p>
        </div>
        
        <Button
          onClick={generateSuggestions}
          disabled={loading}
          className="gradient-primary shadow-primary"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Lightbulb className="w-4 h-4 mr-2" />
              Get AI Suggestions
            </>
          )}
        </Button>
      </div>

      {/* Portfolio Analysis */}
      {portfolio.length > 0 && (
        <Card className="gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-primary" />
              <span>Portfolio Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-background/50">
                <p className="text-sm text-muted-foreground">Current Holdings</p>
                <p className="text-2xl font-bold text-foreground">{portfolio.length}</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-background/50">
                <p className="text-sm text-muted-foreground">Diversification Score</p>
                <p className="text-2xl font-bold text-warning">Medium</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-background/50">
                <p className="text-sm text-muted-foreground">Suggested Additions</p>
                <p className="text-2xl font-bold text-primary">3-5</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      {suggestions.length > 0 && (
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Filter by risk:</span>
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All risks" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Risk Levels</SelectItem>
              <SelectItem value="low">Low Risk</SelectItem>
              <SelectItem value="medium">Medium Risk</SelectItem>
              <SelectItem value="high">High Risk</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Suggestions List */}
      {suggestions.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <div className="space-y-4">
              <Lightbulb className="w-16 h-16 text-muted-foreground mx-auto" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">No suggestions yet</h3>
                <p className="text-muted-foreground">
                  {portfolio.length === 0 
                    ? 'Add some stocks to your portfolio first, then get AI-powered suggestions'
                    : 'Click "Get AI Suggestions" to receive personalized recommendations'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredSuggestions.map((suggestion) => (
            <Card key={suggestion.ticker} className="gradient-card shadow-card transition-smooth hover:shadow-primary">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <span className="text-lg font-bold text-primary">{suggestion.ticker}</span>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground">{suggestion.company}</h3>
                        <div className="flex items-center space-x-3 mt-1">
                          <Badge variant="outline">{suggestion.sector}</Badge>
                          <Badge className={getRiskColor(suggestion.riskLevel)}>
                            {suggestion.riskLevel} Risk
                          </Badge>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-warning fill-current" />
                            <span className="text-sm font-medium text-foreground">{suggestion.aiScore}/10</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-2xl font-bold text-foreground">${suggestion.price}</p>
                        <p className="text-sm text-muted-foreground">{suggestion.marketCap}</p>
                        {suggestion.dividend > 0 && (
                          <p className="text-xs text-success">Div: {suggestion.dividend}%</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="bg-background/50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-foreground mb-2">Why this stock?</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {suggestion.reason}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Shield className="w-4 h-4" />
                          <span>Risk: {suggestion.riskLevel}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="w-4 h-4" />
                          <span>AI Score: {suggestion.aiScore}/10</span>
                        </div>
                        {suggestion.dividend > 0 && (
                          <div className="flex items-center space-x-1">
                            <DollarSign className="w-4 h-4" />
                            <span>Dividend: {suggestion.dividend}%</span>
                          </div>
                        )}
                      </div>
                      
                      <Button 
                        onClick={() => handleAddToPortfolio(suggestion)}
                        className="gradient-primary"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add to Portfolio
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}