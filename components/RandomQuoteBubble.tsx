"use client";

import { useEffect, useState } from "react";
import { Gem } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

type Quote = {
  quote: string;
  author: string;
};

export default function RandomQuoteBubble() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRandomQuote = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from("quotes").select("*");
      if (!error && data && data.length > 0) {
        const random = data[Math.floor(Math.random() * data.length)];
        setQuote(random);
      }
      setLoading(false);
    };

    fetchRandomQuote();
  }, []);

  // ✅ Prevent rendering until loading is done
  if (loading) return null;

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="ghost"
        size="icon"
        className="fixed bottom-6 right-6 z-50 bg-muted hover:bg-primary/80 text-primary hover:text-white shadow-md"
        aria-label="Inspire me"
      >
        <Gem className="w-5 h-5" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="text-center max-w-sm space-y-3">
          <DialogHeader className="text-left">
            <DialogTitle>Today's Learning Gem</DialogTitle>
          </DialogHeader>

          {quote ? (
            <>
              <p className="text-base italic leading-relaxed">
                “{quote.quote}”
              </p>
              <p className="text-sm text-muted-foreground">— {quote.author}</p>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">No quotes found.</p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
