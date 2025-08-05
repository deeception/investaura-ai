import { useState } from 'react';
import { useSettings } from '@/contexts/SettingsContext';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Settings as SettingsIcon, User, DollarSign, Trash2, Save, Key } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Settings() {
  const { settings, updateSettings, resetSettings } = useSettings();
  const { portfolio } = usePortfolio();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    userName: settings.userName,
    currency: settings.currency,
    apiKey: settings.apiKey,
  });

  const handleSave = () => {
    updateSettings(formData);
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully",
    });
  };

  const handleReset = () => {
    resetSettings();
    setFormData({
      userName: '',
      currency: 'USD',
      apiKey: '',
    });
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to defaults",
    });
  };

  const currencies = [
    { value: 'USD', label: 'USD - US Dollar' },
    { value: 'EUR', label: 'EUR - Euro' },
    { value: 'GBP', label: 'GBP - British Pound' },
    { value: 'JPY', label: 'JPY - Japanese Yen' },
    { value: 'CAD', label: 'CAD - Canadian Dollar' },
    { value: 'AUD', label: 'AUD - Australian Dollar' },
    { value: 'CHF', label: 'CHF - Swiss Franc' },
    { value: 'CNY', label: 'CNY - Chinese Yuan' },
  ];

  const hasChanges = 
    formData.userName !== settings.userName ||
    formData.currency !== settings.currency ||
    formData.apiKey !== settings.apiKey;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and application settings</p>
      </div>

      {/* User Profile */}
      <Card className="gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5 text-primary" />
            <span>User Profile</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="userName">Display Name</Label>
            <Input
              id="userName"
              placeholder="Enter your name"
              value={formData.userName}
              onChange={(e) => setFormData(prev => ({ ...prev, userName: e.target.value }))}
            />
            <p className="text-xs text-muted-foreground">
              This name will be displayed in the dashboard header
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Currency Settings */}
      <Card className="gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-primary" />
            <span>Currency & Display</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currency">Preferred Currency</Label>
            <Select value={formData.currency} onValueChange={(value) => setFormData(prev => ({ ...prev, currency: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.value} value={currency.value}>
                    {currency.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              All portfolio values and prices will be displayed in this currency
            </p>
          </div>
        </CardContent>
      </Card>

      {/* AI Integration */}
      <Card className="gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Key className="w-5 h-5 text-primary" />
            <span>AI Integration</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">Google AI Studio API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Enter your API key for AI features"
              value={formData.apiKey}
              onChange={(e) => setFormData(prev => ({ ...prev, apiKey: e.target.value }))}
            />
            <p className="text-xs text-muted-foreground">
              Required for AI-powered portfolio analysis and stock suggestions. 
              <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                Get your API key here
              </a>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Statistics */}
      <Card className="gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <SettingsIcon className="w-5 h-5 text-primary" />
            <span>Portfolio Statistics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-background/50">
              <p className="text-sm text-muted-foreground">Total Holdings</p>
              <p className="text-2xl font-bold text-foreground">{portfolio.length}</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-background/50">
              <p className="text-sm text-muted-foreground">Currency</p>
              <p className="text-2xl font-bold text-foreground">{settings.currency}</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-background/50">
              <p className="text-sm text-muted-foreground">AI Features</p>
              <p className="text-2xl font-bold text-foreground">{settings.apiKey ? 'Enabled' : 'Disabled'}</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-background/50">
              <p className="text-sm text-muted-foreground">Theme</p>
              <p className="text-2xl font-bold text-foreground">Dark</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={handleSave}
          disabled={!hasChanges}
          className="gradient-primary shadow-primary flex-1"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="flex-1">
              <Trash2 className="w-4 h-4 mr-2" />
              Reset All Settings
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reset All Settings</AlertDialogTitle>
              <AlertDialogDescription>
                This will reset all your settings to their default values. Your portfolio data will not be affected.
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleReset} className="bg-destructive text-destructive-foreground">
                Reset Settings
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <Separator />

      {/* App Information */}
      <Card className="gradient-card shadow-card">
        <CardHeader>
          <CardTitle>About ADS</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Version</span>
            <span className="text-foreground">1.0.0</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Last Updated</span>
            <span className="text-foreground">January 2024</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Framework</span>
            <span className="text-foreground">React + TypeScript</span>
          </div>
          <div className="pt-2">
            <p className="text-xs text-muted-foreground italic">
              "Invest. Understand. Grow." - ADS helps you make informed investment decisions with AI-powered insights.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}