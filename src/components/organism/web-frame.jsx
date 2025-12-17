"use client";

import { useState } from "react";
import { Loader2, ExternalLink } from "lucide-react";

export function WebFrame({ url, title = "Web Preview" }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative flex h-[75vh] w-full flex-col overflow-hidden rounded-2xl border border-white/20 bg-black/40 backdrop-blur-2xl shadow-2xl">
      <div className="relative flex-1 bg-white">
        {isLoading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#050505]">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
            <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">
              Connecting to server...
            </p>
          </div>
        )}
        
        <iframe
          src={url}
          className="h-full w-full border-none"
          onLoad={() => setIsLoading(false)}
          sandbox="allow-same-origin allow-scripts allow-forms"
          title={title}
        />
      </div>

      <div className="bg-white/5 px-4 py-1.5 text-[9px] text-gray-500 border-t border-white/10">
        Secure Connection • {url}
      </div>
    </div>
  );
}