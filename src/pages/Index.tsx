import { useState, useEffect } from 'react';
import AdvisoryCard from '@/components/AdvisoryCard';
import { fetchAdvisory, type AdvisoryResponse } from '@/lib/api';
import { Loader2, Wheat } from 'lucide-react';

const Index = () => {
  const [advisory, setAdvisory] = useState<AdvisoryResponse | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const loadInitialAdvisory = async () => {
      try {
        const initialAdvisory = await fetchAdvisory();
        setAdvisory(initialAdvisory);
      } catch (error) {
        console.error('Failed to load initial advisory:', error);
      } finally {
        setIsInitialLoading(false);
      }
    };

    loadInitialAdvisory();
  }, []);

  const handleNewAdvisory = (newAdvisory: AdvisoryResponse) => {
    setAdvisory(newAdvisory);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-3">
            <Wheat className="h-10 w-10" />
            <h1 className="text-3xl font-bold tracking-tight">
              Farmer Advisory Assistant
            </h1>
          </div>
          <p className="text-center mt-2 text-primary-foreground/90 font-medium">
            आपकी खेती के लिए विशेषज्ञ मार्गदर्शन
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {isInitialLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-lg text-muted-foreground">
              कृषि सलाह लोड कर रहे हैं...
            </p>
          </div>
        ) : (
          <AdvisoryCard
            advisory={advisory}
            onNewAdvisory={handleNewAdvisory}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t bg-muted/30 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Farmer Advisory Assistant - आपकी खुशहाली हमारा लक्ष्य
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
