import { useEffect, useRef, useState } from "react";
import { X, Send, HeartPulse, Loader2, AlertCircle } from "lucide-react";
import { sendChatMessage } from "../lib/api";
import type { ChatMessage, ChatContext } from "../lib/api";

type ChatPanelProps = {
  open: boolean;
  onClose: () => void;
  context: ChatContext;
};

export default function ChatPanel({ open, onClose, context }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const seededRef = useRef(false);

  useEffect(() => {
    if (open && !seededRef.current) {
      seededRef.current = true;
      setMessages([
        {
          role: "assistant",
          content: `Your estimated risk was ${Math.round(
            context.risk_probability * 100
          )}% (${context.risk_label}). Ask me anything about your result or heart health in general.`,
        },
      ]);
    }
  }, [open, context]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const reply = await sendChatMessage(trimmed, nextMessages.slice(0, -1), context);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-[var(--color-abyss)]/50 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex h-[85vh] w-full max-w-md flex-col overflow-hidden rounded-t-3xl border border-white/60 bg-white shadow-[0_30px_80px_-20px_rgba(15,76,76,0.4)] sm:h-[600px] sm:rounded-3xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--color-teal-soft)] bg-[var(--color-abyss)] px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-[var(--color-coral-bright)]">
              <HeartPulse className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-white">CardioScan Assistant</p>
              <p className="text-[11px] text-white/50">Heart health questions only</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close chat"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-[var(--color-mist)] p-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                m.role === "user"
                  ? "ml-auto rounded-tr-sm bg-[var(--color-teal-soft)] text-[var(--color-teal-deep)]"
                  : "mr-auto rounded-tl-sm bg-white text-[var(--color-ink)] shadow-sm"
              }`}
            >
              {m.content}
            </div>
          ))}

          {loading && (
            <div className="mr-auto flex max-w-[85%] items-center gap-2 rounded-2xl rounded-tl-sm bg-white px-4 py-2.5 text-sm text-[var(--color-sage)] shadow-sm">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Thinking...
            </div>
          )}

          {error && (
            <div className="mx-auto flex max-w-[90%] items-start gap-2 rounded-xl border border-[var(--color-coral)]/30 bg-[var(--color-coral-soft)] px-3 py-2 text-xs text-[var(--color-coral)]">
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              {error}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-[var(--color-teal-soft)] bg-white p-3">
          <div className="flex items-end gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask about your result or heart health..."
              rows={1}
              className="max-h-24 flex-1 resize-none rounded-xl border border-[var(--color-teal-soft)] bg-[var(--color-mist)] px-3.5 py-2.5 text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-coral)]"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-coral)] text-white transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 text-center text-[10px] text-[var(--color-sage)]">
            Not a substitute for professional medical advice.
          </p>
        </div>
      </div>
    </div>
  );
}
