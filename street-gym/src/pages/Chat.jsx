import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useAuth } from "../AuthContext";
import { COLORS } from "../data";

export default function Chat() {
  const { assignmentId } = useParams();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [uploading, setUploading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    loadMessages();

    const channel = supabase
      .channel(`chat-${assignmentId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `assignment_id=eq.${assignmentId}`,
        },
        (payload) => setMessages((prev) => [...prev, payload.new]),
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [assignmentId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function loadMessages() {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("assignment_id", assignmentId)
      .order("created_at", { ascending: true });

    if (!error) setMessages(data);
  }

  async function sendMessage(e) {
    e.preventDefault();
    if (!text.trim()) return;

    await supabase.from("messages").insert({
      assignment_id: assignmentId,
      sender_id: user.id,
      content: text,
    });

    setText("");
  }

  async function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const filePath = `${assignmentId}/${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("chat-media")
      .upload(filePath, file);

    if (uploadError) {
      alert("Erreur upload : " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("chat-media").getPublicUrl(filePath);

    await supabase.from("messages").insert({
      assignment_id: assignmentId,
      sender_id: user.id,
      media_url: data.publicUrl,
    });

    setUploading(false);
  }

  return (
    <div
      className="max-w-2xl mx-auto px-6 py-12 flex flex-col"
      style={{ height: "80vh" }}
    >
      <h1 className="text-2xl mb-6" style={{ color: COLORS.text }}>
        Conversation
      </h1>

      <div className="flex-1 overflow-y-auto flex flex-col gap-3 mb-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className="rounded-lg p-3 max-w-[75%]"
            style={{
              alignSelf: m.sender_id === user.id ? "flex-end" : "flex-start",
              background: m.sender_id === user.id ? COLORS.red : COLORS.bgAlt,
              color: m.sender_id === user.id ? "#0B0B0C" : COLORS.text,
            }}
          >
            {m.content && <p>{m.content}</p>}
            {m.media_url && m.media_url.match(/\.(mp4|mov|webm)$/i) ? (
              <video
                src={m.media_url}
                controls
                className="rounded mt-2 max-w-full"
              />
            ) : (
              m.media_url && (
                <img
                  src={m.media_url}
                  alt=""
                  className="rounded mt-2 max-w-full"
                />
              )
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={sendMessage} className="flex gap-2 items-center">
        <label
          className="cursor-pointer px-3 py-3 rounded-lg text-sm"
          style={{ border: `1px solid ${COLORS.steel}`, color: COLORS.text }}
        >
          {uploading ? "..." : "📎"}
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileUpload}
            hidden
          />
        </label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Écris un message..."
          className="flex-1 px-4 py-3 rounded-lg"
          style={{
            background: COLORS.bgAlt,
            color: COLORS.text,
            border: `1px solid ${COLORS.steel}`,
          }}
        />
        <button
          type="submit"
          className="font-semibold px-5 py-3 rounded-full"
          style={{ background: COLORS.red, color: "#0B0B0C" }}
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}
