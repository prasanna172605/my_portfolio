import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

const getCreativeSpark = async () => {
  try {
    const res = await fetch("/api/creative-spark", { method: "POST" });
    const data = await res.json();
    return data.text || "A lonely astronaut sitting on a park bench on the moon.";
  } catch {
    return "A lonely astronaut sitting on a park bench on the moon.";
  }
};

export const CreativeSparkGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    const result = await getCreativeSpark();
    setPrompt(result);
    setLoading(false);
  };

  return (
    <div className="card emerald" style={{ background: 'rgba(6, 78, 59, 0.8)', borderColor: '#34d399' }}>
      <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#d1fae5' }}>
        <Sparkles size={20} style={{ color: '#fcd34d' }} />
        AI Creative Spark
      </h3>
      <p className="card-desc" style={{ color: '#a7f3d0' }}>
        Running out of sketch ideas? Let Gemini generate a unique art prompt for you.
      </p>

      {prompt && (
        <div style={{ background: 'rgba(6, 78, 59, 0.5)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(52, 211, 153, 0.3)', marginBottom: '16px', fontStyle: 'italic', color: '#d1fae5' }}>
          "{prompt}"
        </div>
      )}

      <button
        onClick={generate}
        disabled={loading}
        style={{ marginTop: 'auto', width: '100%', padding: '10px', background: '#10b981', color: '#064e3b', fontWeight: '700', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'center', gap: '8px' }}
      >
        {loading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
        {loading ? "Dreaming..." : "Generate Idea"}
      </button>
    </div>
  );
};
