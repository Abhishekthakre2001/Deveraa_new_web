"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-[400px] bg-background border rounded-lg shadow-lg p-6 z-50 flex flex-col gap-4 animate-in slide-in-from-bottom-8">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg">Cookie Preferences</h3>
        <Button variant="ghost" size="icon" onClick={() => setIsVisible(false)} className="-mt-2 -mr-2">
          <X className="w-4 h-4" />
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic.
      </p>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => setIsVisible(false)}>Decline</Button>
        <Button onClick={() => {
          localStorage.setItem("cookie-consent", "true");
          setIsVisible(false);
        }}>Accept</Button>
      </div>
    </div>
  );
}
