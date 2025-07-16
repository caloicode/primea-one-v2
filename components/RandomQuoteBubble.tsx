'use client';

import { useEffect, useState } from 'react';
import { Gem } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';

type Quote = {
  quote: string;
  author: string;
};

export default function RandomQuoteBubble() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [open, setOpen] = useState(false);

  const fetchRandomQuote = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.from('quotes').select('*');
    if (!error && data.length > 0) {
      const random = data[Math.floor(Math.random() * data.length)];
      setQuote(random);
    }
  };

  const handleClick = async () => {
    await fetchRandomQuote();
    setOpen(true);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        variant="ghost"
        size="icon"
        className="fixed bottom-6 right-6 z-50 bg-muted hover:bg-primary/80 text-primary hover:text-white shadow-md"
        aria-label="Inspire me"
      >
        <Gem className="w-5 h-5" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="text-center max-w-sm space-y-3">
          <p className="text-xs uppercase font-semibold text-muted-foreground tracking-wide">
            Learning Gem
          </p>

          {quote ? (
            <>
              <p className="text-base italic leading-relaxed">“{quote.quote}”</p>
              <p className="text-sm text-muted-foreground">— {quote.author}</p>
            </>
          ) : (
            <p className="text-sm">Loading quote...</p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
