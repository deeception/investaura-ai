import { usePortfolio } from '@/contexts/PortfolioContext';
import { useSettings } from '@/contexts/SettingsContext';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

export function Header() {
  const { portfolio, totalValue, totalGainLoss, totalGainLossPercent } = usePortfolio();
  const { settings } = useSettings();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: settings.currency,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  return (
    <header className="bg-card border-b border-border px-6 py-4 shadow-card">
      <div className="flex items-center justify-between">
        {/* Welcome Message */}
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            Welcome back, {settings.userName || 'Investor'}
          </h2>
          <p className="text-sm text-muted-foreground">
            Track your portfolio performance and make informed decisions
          </p>
        </div>

        {/* Portfolio Summary */}
        <div className="flex items-center space-x-6">
          {/* Total Value */}
          <div className="text-right">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Total Value</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {formatCurrency(totalValue)}
            </p>
          </div>

          {/* Gain/Loss */}
          <div className="text-right">
            <div className="flex items-center space-x-2">
              {totalGainLoss >= 0 ? (
                <TrendingUp className="w-4 h-4 text-gain" />
              ) : (
                <TrendingDown className="w-4 h-4 text-loss" />
              )}
              <span className="text-sm text-muted-foreground">Today's P&L</span>
            </div>
            <div className="space-y-1">
              <p className={`text-xl font-bold ${totalGainLoss >= 0 ? 'text-gain' : 'text-loss'}`}>
                {formatCurrency(totalGainLoss)}
              </p>
              <p className={`text-sm ${totalGainLossPercent >= 0 ? 'text-gain' : 'text-loss'}`}>
                {formatPercent(totalGainLossPercent)}
              </p>
            </div>
          </div>

          {/* Holdings Count */}
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Holdings</div>
            <p className="text-2xl font-bold text-foreground">{portfolio.length}</p>
          </div>
        </div>
      </div>
    </header>
  );
}