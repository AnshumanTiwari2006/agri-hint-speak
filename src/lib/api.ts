// API functions for farmer advisory backend
export interface AdvisoryResponse {
  advice: string;
  timestamp?: string;
  category?: string;
}

export const fetchAdvisory = async (): Promise<AdvisoryResponse> => {
  try {
    const response = await fetch('http://localhost:8000/advisory');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch advisory:', error);
    
    // Fallback advisory data for development
    return {
      advice: "आज मौसम अच्छा है। अपनी फसलों में पानी दें और कीटनाशक का छिड़काव करें। धान की फसल के लिए यह समय बहुत अच्छा है।",
      timestamp: new Date().toISOString(),
      category: "general"
    };
  }
};

export const speakInHindi = (text: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!('speechSynthesis' in window)) {
      reject(new Error('Speech synthesis not supported'));
      return;
    }

    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN';
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onend = () => resolve();
    utterance.onerror = (event) => reject(event.error);

    window.speechSynthesis.speak(utterance);
  });
};