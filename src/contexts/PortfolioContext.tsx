import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Stock {
  id: string;
  ticker: string;
  quantity: number;
  buyPrice: number;
  currentPrice: number;
  createdAt: Date;
}

interface PortfolioContextType {
  portfolio: Stock[];
  addStock: (stock: Omit<Stock, 'id' | 'currentPrice' | 'createdAt'>) => Promise<void>;
  removeStock: (id: string) => void;
  updateStock: (id: string, updates: Partial<Stock>) => void;
  totalValue: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
  loading: boolean;
  refreshPrices: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [portfolio, setPortfolio] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(false);

  // Mock stock prices - in real app, this would fetch from API
  const mockPrices: Record<string, number> = {
    'AAPL': 175.23,
    'GOOGL': 142.56,
    'MSFT': 378.91,
    'TSLA': 248.87,
    'AMZN': 145.32,
    'NVDA': 482.15,
    'META': 312.44,
    'NFLX': 421.78,
  };

  // Load portfolio from localStorage on mount
  useEffect(() => {
    const savedPortfolio = localStorage.getItem('ads-portfolio');
    if (savedPortfolio) {
      const parsed = JSON.parse(savedPortfolio);
      setPortfolio(parsed.map((stock: any) => ({
        ...stock,
        createdAt: new Date(stock.createdAt),
      })));
    }
  }, []);

  // Save portfolio to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ads-portfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  // Refresh stock prices
  const refreshPrices = async () => {
    setLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setPortfolio(prev => prev.map(stock => ({
      ...stock,
      currentPrice: mockPrices[stock.ticker] || stock.buyPrice,
    })));
    setLoading(false);
  };

  // Update prices when portfolio changes
  useEffect(() => {
    if (portfolio.length > 0) {
      refreshPrices();
    }
  }, [portfolio.length]);

  const addStock = async (stockData: Omit<Stock, 'id' | 'currentPrice' | 'createdAt'>) => {
    const newStock: Stock = {
      ...stockData,
      id: Date.now().toString(),
      currentPrice: mockPrices[stockData.ticker] || stockData.buyPrice,
      createdAt: new Date(),
    };
    
    setPortfolio(prev => [...prev, newStock]);
  };

  const removeStock = (id: string) => {
    setPortfolio(prev => prev.filter(stock => stock.id !== id));
  };

  const updateStock = (id: string, updates: Partial<Stock>) => {
    setPortfolio(prev => prev.map(stock => 
      stock.id === id ? { ...stock, ...updates } : stock
    ));
  };

  // Calculate totals
  const totalValue = portfolio.reduce((sum, stock) => 
    sum + (stock.currentPrice * stock.quantity), 0
  );

  const totalCost = portfolio.reduce((sum, stock) => 
    sum + (stock.buyPrice * stock.quantity), 0
  );

  const totalGainLoss = totalValue - totalCost;
  const totalGainLossPercent = totalCost > 0 ? (totalGainLoss / totalCost) * 100 : 0;

  return (
    <PortfolioContext.Provider value={{
      portfolio,
      addStock,
      removeStock,
      updateStock,
      totalValue,
      totalGainLoss,
      totalGainLossPercent,
      loading,
      refreshPrices,
    }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}