import { useState } from 'react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { useSettings } from '@/contexts/SettingsContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Portfolio() {
  const { portfolio, addStock, removeStock, totalValue, loading, refreshPrices } = usePortfolio();
  const { settings } = useSettings();
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newStock, setNewStock] = useState({
    ticker: '',
    quantity: '',
    buyPrice: '',
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: settings.currency,
    }).format(value);
  };

  const handleAddStock = async () => {
    if (!newStock.ticker || !newStock.quantity || !newStock.buyPrice) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      await addStock({
        ticker: newStock.ticker.toUpperCase(),
        quantity: parseInt(newStock.quantity),
        buyPrice: parseFloat(newStock.buyPrice),
      });

      setNewStock({ ticker: '', quantity: '', buyPrice: '' });
      setIsAddDialogOpen(false);
      
      toast({
        title: "Success",
        description: `Added ${newStock.ticker.toUpperCase()} to your portfolio`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add stock to portfolio",
        variant: "destructive",
      });
    }
  };

  const calculateGainLoss = (stock: any) => {
    const gainLoss = (stock.currentPrice - stock.buyPrice) * stock.quantity;
    const gainLossPercent = ((stock.currentPrice - stock.buyPrice) / stock.buyPrice) * 100;
    return { gainLoss, gainLossPercent };
  };

  return (
    <div className="p-6 space-y-6">
      {/* Portfolio Overview */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Portfolio</h1>
          <p className="text-muted-foreground">Manage your stock holdings</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={refreshPrices}
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh Prices
          </Button>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary">
                <Plus className="w-4 h-4 mr-2" />
                Add Stock
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Stock</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="ticker">Stock Ticker</Label>
                  <Input
                    id="ticker"
                    placeholder="e.g., AAPL"
                    value={newStock.ticker}
                    onChange={(e) => setNewStock(prev => ({ ...prev, ticker: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="e.g., 10"
                    value={newStock.quantity}
                    onChange={(e) => setNewStock(prev => ({ ...prev, quantity: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="buyPrice">Buy Price</Label>
                  <Input
                    id="buyPrice"
                    type="number"
                    step="0.01"
                    placeholder="e.g., 150.00"
                    value={newStock.buyPrice}
                    onChange={(e) => setNewStock(prev => ({ ...prev, buyPrice: e.target.value }))}
                  />
                </div>
                <Button onClick={handleAddStock} className="w-full">
                  Add to Portfolio
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Portfolio Summary Card */}
      <Card className="gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Portfolio Summary</span>
            <Badge variant="outline">{portfolio.length} Holdings</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground">
            {formatCurrency(totalValue)}
          </div>
          <p className="text-sm text-muted-foreground">Total Portfolio Value</p>
        </CardContent>
      </Card>

      {/* Holdings List */}
      {portfolio.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <TrendingUp className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">No stocks in portfolio</h3>
                <p className="text-muted-foreground">Add your first stock to start tracking your portfolio</p>
              </div>
              <Button onClick={() => setIsAddDialogOpen(true)} className="gradient-primary">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Stock
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {portfolio.map((stock) => {
            const { gainLoss, gainLossPercent } = calculateGainLoss(stock);
            const isGain = gainLoss >= 0;
            
            return (
              <Card key={stock.id} className="gradient-card shadow-card transition-smooth hover:shadow-primary">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <span className="text-lg font-bold text-primary">{stock.ticker}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{stock.ticker}</h3>
                        <p className="text-sm text-muted-foreground">
                          {stock.quantity} shares @ {formatCurrency(stock.buyPrice)}
                        </p>
                      </div>
                    </div>

                    <div className="text-right space-y-1">
                      <div className="text-lg font-bold text-foreground">
                        {formatCurrency(stock.currentPrice * stock.quantity)}
                      </div>
                      <div className="flex items-center space-x-2">
                        {isGain ? (
                          <TrendingUp className="w-4 h-4 text-gain" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-loss" />
                        )}
                        <span className={`text-sm font-medium ${isGain ? 'text-gain' : 'text-loss'}`}>
                          {formatCurrency(gainLoss)} ({gainLossPercent >= 0 ? '+' : ''}{gainLossPercent.toFixed(2)}%)
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeStock(stock.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}