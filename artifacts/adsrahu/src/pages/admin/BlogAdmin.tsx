import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Eye, EyeOff, X, Check, Loader2, AlertCircle } from "lucide-react";
import { blogApi, type ApiPost } from "@/lib/api";

const CATEGORIES = ["Real Estate Lead Generation","Facebook Ads","Google Ads","WhatsApp Funnels","CRM Automation","Marketing Strategies","Business Growth"];

function autoSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
}

const emptyForm = { title:"", slug:"", category:CATEGORIES[0], excerpt:"", content:"", published:false };

export default function AdminBlog() {
  const [posts, setPosts] = useState<ApiPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [view, setView] = useState<"list"|"edit">("list");
  const [editing, setEditing] = useState<ApiPost | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [error, setError] = useState("");
  const [listError, setListError] = useState("");

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
    setForm({ title:post.title, slug:post.slug, category:post.category, excerpt:post.excerpt, content:post.content, published:post.published });
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
              <button type="submit" disabled={saving} className="w-full h-10 btn-premium rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-60">
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
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white btn-premium rounded-xl">
          <Plus className="w-4 h-4" /> New Post
        </button>
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
