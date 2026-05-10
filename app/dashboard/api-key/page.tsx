"use client";

import { useState, useEffect, useCallback } from "react";
import PageHead from "@/components/dashboard/PageHead";
import Pill from "@/components/ui/Pill";
import { Eye, EyeOff, Copy, Refresh, Alert, Plus, X } from "@/components/ui/Icons";

interface ApiKey {
  id: string;
  key_prefix: string;
  name: string;
  created_at: string;
  last_used: string | null;
}

const btnOutline: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: 6,
  padding: "8px 12px", background: "#fff", color: "var(--ink-700)",
  border: "1px solid var(--ink-200)", borderRadius: 8,
  fontFamily: "inherit", fontSize: 13, fontWeight: 500, cursor: "pointer",
};

export default function ApiKeyPage() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [revealedKey, setRevealedKey] = useState<string | null>(null); // full key shown once after generation
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch("/api/keys");
    const data = await res.json();
    setKeys(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const generate = async () => {
    setBusy(true);
    setRevealedKey(null);
    // Delete existing keys first
    for (const k of keys) {
      await fetch(`/api/keys/${k.id}`, { method: "DELETE" });
    }
    const res = await fetch("/api/keys", { method: "POST" });
    const data = await res.json();
    setRevealedKey(data.key ?? null);
    await load();
    setBusy(false);
    setConfirmDelete(false);
  };

  const deleteKey = async (id: string) => {
    setBusy(true);
    await fetch(`/api/keys/${id}`, { method: "DELETE" });
    setRevealedKey(null);
    await load();
    setBusy(false);
    setConfirmDelete(false);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  const activeKey = keys[0];

  return (
    <>
      <PageHead title="API Key" sub="Your secret key. Treat it like a password." />
      <div style={{ padding: 36, display: "grid", gap: 20, maxWidth: 880 }}>

        {revealedKey && (
          <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 12, padding: 16, fontSize: 13.5, color: "#166534" }}>
            <strong>Key generated.</strong> Copy it now — it won&apos;t be shown again after you leave this page.
          </div>
        )}

        {loading ? (
          <div style={{ padding: 24, color: "var(--ink-400)", fontSize: 14 }}>Loading...</div>
        ) : activeKey ? (
          <div style={{ background: "#fff", border: "1px solid var(--ink-200)", borderRadius: 12, padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>Live key</div>
                <Pill tone="gray">live</Pill>
              </div>
              <button
                onClick={() => setConfirmDelete(true)}
                style={{ ...btnOutline, color: "var(--red)", borderColor: "var(--red)", padding: "6px 10px", fontSize: 12 }}
              >
                <X size={13} /> Delete
              </button>
            </div>
            <div style={{ fontSize: 13, color: "var(--ink-500)" }}>
              Created {formatDate(activeKey.created_at)}
              {activeKey.last_used && ` · last used ${formatDate(activeKey.last_used)}`}
            </div>

            <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
              <div className="mono" style={{
                flex: 1, height: 48, padding: "0 16px",
                display: "flex", alignItems: "center",
                background: "var(--ink-50)", border: "1px solid var(--ink-200)",
                borderRadius: 10, fontSize: 13.5, color: "var(--ink-800)",
                letterSpacing: 0.4, overflow: "hidden",
              }}>
                {revealedKey ?? `${activeKey.key_prefix}••••••••••••••••••••••••`}
              </div>
              <button
                onClick={() => handleCopy(revealedKey ?? activeKey.key_prefix)}
                style={{ ...btnOutline, height: 48, padding: "0 14px" }}
                title={revealedKey ? "Copy full key" : "Copy key prefix"}
              >
                <Copy size={14} /> {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            {!revealedKey && (
              <div style={{ marginTop: 10, fontSize: 12.5, color: "var(--ink-400)" }}>
                Full key is only visible once after generation. Use <strong>Regenerate</strong> to get a new one.
              </div>
            )}
          </div>
        ) : (
          <div style={{ background: "#fff", border: "1px solid var(--ink-200)", borderRadius: 12, padding: 36, textAlign: "center" }}>
            <div style={{ fontSize: 14.5, color: "var(--ink-500)", marginBottom: 16 }}>No API key yet</div>
            <button onClick={generate} disabled={busy} style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "10px 18px", background: "var(--teal)", color: "#fff",
              border: "none", borderRadius: 10, fontFamily: "inherit",
              fontSize: 14, fontWeight: 600, cursor: busy ? "default" : "pointer", opacity: busy ? 0.7 : 1,
            }}>
              <Plus size={14} /> {busy ? "Generating…" : "Generate key"}
            </button>
          </div>
        )}

        {/* Confirm delete */}
        {confirmDelete && activeKey && (
          <div style={{ background: "#fff5f5", border: "1px solid #fca5a5", borderRadius: 12, padding: 18 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#991b1b", marginBottom: 6 }}>Delete this key?</div>
            <p style={{ margin: "0 0 14px", fontSize: 13, color: "#b91c1c", lineHeight: 1.5 }}>
              The key will stop working immediately. You can generate a new one after.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => deleteKey(activeKey.id)}
                disabled={busy}
                style={{ padding: "8px 14px", background: "#dc2626", color: "#fff", border: "none", borderRadius: 8, fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
              >
                {busy ? "Deleting…" : "Yes, delete"}
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                style={{ ...btnOutline }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Regenerate */}
        {activeKey && !confirmDelete && (
          <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: 18, display: "flex", gap: 14 }}>
            <div style={{ flexShrink: 0 }}><Alert size={20} color="#b45309" /></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#78350f" }}>Regenerate API key</div>
              <p style={{ margin: "4px 0 0", fontSize: 13, color: "#92400e", lineHeight: 1.55 }}>
                Deletes the current key and creates a new one. Any app using the old key will break immediately.
              </p>
              <button
                onClick={generate}
                disabled={busy}
                style={{
                  marginTop: 14, padding: "8px 14px",
                  background: busy ? "#d97706" : "#b45309",
                  color: "#fff", border: "none", borderRadius: 8,
                  fontFamily: "inherit", fontSize: 13, fontWeight: 600,
                  cursor: busy ? "default" : "pointer",
                  display: "inline-flex", alignItems: "center", gap: 6,
                }}
              >
                <Refresh size={14} /> {busy ? "Regenerating…" : "Regenerate key"}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
