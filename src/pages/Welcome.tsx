import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '@/contexts/SettingsContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart3, TrendingUp, PieChart } from 'lucide-react';

export default function Welcome() {
  const { updateSettings } = useSettings();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [currency, setCurrency] = useState('USD');

  const handleContinue = () => {
    if (!userName.trim()) {
      return;
    }

    updateSettings({
      userName: userName.trim(),
      currency,
    });

    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo & Branding */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 gradient-primary rounded-2xl flex items-center justify-center shadow-primary">
                <BarChart3 className="w-10 h-10 text-primary-foreground" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-success rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-success-foreground" />
              </div>
              <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-warning rounded-lg flex items-center justify-center">
                <PieChart className="w-4 h-4 text-warning-foreground" />
              </div>
            </div>
          </div>
          
          <div>
            <h1 className="text-4xl font-bold text-foreground tracking-tight">
              Welcome to <span className="gradient-primary bg-clip-text text-transparent">ADS</span>
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Analytics + Data + Stock
            </p>
            <p className="text-sm text-muted-foreground mt-1 italic">
              "Invest. Understand. Grow."
            </p>
          </div>
        </div>

        {/* Setup Form */}
        <Card className="gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="text-center">Let's get started</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="userName">Your Name</Label>
              <Input
                id="userName"
                placeholder="Enter your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="transition-smooth"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Preferred Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD - US Dollar</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                  <SelectItem value="GBP">GBP - British Pound</SelectItem>
                  <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                  <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                  <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleContinue}
              disabled={!userName.trim()}
              className="w-full gradient-primary shadow-primary transition-spring"
            >
              Continue to Dashboard
            </Button>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-lg bg-card/50 border border-border/50">
            <BarChart3 className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">Portfolio Tracking</p>
          </div>
          <div className="p-4 rounded-lg bg-card/50 border border-border/50">
            <TrendingUp className="w-6 h-6 text-success mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">AI Insights</p>
          </div>
          <div className="p-4 rounded-lg bg-card/50 border border-border/50">
            <PieChart className="w-6 h-6 text-warning mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">Market News</p>
          </div>
        </div>
      </div>
    </div>
  );
}