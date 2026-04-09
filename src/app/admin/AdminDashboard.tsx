"use client";

import { useState, useEffect, useCallback } from "react";

interface BlogPost {
  id: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  content: string;
  published: boolean;
}

interface MaterialItem {
  title: string;
  type: string;
  url: string;
  date: string;
}

interface MaterialCourse {
  id: string;
  title: string;
  description: string;
  materials: MaterialItem[];
}

interface MaterialsData {
  password: string;
  courses: MaterialCourse[];
}

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState<"blog" | "materials">("blog");

  // Blog state
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isNewPost, setIsNewPost] = useState(false);

  // Materials state
  const [materials, setMaterials] = useState<MaterialsData>({ password: "", courses: [] });
  const [editingCourse, setEditingCourse] = useState<MaterialCourse | null>(null);
  const [isNewCourse, setIsNewCourse] = useState(false);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const headers = { "Content-Type": "application/json", "x-admin-password": password };

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const loadPosts = useCallback(async () => {
    const res = await fetch("/api/admin/posts", { headers });
    if (res.ok) setPosts(await res.json());
  }, [password]);

  const loadMaterials = useCallback(async () => {
    const res = await fetch("/api/admin/materials", { headers });
    if (res.ok) setMaterials(await res.json());
  }, [password]);

  useEffect(() => {
    if (authenticated) {
      loadPosts();
      loadMaterials();
    }
  }, [authenticated, loadPosts, loadMaterials]);

  // ─── Blog CRUD ───
  const savePost = async () => {
    if (!editingPost) return;
    setSaving(true);
    const method = isNewPost ? "POST" : "PUT";
    const res = await fetch("/api/admin/posts", {
      method,
      headers,
      body: JSON.stringify(editingPost),
    });
    if (res.ok) {
      showMessage(isNewPost ? "글이 등록되었습니다." : "글이 수정되었습니다.");
      setEditingPost(null);
      setIsNewPost(false);
      await loadPosts();
    }
    setSaving(false);
  };

  const deletePost = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    await fetch("/api/admin/posts", {
      method: "DELETE",
      headers,
      body: JSON.stringify({ id }),
    });
    showMessage("삭제되었습니다.");
    await loadPosts();
  };

  // ─── Materials CRUD ───
  const saveMaterials = async (data: MaterialsData) => {
    setSaving(true);
    const res = await fetch("/api/admin/materials", {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });
    if (res.ok) {
      showMessage("저장되었습니다.");
      setMaterials(data);
    }
    setSaving(false);
  };

  const addMaterialToCourse = (courseId: string) => {
    const updated = {
      ...materials,
      courses: materials.courses.map((c) =>
        c.id === courseId
          ? {
              ...c,
              materials: [
                ...c.materials,
                { title: "", type: "pptx", url: "", date: new Date().toISOString().split("T")[0] },
              ],
            }
          : c
      ),
    };
    setMaterials(updated);
  };

  const removeMaterial = (courseId: string, index: number) => {
    const updated = {
      ...materials,
      courses: materials.courses.map((c) =>
        c.id === courseId
          ? { ...c, materials: c.materials.filter((_, i) => i !== index) }
          : c
      ),
    };
    setMaterials(updated);
  };

  const updateMaterial = (courseId: string, index: number, field: string, value: string) => {
    const updated = {
      ...materials,
      courses: materials.courses.map((c) =>
        c.id === courseId
          ? {
              ...c,
              materials: c.materials.map((m, i) =>
                i === index ? { ...m, [field]: value } : m
              ),
            }
          : c
      ),
    };
    setMaterials(updated);
  };

  const saveCourse = () => {
    if (!editingCourse) return;
    let updated: MaterialsData;
    if (isNewCourse) {
      updated = { ...materials, courses: [...materials.courses, editingCourse] };
    } else {
      updated = {
        ...materials,
        courses: materials.courses.map((c) => (c.id === editingCourse.id ? editingCourse : c)),
      };
    }
    setMaterials(updated);
    saveMaterials(updated);
    setEditingCourse(null);
    setIsNewCourse(false);
  };

  const deleteCourse = (id: string) => {
    if (!confirm("이 강의와 하위 자료가 모두 삭제됩니다. 계속하시겠습니까?")) return;
    const updated = { ...materials, courses: materials.courses.filter((c) => c.id !== id) };
    saveMaterials(updated);
  };

  // ─── Login Screen ───
  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF8F4]">
        <div className="w-full max-w-sm px-6">
          <h1 className="mb-2 text-2xl font-bold text-[#2C2C2C]">관리자 로그인</h1>
          <p className="mb-8 text-sm text-[#807872]">On a DoT 관리 페이지</p>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setAuthError(false); }}
              placeholder="관리자 비밀번호"
              className="rounded border border-[#807872]/30 bg-transparent px-4 py-3 text-base outline-none focus:border-[#C17A5A]"
              autoFocus
            />
            {authError && <p className="text-sm text-[#C17A5A]">비밀번호가 일치하지 않습니다.</p>}
            <button
              type="submit"
              className="rounded bg-[#C17A5A] px-6 py-3 text-white transition-opacity hover:opacity-90"
            >
              로그인
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ─── Dashboard ───
  return (
    <div className="min-h-screen bg-[#FAF8F4]">
      {/* Header */}
      <header className="border-b border-[#807872]/20 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1000px] items-center justify-between px-6 py-4">
          <a href="/" className="text-lg font-bold text-[#2C2C2C]">On a DoT</a>
          <span className="rounded bg-[#C17A5A]/10 px-3 py-1 text-xs text-[#C17A5A]">Admin</span>
        </div>
      </header>

      {/* Message Toast */}
      {message && (
        <div className="fixed top-4 right-4 z-50 rounded bg-[#2C2C2C] px-5 py-3 text-sm text-white shadow-lg">
          {message}
        </div>
      )}

      <div className="mx-auto max-w-[1000px] px-6 py-8">
        {/* Tabs */}
        <div className="mb-8 flex gap-0 border-b border-[#807872]/20">
          <button
            onClick={() => setActiveTab("blog")}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === "blog"
                ? "border-b-2 border-[#C17A5A] text-[#C17A5A]"
                : "text-[#807872] hover:text-[#2C2C2C]"
            }`}
          >
            블로그 관리
          </button>
          <button
            onClick={() => setActiveTab("materials")}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === "materials"
                ? "border-b-2 border-[#C17A5A] text-[#C17A5A]"
                : "text-[#807872] hover:text-[#2C2C2C]"
            }`}
          >
            강의자료 관리
          </button>
        </div>

        {/* ═══ Blog Tab ═══ */}
        {activeTab === "blog" && (
          <div>
            {editingPost ? (
              /* ── Post Editor ── */
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-[#2C2C2C]">
                    {isNewPost ? "새 글 작성" : "글 수정"}
                  </h2>
                  <button
                    onClick={() => { setEditingPost(null); setIsNewPost(false); }}
                    className="text-sm text-[#807872] hover:text-[#2C2C2C]"
                  >
                    취소
                  </button>
                </div>

                <input
                  type="text"
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  placeholder="제목"
                  className="w-full border-b border-[#807872]/30 bg-transparent py-3 text-xl font-bold outline-none focus:border-[#C17A5A]"
                />

                <input
                  type="text"
                  value={editingPost.tags.join(", ")}
                  onChange={(e) =>
                    setEditingPost({
                      ...editingPost,
                      tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                    })
                  }
                  placeholder="태그 (쉼표로 구분)"
                  className="w-full border-b border-[#807872]/30 bg-transparent py-2 text-sm outline-none focus:border-[#C17A5A]"
                />

                <input
                  type="text"
                  value={editingPost.summary}
                  onChange={(e) => setEditingPost({ ...editingPost, summary: e.target.value })}
                  placeholder="요약 (한 줄)"
                  className="w-full border-b border-[#807872]/30 bg-transparent py-2 text-sm outline-none focus:border-[#C17A5A]"
                />

                <textarea
                  value={editingPost.content}
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                  placeholder="내용 (Markdown)"
                  rows={16}
                  className="w-full resize-y rounded border border-[#807872]/20 bg-white p-4 text-sm leading-relaxed outline-none focus:border-[#C17A5A]"
                />

                <div className="flex items-center gap-4">
                  <label className="flex cursor-pointer items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={editingPost.published}
                      onChange={(e) => setEditingPost({ ...editingPost, published: e.target.checked })}
                      className="accent-[#C17A5A]"
                    />
                    공개
                  </label>
                </div>

                <button
                  onClick={savePost}
                  disabled={saving || !editingPost.title}
                  className="rounded bg-[#C17A5A] px-8 py-3 text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {saving ? "저장 중..." : "저장"}
                </button>
              </div>
            ) : (
              /* ── Post List ── */
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-[#2C2C2C]">블로그 글 ({posts.length})</h2>
                  <button
                    onClick={() => {
                      setEditingPost({
                        id: "",
                        title: "",
                        date: "",
                        tags: [],
                        summary: "",
                        content: "",
                        published: true,
                      });
                      setIsNewPost(true);
                    }}
                    className="rounded bg-[#C17A5A] px-5 py-2.5 text-sm text-white transition-opacity hover:opacity-90"
                  >
                    + 새 글 작성
                  </button>
                </div>

                {posts.length === 0 ? (
                  <p className="py-12 text-center text-sm text-[#807872]">아직 작성된 글이 없습니다.</p>
                ) : (
                  <div className="space-y-0">
                    {posts.map((post) => (
                      <div
                        key={post.id}
                        className="flex items-center justify-between border-b border-[#807872]/15 py-4"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-medium text-[#2C2C2C]">{post.title}</h3>
                            {!post.published && (
                              <span className="rounded bg-[#807872]/10 px-2 py-0.5 text-xs text-[#807872]">
                                비공개
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-xs text-[#807872]">
                            {post.date} · {post.tags.join(", ")}
                          </p>
                        </div>
                        <div className="flex gap-3">
                          <button
                            onClick={() => { setEditingPost(post); setIsNewPost(false); }}
                            className="text-sm text-[#807872] hover:text-[#C17A5A]"
                          >
                            수정
                          </button>
                          <button
                            onClick={() => deletePost(post.id)}
                            className="text-sm text-[#807872] hover:text-red-500"
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ═══ Materials Tab ═══ */}
        {activeTab === "materials" && (
          <div>
            {editingCourse ? (
              /* ── Course Editor ── */
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-[#2C2C2C]">
                    {isNewCourse ? "새 강의 추가" : "강의 수정"}
                  </h2>
                  <button
                    onClick={() => { setEditingCourse(null); setIsNewCourse(false); }}
                    className="text-sm text-[#807872] hover:text-[#2C2C2C]"
                  >
                    취소
                  </button>
                </div>

                <input
                  type="text"
                  value={editingCourse.title}
                  onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                  placeholder="강의명"
                  className="w-full border-b border-[#807872]/30 bg-transparent py-3 text-lg font-bold outline-none focus:border-[#C17A5A]"
                />

                <input
                  type="text"
                  value={editingCourse.description}
                  onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
                  placeholder="강의 설명 (한 줄)"
                  className="w-full border-b border-[#807872]/30 bg-transparent py-2 text-sm outline-none focus:border-[#C17A5A]"
                />

                <button
                  onClick={saveCourse}
                  disabled={!editingCourse.title}
                  className="rounded bg-[#C17A5A] px-8 py-3 text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  저장
                </button>
              </div>
            ) : (
              /* ── Course List + Materials ── */
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-[#2C2C2C]">강의 목록</h2>
                  <button
                    onClick={() => {
                      setEditingCourse({
                        id: "course-" + Date.now().toString(36),
                        title: "",
                        description: "",
                        materials: [],
                      });
                      setIsNewCourse(true);
                    }}
                    className="rounded bg-[#C17A5A] px-5 py-2.5 text-sm text-white transition-opacity hover:opacity-90"
                  >
                    + 새 강의
                  </button>
                </div>

                {/* Materials Password */}
                <div className="mb-8 flex items-center gap-3 rounded border border-[#807872]/20 bg-white p-4">
                  <span className="text-xs text-[#807872]">자료실 비밀번호:</span>
                  <input
                    type="text"
                    value={materials.password}
                    onChange={(e) => setMaterials({ ...materials, password: e.target.value })}
                    className="flex-1 border-b border-[#807872]/20 bg-transparent py-1 text-sm outline-none focus:border-[#C17A5A]"
                  />
                  <button
                    onClick={() => saveMaterials(materials)}
                    className="text-xs text-[#C17A5A] hover:underline"
                  >
                    변경
                  </button>
                </div>

                {materials.courses.length === 0 ? (
                  <p className="py-12 text-center text-sm text-[#807872]">등록된 강의가 없습니다.</p>
                ) : (
                  <div className="space-y-8">
                    {materials.courses.map((course) => (
                      <div key={course.id} className="rounded border border-[#807872]/15 bg-white">
                        {/* Course Header */}
                        <div className="flex items-center justify-between border-b border-[#807872]/10 px-5 py-4">
                          <div>
                            <h3 className="text-base font-bold text-[#2C2C2C]">{course.title}</h3>
                            <p className="mt-0.5 text-xs text-[#807872]">{course.description}</p>
                          </div>
                          <div className="flex gap-3">
                            <button
                              onClick={() => { setEditingCourse(course); setIsNewCourse(false); }}
                              className="text-xs text-[#807872] hover:text-[#C17A5A]"
                            >
                              수정
                            </button>
                            <button
                              onClick={() => deleteCourse(course.id)}
                              className="text-xs text-[#807872] hover:text-red-500"
                            >
                              삭제
                            </button>
                          </div>
                        </div>

                        {/* Materials List */}
                        <div className="px-5 py-3">
                          {course.materials.map((m, i) => (
                            <div key={i} className="flex items-center gap-3 border-b border-[#807872]/10 py-3 last:border-0">
                              <select
                                value={m.type}
                                onChange={(e) => updateMaterial(course.id, i, "type", e.target.value)}
                                className="w-20 rounded border border-[#807872]/20 bg-transparent px-2 py-1.5 text-xs outline-none"
                              >
                                <option value="pptx">PPT</option>
                                <option value="video">영상</option>
                                <option value="image">이미지</option>
                                <option value="pdf">PDF</option>
                                <option value="site">사이트</option>
                              </select>
                              <input
                                type="text"
                                value={m.title}
                                onChange={(e) => updateMaterial(course.id, i, "title", e.target.value)}
                                placeholder="자료 제목"
                                className="flex-1 border-b border-[#807872]/15 bg-transparent py-1 text-sm outline-none focus:border-[#C17A5A]"
                              />
                              <input
                                type="text"
                                value={m.url}
                                onChange={(e) => updateMaterial(course.id, i, "url", e.target.value)}
                                placeholder="URL (구글드라이브 등)"
                                className="flex-1 border-b border-[#807872]/15 bg-transparent py-1 text-sm outline-none focus:border-[#C17A5A]"
                              />
                              <input
                                type="date"
                                value={m.date}
                                onChange={(e) => updateMaterial(course.id, i, "date", e.target.value)}
                                className="w-36 border-b border-[#807872]/15 bg-transparent py-1 text-xs outline-none focus:border-[#C17A5A]"
                              />
                              <button
                                onClick={() => removeMaterial(course.id, i)}
                                className="text-xs text-[#807872] hover:text-red-500"
                              >
                                X
                              </button>
                            </div>
                          ))}

                          <div className="flex gap-3 pt-3">
                            <button
                              onClick={() => addMaterialToCourse(course.id)}
                              className="text-xs text-[#C17A5A] hover:underline"
                            >
                              + 자료 추가
                            </button>
                            <button
                              onClick={() => saveMaterials(materials)}
                              disabled={saving}
                              className="text-xs text-[#807872] hover:text-[#C17A5A]"
                            >
                              {saving ? "저장 중..." : "변경사항 저장"}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
