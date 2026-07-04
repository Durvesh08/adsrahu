import React, { useState, useEffect, useRef, useCallback } from "react";
import { Plus, Edit2, Trash2, Eye, EyeOff, X, Check, Loader2, AlertCircle, Upload, ImageIcon, Sparkles, Wand2 } from "lucide-react";
import { blogApi, type ApiPost } from "@/lib/api";

const CATEGORIES = ["Real Estate Lead Generation","Facebook Ads","Google Ads","WhatsApp Funnels","CRM Automation","Marketing Strategies","Business Growth"];

function autoSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
}

const emptyForm = { title:"", slug:"", category:CATEGORIES[0], excerpt:"", content:"", published:false, imageUrl:"" };

/** Compress an image File to a JPEG base64 data-URL (max 1200px wide, 0.75 quality) */
function compressImage(file: File, maxWidth = 1200, quality = 0.75): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let w = img.width, h = img.height;
        if (w > maxWidth) { h = Math.round(h * maxWidth / w); w = maxWidth; }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
      img.src = reader.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function AdminBlog() {
  const [posts, setPosts] = useState<ApiPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [view, setView] = useState<"list"|"edit"|"generate">("list");
  const [editing, setEditing] = useState<ApiPost | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [error, setError] = useState("");
  const [listError, setListError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // AI Generator State
  const [aiTopic, setAiTopic] = useState("");
  const [aiCategory, setAiCategory] = useState(CATEGORIES[0]);
  const [aiTone, setAiTone] = useState("Professional & Authoritative");
  const [aiTargetAudience, setAiTargetAudience] = useState("");
  const [aiKeyPoints, setAiKeyPoints] = useState("");
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiError, setAiError] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  async function refresh() {
    try {
      setPosts(await blogApi.getAll());
      setListError("");
    } catch {
      setListError("Failed to load posts. Check your connection.");
    }
  }

  useEffect(() => { refresh().finally(() => setLoading(false)); }, []);

  function openNew() { setEditing(null); setForm({...emptyForm}); setError(""); setView("edit"); }

  function openEdit(post: ApiPost) {
    setEditing(post);
    setForm({ title:post.title, slug:post.slug, category:post.category, excerpt:post.excerpt, content:post.content, published:post.published, imageUrl:post.imageUrl || "" });
    setError("");
    setView("edit");
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (editing) { await blogApi.update(editing.id, form); }
      else { await blogApi.create(form); }
      await refresh();
      setView("list");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this post?")) return;
    try {
      await blogApi.delete(id);
      await refresh();
    } catch {
      setListError("Failed to delete post. Please try again.");
    }
  }

  async function togglePublish(id: number, current: boolean) {
    try {
      await blogApi.update(id, { published: !current });
      await refresh();
    } catch {
      setListError("Failed to update publish status.");
    }
  }

  const handleImageFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (JPG, PNG, WebP, etc.)");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Image is too large. Maximum size is 10 MB.");
      return;
    }
    setUploading(true);
    setError("");
    try {
      const dataUrl = await compressImage(file);
      setForm(prev => ({...prev, imageUrl: dataUrl}));
    } catch {
      setError("Failed to process image. Please try a different file.");
    } finally {
      setUploading(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleImageFile(file);
  }, [handleImageFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  // ── AI Generate View ──────────────────────────────────────────────────
  if (view === "generate") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>
            AI Blog Generator
          </h1>
          <button onClick={() => { setView("list"); setAiError(""); }} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white border border-white/10 rounded-xl px-4 py-2 hover:bg-white/5 transition-colors">
            <X className="w-4 h-4" /> Cancel
          </button>
        </div>

        {aiGenerating ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 flex items-center justify-center mb-6">
                <Wand2 className="w-10 h-10 text-purple-400 animate-pulse" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-500/30 animate-ping" />
              <div className="absolute -bottom-1 -left-1 w-4 h-4 rounded-full bg-purple-500/30 animate-ping" style={{animationDelay: '0.5s'}} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Generating Your Blog...</h3>
            <p className="text-gray-500 text-sm text-center max-w-md">Gemini AI is writing a professional, SEO-optimized blog post on <span className="text-blue-400 font-medium">"{aiTopic}"</span>. This usually takes 10-15 seconds.</p>
            <div className="mt-8 w-48 h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-[shimmer_2s_ease-in-out_infinite]" style={{width: '60%'}} />
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            {aiError && (
              <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-6">
                <AlertCircle className="w-4 h-4 shrink-0" /> {aiError}
              </div>
            )}

            <div className="rounded-2xl border border-white/10 bg-[#060912] p-8 space-y-6">
              <div className="text-center mb-2">
                <h3 className="text-lg font-semibold text-white mb-1">What should the blog be about?</h3>
                <p className="text-sm text-gray-500">Describe the topic and Gemini AI will write a complete blog post.</p>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider">Topic / Description *</label>
                <textarea
                  value={aiTopic}
                  onChange={e => setAiTopic(e.target.value)}
                  rows={3}
                  placeholder="e.g. How to generate qualified real estate leads using Facebook ads in Mumbai..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/50 placeholder-gray-600 resize-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider">Category</label>
                  <select
                    value={aiCategory}
                    onChange={e => setAiCategory(e.target.value)}
                    className="w-full bg-[#0d1220] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/50"
                  >
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider">Tone of Voice</label>
                  <select
                    value={aiTone}
                    onChange={e => setAiTone(e.target.value)}
                    className="w-full bg-[#0d1220] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/50"
                  >
                    <option>Professional & Authoritative</option>
                    <option>Conversational & Engaging</option>
                    <option>Urgent & Persuasive</option>
                    <option>Luxurious & Exclusive</option>
                    <option>Educational & Informative</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button 
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-xs font-medium text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
                >
                  {showAdvanced ? "Hide Advanced Options" : "Show Advanced Options"}
                </button>
              </div>

              {showAdvanced && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider">Target Audience (Optional)</label>
                    <input
                      type="text"
                      value={aiTargetAudience}
                      onChange={e => setAiTargetAudience(e.target.value)}
                      placeholder="e.g. NRI Investors, First-time Homebuyers, Commercial Tenants..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/50 placeholder-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider">Key Points to Include (Optional)</label>
                    <textarea
                      value={aiKeyPoints}
                      onChange={e => setAiKeyPoints(e.target.value)}
                      rows={2}
                      placeholder="e.g. Mention our new VR property tour feature, highlight 12% ROI..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/50 placeholder-gray-600 resize-none"
                    />
                  </div>
                </div>
              )}

              <div className="pt-2">
                <button
                  onClick={async () => {
                    if (!aiTopic.trim()) { setAiError("Please enter a topic"); return; }
                    setAiGenerating(true);
                    setAiError("");
                    try {
                      const result = await blogApi.generate(aiTopic.trim(), aiCategory, aiTone, aiTargetAudience, aiKeyPoints);
                      setForm({
                        title: result.title || "",
                        slug: result.slug || autoSlug(result.title || ""),
                        category: result.category || aiCategory,
                        excerpt: result.excerpt || "",
                        content: result.content || "",
                        published: false,
                        imageUrl: result.imageUrl || "",
                      });
                      setEditing(null);
                      setError("");
                      setView("edit");
                    } catch (err) {
                      setAiError(err instanceof Error ? err.message : "AI generation failed. Please try again.");
                    } finally {
                      setAiGenerating(false);
                    }
                  }}
                  disabled={!aiTopic.trim()}
                  className="w-full h-12 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  style={{background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', boxShadow: '0 0 20px rgba(139,92,246,0.3), 0 4px 15px rgba(0,0,0,0.5)'}}
                >
                  <Sparkles className="w-4 h-4" />
                  Generate Blog with AI
                </button>
              </div>

              <div className="border-t border-white/5 pt-4">
                <p className="text-[11px] text-gray-600 text-center">Powered by Gemini 2.5 Flash · Blog will be saved as Draft for your review</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (view === "edit") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">{editing ? "Edit Post" : "New Post"}</h1>
          <button onClick={() => setView("list")} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white border border-white/10 rounded-xl px-4 py-2 hover:bg-white/5 transition-colors">
            <X className="w-4 h-4" /> Cancel
          </button>
        </div>
        {error && (
          <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
            <AlertCircle className="w-4 h-4 shrink-0" /> {error}
          </div>
        )}
        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            <div>
              <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider">Title</label>
              <input value={form.title} onChange={e => setForm({...form, title:e.target.value, slug:autoSlug(e.target.value)})} required placeholder="Post title..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500/50 placeholder-gray-600 transition-all" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider">Excerpt</label>
              <textarea value={form.excerpt} onChange={e => setForm({...form, excerpt:e.target.value})} rows={2} placeholder="Brief description shown on blog page..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500/50 placeholder-gray-600 resize-none transition-all" />
            </div>

            {/* ── Cover Image Uploader ─────────────────────────────── */}
            <div>
              <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider">Cover Image</label>
              <input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleImageFile(f); }} />

              {form.imageUrl ? (
                <div className="relative group rounded-xl overflow-hidden border border-white/10 bg-[#0a0a12]">
                  <img src={form.imageUrl} alt="Cover preview" className="w-full aspect-video object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button type="button" onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors flex items-center gap-2">
                      <Upload className="w-4 h-4" /> Replace
                    </button>
                    <button type="button" onClick={() => setForm({...form, imageUrl: ""})}
                      className="px-4 py-2 text-sm font-medium text-white bg-red-600/80 rounded-lg hover:bg-red-500 transition-colors flex items-center gap-2">
                      <Trash2 className="w-4 h-4" /> Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`relative flex flex-col items-center justify-center gap-3 w-full aspect-video rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 ${
                    dragOver
                      ? "border-blue-400 bg-blue-500/10 scale-[1.01]"
                      : "border-white/10 bg-white/[0.02] hover:border-blue-500/40 hover:bg-blue-500/5"
                  }`}
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
                      <span className="text-sm text-gray-400">Processing image…</span>
                    </>
                  ) : (
                    <>
                      <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                        <ImageIcon className="w-7 h-7 text-blue-400" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-300 font-medium">Drop an image here or <span className="text-blue-400">click to browse</span></p>
                        <p className="text-xs text-gray-500 mt-1">JPG, PNG, WebP up to 10 MB · Auto-compressed to JPEG</p>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Also allow pasting a URL directly */}
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[10px] text-gray-600 uppercase tracking-wider shrink-0">Or paste URL:</span>
                <input
                  value={form.imageUrl.startsWith("data:") ? "" : form.imageUrl}
                  onChange={e => setForm({...form, imageUrl: e.target.value})}
                  placeholder="/blog/image.jpg or https://..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:border-blue-500/50 placeholder-gray-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider">Content (Markdown)</label>
              <textarea value={form.content} onChange={e => setForm({...form, content:e.target.value})} rows={16} placeholder="Write your post content here..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500/50 placeholder-gray-600 resize-none font-mono transition-all" />
            </div>
          </div>
          <div className="space-y-5">
            <div className="rounded-2xl border border-white/5 bg-[#060912] p-5 space-y-4">
              <h3 className="text-sm font-semibold text-white">Post Settings</h3>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider">Slug (URL)</label>
                <input value={form.slug} onChange={e => setForm({...form, slug:e.target.value})} placeholder="post-url-slug"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50 placeholder-gray-600" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider">Category</label>
                <select value={form.category} onChange={e => setForm({...form, category:e.target.value})} className="w-full bg-[#0d1220] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none">
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <span className="text-sm text-gray-300">Published</span>
                <button type="button" onClick={() => setForm({...form, published:!form.published})}
                  className={`relative w-11 h-6 rounded-full transition-colors ${form.published?"bg-blue-600":"bg-white/10"}`}>
                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${form.published?"translate-x-5":""}`} />
                </button>
              </div>
              <button type="submit" disabled={saving || uploading} className="w-full h-10 btn-premium rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-60">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                {saving ? "Saving…" : editing ? "Save Changes" : "Publish Post"}
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog CMS</h1>
          <p className="text-gray-500 text-sm mt-1">{posts.length} posts · {posts.filter(p=>p.published).length} published</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => { setAiTopic(""); setAiCategory(CATEGORIES[0]); setAiError(""); setView("generate"); }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-xl transition-all hover:scale-[1.02]"
            style={{background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', boxShadow: '0 0 15px rgba(139,92,246,0.25)'}}
          >
            <Sparkles className="w-4 h-4" /> AI Generate
          </button>
          <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white btn-premium rounded-xl">
            <Plus className="w-4 h-4" /> New Post
          </button>
        </div>
      </div>
      {listError && (
        <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 shrink-0" /> {listError}
        </div>
      )}
      <div className="rounded-2xl border border-white/5 bg-[#060912] overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-5 h-5 text-blue-400 animate-spin" /></div>
        ) : (
          <div className="divide-y divide-white/5">
            {posts.length === 0 && <div className="text-center py-12 text-gray-600 text-sm">No posts yet. Create your first post.</div>}
            {posts.map(post => (
              <div key={post.id} className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors">
                {/* Thumbnail */}
                <div className="w-14 h-10 rounded-lg overflow-hidden bg-white/5 shrink-0 border border-white/5">
                  {post.imageUrl ? (
                    <img src={post.imageUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center"><ImageIcon className="w-4 h-4 text-gray-600" /></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-medium text-white truncate">{post.title}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${post.published?"bg-green-500/20 text-green-400 border border-green-500/30":"bg-gray-500/20 text-gray-400 border border-gray-500/30"}`}>
                      {post.published?"Published":"Draft"}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">{post.category} · {new Date(post.createdAt).toLocaleDateString()}</div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => togglePublish(post.id, post.published)} className={`p-2 rounded-lg transition-colors ${post.published?"text-green-400 hover:bg-green-500/10":"text-gray-500 hover:bg-white/5 hover:text-white"}`}>
                    {post.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button onClick={() => openEdit(post)} className="p-2 rounded-lg text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 transition-colors"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(post.id)} className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
