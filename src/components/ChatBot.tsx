import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! I\'m here to help you find scholarships and answer your questions about studying abroad. How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

const streamChat = async (userMessage: string) => {
  const chatUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;
  const messageHistory = [...messages, { role: 'user' as const, content: userMessage }];

  try {
    const response = await fetch(chatUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`, // or service key if needed
      },
      body: JSON.stringify({ messages: messageHistory }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        toast({
          title: "Rate Limit",
          description: "Too many requests. Please try again later.",
          variant: "destructive",
        });
        return;
      }
      throw new Error(`Server error: ${response.status}`);
    }

    // Expect JSON response
    const data = await response.json();

    setMessages(prev => [
      ...prev,
      { role: 'assistant', content: data.reply || 'No response from server.' }
    ]);

  } catch (error) {
    console.error('Chat error:', error);
    toast({
      title: "Error",
      description: "Failed to send message. Please try again.",
      variant: "destructive",
    });
  }
};


  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    
    await streamChat(userMessage);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-hover bg-gradient-accent hover:bg-gradient-hover transition-all duration-300 hover:scale-110 z-50 group"
        aria-label="Open chat"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white group-hover:rotate-90 transition-transform duration-300" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-300" />
        )}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-card border border-border rounded-2xl shadow-hover z-50 flex flex-col animate-scale-in">
          {/* Header */}
          <div className="p-4 border-b border-border bg-gradient-accent rounded-t-2xl">
            <h3 className="font-heading font-bold text-white flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              NextScholar Assistant
            </h3>
            <p className="text-sm text-white/80">Ask me anything about scholarships!</p>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl transition-all duration-300 hover:scale-[1.02] ${
                      message.role === 'user'
                        ? 'bg-gradient-accent text-white rounded-br-none'
                        : 'bg-muted text-foreground rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-muted p-3 rounded-2xl rounded-bl-none">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-border bg-card rounded-b-2xl">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 rounded-xl transition-all focus:scale-[1.02]"
              />
              <Button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-gradient-accent hover:bg-gradient-hover transition-all duration-300 rounded-xl hover:scale-105 px-4"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
