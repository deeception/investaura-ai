import { useState } from 'react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { useSettings } from '@/contexts/SettingsContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, TrendingUp, AlertTriangle, PieChart, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Analytics() {
  const { portfolio, totalValue } = usePortfolio();
  const { settings } = useSettings();
  const { toast } = useToast();
  const [aiInsights, setAiInsights] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateAIInsights = async () => {
    if (portfolio.length === 0) {
      toast({
        title: "No Portfolio Data",
        description: "Add some stocks to your portfolio first",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate AI API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    const insights = `
**Portfolio Analysis Summary**

📊 **Diversification Score**: 7/10
Your portfolio shows good diversification across ${portfolio.length} holdings.

⚖️ **Risk Assessment**: Medium Risk
Based on your current allocation, your portfolio has moderate volatility exposure.

🎯 **Sector Exposure**: 
- Technology: 60%
- Consumer Discretionary: 25%
- Other: 15%

💡 **Key Recommendations**:
1. Consider adding defensive stocks (utilities, consumer staples)
2. Your tech exposure is high - consider some rebalancing
3. Look into international diversification

📈 **Performance Outlook**: Positive
Given current market conditions and your holdings, the outlook remains constructive.

⚠️ **Risk Factors**:
- High concentration in growth stocks
- Limited defensive positioning
- Consider dollar-cost averaging for new positions
    `;

    setAiInsights(insights);
    setLoading(false);
    
    toast({
      title: "AI Analysis Complete",
      description: "Your portfolio has been analyzed successfully",
    });
  };

  const calculateSectorAllocation = () => {
    // Mock sector data
    const sectors = {
      'Technology': 60,
      'Consumer Discretionary': 25,
      'Healthcare': 10,
      'Financials': 5,
    };
    return sectors;
  };

  const sectorAllocation = calculateSectorAllocation();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI Analytics</h1>
          <p className="text-muted-foreground">Get intelligent insights about your portfolio</p>
        </div>
        
        <Button
          onClick={generateAIInsights}
          disabled={loading || portfolio.length === 0}
          className="gradient-primary shadow-primary"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Brain className="w-4 h-4 mr-2" />
              Generate AI Insights
            </>
          )}
        </Button>
      </div>

      {/* Portfolio Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="gradient-card shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Holdings</p>
                <p className="text-2xl font-bold text-foreground">{portfolio.length}</p>
              </div>
              <PieChart className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Diversification</p>
                <p className="text-2xl font-bold text-success">7/10</p>
              </div>
              <TrendingUp className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Risk Level</p>
                <p className="text-2xl font-bold text-warning">Medium</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">AI Score</p>
                <p className="text-2xl font-bold text-primary">8.2/10</p>
              </div>
              <Brain className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sector Allocation */}
      <Card className="gradient-card shadow-card">
        <CardHeader>
          <CardTitle>Sector Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(sectorAllocation).map(([sector, percentage]) => (
              <div key={sector} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground">{sector}</span>
                  <span className="text-muted-foreground">{percentage}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-smooth"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      {aiInsights && (
        <Card className="gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-primary" />
              <span>AI Portfolio Analysis</span>
              <Badge variant="outline">Powered by AI</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-invert max-w-none">
              <pre className="whitespace-pre-wrap text-sm text-foreground leading-relaxed">
                {aiInsights}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {portfolio.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="space-y-4">
              <Brain className="w-16 h-16 text-muted-foreground mx-auto" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">No Portfolio Data</h3>
                <p className="text-muted-foreground">Add stocks to your portfolio to get AI-powered insights</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}