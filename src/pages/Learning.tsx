import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  GraduationCap, 
  Search, 
  Play, 
  BookOpen, 
  TrendingUp, 
  Shield, 
  PieChart,
  Brain,
  Clock
} from 'lucide-react';

interface LearningResource {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  type: 'video' | 'article' | 'course';
  url?: string;
}

export default function Learning() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const learningResources: LearningResource[] = [
    {
      id: '1',
      title: 'Stock Market Basics',
      description: 'Learn the fundamentals of stock investing, including how to read stock charts and understand market terminology.',
      category: 'basics',
      difficulty: 'Beginner',
      duration: '15 min',
      type: 'video'
    },
    {
      id: '2',
      title: 'Understanding Portfolio Diversification',
      description: 'Discover why diversification is crucial and how to build a well-balanced investment portfolio.',
      category: 'portfolio',
      difficulty: 'Beginner',
      duration: '20 min',
      type: 'article'
    },
    {
      id: '3',
      title: 'Technical Analysis Fundamentals',
      description: 'Master the art of reading charts, identifying trends, and using technical indicators for better investment decisions.',
      category: 'analysis',
      difficulty: 'Intermediate',
      duration: '45 min',
      type: 'course'
    },
    {
      id: '4',
      title: 'Risk Management Strategies',
      description: 'Learn how to protect your investments through proper risk management techniques and position sizing.',
      category: 'risk',
      difficulty: 'Intermediate',
      duration: '25 min',
      type: 'video'
    },
    {
      id: '5',
      title: 'ETFs vs Individual Stocks',
      description: 'Compare the benefits and drawbacks of ETF investing versus picking individual stocks.',
      category: 'products',
      difficulty: 'Beginner',
      duration: '18 min',
      type: 'article'
    },
    {
      id: '6',
      title: 'Behavioral Finance Psychology',
      description: 'Understand how emotions and cognitive biases affect investment decisions and how to overcome them.',
      category: 'psychology',
      difficulty: 'Advanced',
      duration: '35 min',
      type: 'course'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Topics', icon: BookOpen },
    { id: 'basics', name: 'Basics', icon: GraduationCap },
    { id: 'portfolio', name: 'Portfolio', icon: PieChart },
    { id: 'analysis', name: 'Analysis', icon: TrendingUp },
    { id: 'risk', name: 'Risk Management', icon: Shield },
    { id: 'psychology', name: 'Psychology', icon: Brain },
  ];

  const filteredResources = learningResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-success/10 text-success border-success/20';
      case 'Intermediate': return 'bg-warning/10 text-warning border-warning/20';
      case 'Advanced': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-neutral/10 text-neutral border-neutral/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Play;
      case 'article': return BookOpen;
      case 'course': return GraduationCap;
      default: return BookOpen;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Learning Center</h1>
          <p className="text-muted-foreground">Expand your investment knowledge with curated educational content</p>
        </div>
        
        <Button className="gradient-primary shadow-primary">
          <Brain className="w-4 h-4 mr-2" />
          Get AI Recommendations
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search learning resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Categories */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-6">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="flex items-center space-x-2">
              <category.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{category.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          {/* Learning Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.length === 0 ? (
              <div className="col-span-full">
                <Card className="text-center py-12">
                  <CardContent>
                    <div className="space-y-4">
                      <GraduationCap className="w-16 h-16 text-muted-foreground mx-auto" />
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">No resources found</h3>
                        <p className="text-muted-foreground">
                          {searchQuery ? 'Try a different search term' : 'Check back later for new content'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              filteredResources.map((resource) => {
                const TypeIcon = getTypeIcon(resource.type);
                
                return (
                  <Card key={resource.id} className="gradient-card shadow-card transition-smooth hover:shadow-primary group">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <TypeIcon className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex flex-col space-y-1">
                            <Badge className={getDifficultyColor(resource.difficulty)}>
                              {resource.difficulty}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{resource.duration}</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg leading-tight group-hover:text-primary transition-smooth">
                        {resource.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {resource.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                        </Badge>
                        
                        <Button size="sm" className="gradient-primary">
                          <Play className="w-3 h-3 mr-1" />
                          Start Learning
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Learning Path Suggestion */}
      <Card className="gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-primary" />
            <span>Recommended Learning Path</span>
            <Badge variant="outline">AI Suggested</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Based on your portfolio composition, we recommend starting with these topics:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border border-border bg-background/50">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground font-bold">1</div>
                  <span className="font-medium text-foreground">Portfolio Diversification</span>
                </div>
                <p className="text-xs text-muted-foreground">Learn to balance your holdings across different sectors</p>
              </div>
              
              <div className="p-4 rounded-lg border border-border bg-background/50">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground font-bold">2</div>
                  <span className="font-medium text-foreground">Risk Management</span>
                </div>
                <p className="text-xs text-muted-foreground">Protect your investments with proper risk controls</p>
              </div>
              
              <div className="p-4 rounded-lg border border-border bg-background/50">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground font-bold">3</div>
                  <span className="font-medium text-foreground">Technical Analysis</span>
                </div>
                <p className="text-xs text-muted-foreground">Use charts and indicators to time your trades</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}