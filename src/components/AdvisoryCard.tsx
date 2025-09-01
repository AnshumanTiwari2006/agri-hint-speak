import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Volume2, RefreshCw, Sprout } from 'lucide-react';
import { fetchAdvisory, speakInHindi, type AdvisoryResponse } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

interface AdvisoryCardProps {
  advisory: AdvisoryResponse | null;
  onNewAdvisory: (advisory: AdvisoryResponse) => void;
}

export default function AdvisoryCard({ advisory, onNewAdvisory }: AdvisoryCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { toast } = useToast();

  const handleFetchNew = async () => {
    setIsLoading(true);
    try {
      const newAdvisory = await fetchAdvisory();
      onNewAdvisory(newAdvisory);
      toast({
        title: "नई सलाह मिली!",
        description: "आपकी नई कृषि सलाह तैयार है।",
      });
    } catch (error) {
      toast({
        title: "त्रुटि",
        description: "सलाह प्राप्त करने में समस्या आई। कृपया पुनः प्रयास करें।",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeak = async () => {
    if (!advisory?.advice) {
      toast({
        title: "कोई सलाह नहीं",
        description: "पहले सलाह प्राप्त करें।",
        variant: "destructive",
      });
      return;
    }

    setIsSpeaking(true);
    try {
      await speakInHindi(advisory.advice);
      toast({
        title: "आवाज समाप्त",
        description: "सलाह पूरी तरह सुनाई गई।",
      });
    } catch (error) {
      toast({
        title: "आवाज त्रुटि",
        description: "आवाज चलाने में समस्या आई।",
        variant: "destructive",
      });
    } finally {
      setIsSpeaking(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg border-2 border-primary/20 bg-gradient-to-br from-card to-secondary/30">
      <CardHeader className="text-center pb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sprout className="h-8 w-8 text-primary" />
          <CardTitle className="text-2xl font-bold text-primary">
            किसान सलाहकार सहायक
          </CardTitle>
        </div>
        <p className="text-muted-foreground">आपकी फसल के लिए विशेषज्ञ सलाह</p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="min-h-[200px] p-6 bg-background rounded-lg border shadow-inner">
          {advisory?.advice ? (
            <div className="space-y-3">
              <p className="text-lg leading-relaxed text-foreground font-medium">
                {advisory.advice}
              </p>
              {advisory.timestamp && (
                <p className="text-sm text-muted-foreground">
                  समय: {new Date(advisory.timestamp).toLocaleString('hi-IN')}
                </p>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <p className="text-center">
                सलाह प्राप्त करने के लिए "नई सलाह प्राप्त करें" बटन दबाएं
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={handleFetchNew}
            disabled={isLoading}
            size="lg"
            className="flex-1 sm:flex-none bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-md"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                प्राप्त कर रहे हैं...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                नई सलाह प्राप्त करें
              </>
            )}
          </Button>

          <Button
            onClick={handleSpeak}
            disabled={!advisory?.advice || isSpeaking}
            variant="outline"
            size="lg"
            className="flex-1 sm:flex-none border-accent bg-accent/10 hover:bg-accent/20 text-accent-foreground shadow-md"
          >
            {isSpeaking ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                सुना रहे हैं...
              </>
            ) : (
              <>
                <Volume2 className="mr-2 h-4 w-4" />
                🔊 सुनें हिंदी में
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}