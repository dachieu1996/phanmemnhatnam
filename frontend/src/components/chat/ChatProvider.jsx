"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { askBackend, CHAT_API, sendFeedback } from "@/lib/chatApi";
import { askLocal, loadKb } from "@/lib/localKb";
import ChatLauncher from "./ChatLauncher";

// Khung chat chỉ tải khi người dùng mở lần đầu
const ChatPanel = dynamic(() => import("./ChatPanel"), { ssr: false });

const KEY = "nn_chat_v1";
const SID = "nn_chat_sid";
const ChatContext = createContext(null);

const store = {
  get(k) {
    try {
      return JSON.parse(sessionStorage.getItem(k));
    } catch {
      return null;
    }
  },
  set(k, v) {
    try {
      sessionStorage.setItem(k, JSON.stringify(v));
    } catch {}
  },
};

function sessionId() {
  let s = store.get(SID);
  if (!s) {
    s = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    store.set(SID, s);
  }
  return s;
}

export function useChat() {
  return useContext(ChatContext);
}

export default function ChatProvider({ config, children }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [everOpened, setEverOpened] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [chips, setChips] = useState(null); // null = gợi ý mặc định
  const [seenTeaser, setSeenTeaser] = useState(true);
  const [busy, setBusy] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const launcherRef = useRef(null);
  const busyRef = useRef(false);
  const msgsRef = useRef(msgs);
  useEffect(() => {
    msgsRef.current = msgs;
  }, [msgs]);

  // Khôi phục trạng thái phiên từ sessionStorage (chỉ đọc được sau khi hydrate)
  useEffect(() => {
    const st = store.get(KEY);
    /* eslint-disable react-hooks/set-state-in-effect -- đồng bộ một lần từ hệ thống ngoài (sessionStorage) */
    if (st) {
      setMsgs(Array.isArray(st.msgs) ? st.msgs : []);
      setChips(st.chips ?? null);
      setSeenTeaser(!!st.seenTeaser);
      if (st.open) {
        setOpen(true);
        setEverOpened(true);
      }
    } else setSeenTeaser(false);
    setLoaded(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (loaded) store.set(KEY, { open, msgs: msgs.slice(-40), chips, seenTeaser });
  }, [loaded, open, msgs, chips, seenTeaser]);

  const openChat = useCallback(() => {
    setOpen(true);
    setEverOpened(true);
    setSeenTeaser(true);
    loadKb(); // tải trước cơ sở tri thức dự phòng
  }, []);

  const closeChat = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => launcherRef.current?.focus());
  }, []);

  const ask = useCallback(
    async (text) => {
      const q = String(text || "").trim().slice(0, 1000);
      if (!q || busyRef.current) return;
      busyRef.current = true;
      setBusy(true);
      openChat();
      const history = msgsRef.current.map((m) => ({ role: m.role === "user" ? "user" : "assistant", content: m.text }));
      setMsgs((m) => [...m, { role: "user", text: q }]);
      setChips([]);
      const fallbackCfg = {
        hotline: config.hotline,
        email: config.email,
        address: config.address,
        suggestions: config.suggestions,
      };
      let r;
      try {
        if (!CHAT_API) throw new Error("off");
        r = await askBackend({ message: q, history, page: pathname, sessionId: sessionId() });
        r.ai = !r.rateLimited;
      } catch {
        r = await askLocal(q, { ...fallbackCfg, fellBack: !!CHAT_API });
        await new Promise((res) => setTimeout(res, 350 + Math.random() * 350));
      }
      setMsgs((m) => [
        ...m,
        { role: "bot", text: r.text, sources: r.sources || [], demo: !!r.demo, ai: !!r.ai, id: r.id || null },
      ]);
      setChips(r.suggestions || []);
      busyRef.current = false;
      setBusy(false);
    },
    [config, openChat, pathname],
  );

  const reset = useCallback(() => {
    setMsgs([]);
    setChips(null);
  }, []);

  const rate = useCallback((i, rating) => {
    const all = msgsRef.current;
    const m = all[i];
    if (!m || m.fb === rating) return;
    setMsgs(all.map((x, j) => (j === i ? { ...x, fb: rating } : x)));
    if (!m.demo) sendFeedback({ messageId: m.id, question: all[i - 1]?.text, answer: m.text, rating });
  }, []);

  // API toàn cục + nút [data-chat-ask] / [data-chat-open] ở bất kỳ đâu trên trang
  useEffect(() => {
    window.NhatNamChat = { open: openChat, close: closeChat, ask };
    const onClick = (e) => {
      const el = e.target.closest?.("[data-chat-ask],[data-chat-open]");
      if (!el) return;
      e.preventDefault();
      const q = el.getAttribute("data-chat-ask");
      if (q) ask(q);
      else openChat();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [ask, openChat, closeChat]);

  const value = useMemo(
    () => ({ open, msgs, chips, busy, config, openChat, closeChat, ask, reset, rate }),
    [open, msgs, chips, busy, config, openChat, closeChat, ask, reset, rate],
  );

  return (
    <ChatContext.Provider value={value}>
      {children}
      <div className={`nnc${open ? " is-open" : ""}`}>
        <ChatLauncher
          ref={launcherRef}
          open={open}
          title={config.title}
          teaser={config.teaser}
          showTeaser={loaded && !seenTeaser && !open}
          onToggle={() => (open ? closeChat() : openChat())}
          onTeaserClose={() => setSeenTeaser(true)}
          onTeaserOpen={openChat}
        />
        {everOpened && <ChatPanel hidden={!open} />}
      </div>
    </ChatContext.Provider>
  );
}
