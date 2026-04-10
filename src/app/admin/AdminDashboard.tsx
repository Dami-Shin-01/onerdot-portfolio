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
  id: number;
  course_id: string;
  title: string;
  type: string;
  url: string;
  date: string;
  sort_order: number;
}

interface MaterialCourse {
  id: string;
  title: string;
  description: string;
  materials: MaterialItem[];
}

interface CourseDraft {
  title: string;
  description: string;
}

interface MaterialDraft {
  title: string;
  type: string;
  url: string;
  date: string;
}

const EMPTY_MATERIAL_DRAFT: MaterialDraft = {
  title: "",
  type: "pptx",
  url: "",
  date: new Date().toISOString().split("T")[0],
};

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
  const [courses, setCourses] = useState<MaterialCourse[]>([]);
  const [addingCourse, setAddingCourse] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [courseDraft, setCourseDraft] = useState<CourseDraft>({ title: "", description: "" });
  const [addingMaterialTo, setAddingMaterialTo] = useState<string | null>(null);
  const [editingMaterialId, setEditingMaterialId] = useState<number | null>(null);
  const [materialDraft, setMaterialDraft] = useState<MaterialDraft>(EMPTY_MATERIAL_DRAFT);
  const [busy, setBusy] = useState(false);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; kind: "ok" | "err" } | null>(null);

  const headers = { "Content-Type": "application/json", "x-admin-password": password };

  const showMessage = (text: string, kind: "ok" | "err" = "ok") => {
    setMessage({ text, kind });
    setTimeout(() => setMessage(null), 3500);
  };

  const resetEditStates = () => {
    setAddingCourse(false);
    setEditingCourseId(null);
    setAddingMaterialTo(null);
    setEditingMaterialId(null);
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
    if (res.ok) {
      const data = await res.json();
      setCourses(data.courses || []);
    } else {
      showMessage("자료 목록을 불러오지 못했습니다.", "err");
    }
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

  // ─── Materials CRUD (행 단위) ───
  async function errorText(res: Response): Promise<string> {
    try {
      const j = await res.json();
      return typeof j?.error === "string" ? j.error : `HTTP ${res.status}`;
    } catch {
      return `HTTP ${res.status}`;
    }
  }

  const startAddCourse = () => {
    resetEditStates();
    setCourseDraft({ title: "", description: "" });
    setAddingCourse(true);
  };

  const confirmAddCourse = async () => {
    if (!courseDraft.title.trim()) {
      showMessage("과정 제목을 입력해주세요.", "err");
      return;
    }
    setBusy(true);
    const res = await fetch("/api/admin/courses", {
      method: "POST",
      headers,
      body: JSON.stringify(courseDraft),
    });
    setBusy(false);
    if (res.ok) {
      const created: MaterialCourse = await res.json();
      setCourses((prev) => [...prev, created]);
      setAddingCourse(false);
      showMessage("과정이 추가되었습니다.");
    } else {
      showMessage("추가 실패: " + (await errorText(res)), "err");
    }
  };

  const startEditCourse = (course: MaterialCourse) => {
    resetEditStates();
    setCourseDraft({ title: course.title, description: course.description });
    setEditingCourseId(course.id);
  };

  const confirmEditCourse = async (id: string) => {
    if (!courseDraft.title.trim()) {
      showMessage("과정 제목을 비울 수 없습니다.", "err");
      return;
    }
    setBusy(true);
    const res = await fetch(`/api/admin/courses/${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(courseDraft),
    });
    setBusy(false);
    if (res.ok) {
      const updated = await res.json();
      setCourses((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, title: updated.title, description: updated.description } : c
        )
      );
      setEditingCourseId(null);
      showMessage("과정이 수정되었습니다.");
    } else {
      showMessage("수정 실패: " + (await errorText(res)), "err");
    }
  };

  const deleteCourse = async (course: MaterialCourse) => {
    const count = course.materials.length;
    const msg =
      count > 0
        ? `"${course.title}" 과정과 하위 자료 ${count}개가 모두 삭제됩니다. 계속하시겠습니까?`
        : `"${course.title}" 과정을 삭제하시겠습니까?`;
    if (!confirm(msg)) return;
    setBusy(true);
    const res = await fetch(`/api/admin/courses/${encodeURIComponent(course.id)}`, {
      method: "DELETE",
      headers,
    });
    setBusy(false);
    if (res.ok) {
      setCourses((prev) => prev.filter((c) => c.id !== course.id));
      showMessage("과정이 삭제되었습니다.");
    } else {
      showMessage("삭제 실패: " + (await errorText(res)), "err");
    }
  };

  const startAddMaterial = (courseId: string) => {
    resetEditStates();
    setMaterialDraft({ ...EMPTY_MATERIAL_DRAFT });
    setAddingMaterialTo(courseId);
  };

  const confirmAddMaterial = async (courseId: string) => {
    if (!materialDraft.title.trim() || !materialDraft.url.trim()) {
      showMessage("자료 제목과 URL을 모두 입력해주세요.", "err");
      return;
    }
    setBusy(true);
    const res = await fetch(
      `/api/admin/courses/${encodeURIComponent(courseId)}/materials`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(materialDraft),
      }
    );
    setBusy(false);
    if (res.ok) {
      const created: MaterialItem = await res.json();
      setCourses((prev) =>
        prev.map((c) =>
          c.id === courseId ? { ...c, materials: [...c.materials, created] } : c
        )
      );
      setAddingMaterialTo(null);
      showMessage("자료가 추가되었습니다.");
    } else {
      showMessage("추가 실패: " + (await errorText(res)), "err");
    }
  };

  const startEditMaterial = (m: MaterialItem) => {
    resetEditStates();
    setMaterialDraft({ title: m.title, type: m.type, url: m.url, date: m.date });
    setEditingMaterialId(m.id);
  };

  const confirmEditMaterial = async (materialId: number, courseId: string) => {
    if (!materialDraft.title.trim() || !materialDraft.url.trim()) {
      showMessage("자료 제목과 URL을 비울 수 없습니다.", "err");
      return;
    }
    setBusy(true);
    const res = await fetch(`/api/admin/materials/${materialId}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(materialDraft),
    });
    setBusy(false);
    if (res.ok) {
      const updated: MaterialItem = await res.json();
      setCourses((prev) =>
        prev.map((c) =>
          c.id === courseId
            ? {
                ...c,
                materials: c.materials.map((m) => (m.id === materialId ? updated : m)),
              }
            : c
        )
      );
      setEditingMaterialId(null);
      showMessage("자료가 수정되었습니다.");
    } else {
      showMessage("수정 실패: " + (await errorText(res)), "err");
    }
  };

  const deleteMaterial = async (m: MaterialItem) => {
    if (!confirm(`"${m.title}" 자료를 삭제하시겠습니까?`)) return;
    setBusy(true);
    const res = await fetch(`/api/admin/materials/${m.id}`, {
      method: "DELETE",
      headers,
    });
    setBusy(false);
    if (res.ok) {
      setCourses((prev) =>
        prev.map((c) =>
          c.id === m.course_id
            ? { ...c, materials: c.materials.filter((x) => x.id !== m.id) }
            : c
        )
      );
      showMessage("자료가 삭제되었습니다.");
    } else {
      showMessage("삭제 실패: " + (await errorText(res)), "err");
    }
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
        <div
          className={`fixed top-4 right-4 z-50 rounded px-5 py-3 text-sm text-white shadow-lg ${
            message.kind === "err" ? "bg-red-600" : "bg-[#2C2C2C]"
          }`}
        >
          {message.text}
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
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#2C2C2C]">강의 목록 ({courses.length})</h2>
              {!addingCourse && (
                <button
                  onClick={startAddCourse}
                  className="rounded bg-[#C17A5A] px-5 py-2.5 text-sm text-white transition-opacity hover:opacity-90"
                >
                  + 새 과정
                </button>
              )}
            </div>

            {/* 새 과정 추가 폼 */}
            {addingCourse && (
              <div className="mb-6 rounded border border-[#C17A5A]/40 bg-white p-5">
                <h3 className="mb-3 text-sm font-bold text-[#C17A5A]">새 과정 추가</h3>
                <input
                  type="text"
                  value={courseDraft.title}
                  onChange={(e) => setCourseDraft({ ...courseDraft, title: e.target.value })}
                  placeholder="과정명"
                  className="mb-3 w-full border-b border-[#807872]/30 bg-transparent py-2 text-base font-medium outline-none focus:border-[#C17A5A]"
                  autoFocus
                />
                <input
                  type="text"
                  value={courseDraft.description}
                  onChange={(e) => setCourseDraft({ ...courseDraft, description: e.target.value })}
                  placeholder="과정 설명 (한 줄)"
                  className="mb-4 w-full border-b border-[#807872]/30 bg-transparent py-2 text-sm outline-none focus:border-[#C17A5A]"
                />
                <div className="flex gap-2">
                  <button
                    onClick={confirmAddCourse}
                    disabled={busy}
                    className="rounded bg-[#C17A5A] px-5 py-2 text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                  >
                    {busy ? "추가 중..." : "추가"}
                  </button>
                  <button
                    onClick={() => setAddingCourse(false)}
                    disabled={busy}
                    className="rounded border border-[#807872]/30 px-5 py-2 text-sm text-[#807872] hover:text-[#2C2C2C] disabled:opacity-50"
                  >
                    취소
                  </button>
                </div>
              </div>
            )}

            {courses.length === 0 && !addingCourse ? (
              <p className="py-12 text-center text-sm text-[#807872]">등록된 과정이 없습니다.</p>
            ) : (
              <div className="space-y-6">
                {courses.map((course) => {
                  const isEditingThis = editingCourseId === course.id;
                  return (
                    <div key={course.id} className="rounded border border-[#807872]/15 bg-white">
                      {/* Course Header */}
                      <div className="border-b border-[#807872]/10 px-5 py-4">
                        {isEditingThis ? (
                          <div>
                            <input
                              type="text"
                              value={courseDraft.title}
                              onChange={(e) => setCourseDraft({ ...courseDraft, title: e.target.value })}
                              placeholder="과정명"
                              className="mb-2 w-full border-b border-[#807872]/30 bg-transparent py-2 text-base font-bold outline-none focus:border-[#C17A5A]"
                              autoFocus
                            />
                            <input
                              type="text"
                              value={courseDraft.description}
                              onChange={(e) => setCourseDraft({ ...courseDraft, description: e.target.value })}
                              placeholder="과정 설명"
                              className="mb-3 w-full border-b border-[#807872]/20 bg-transparent py-1.5 text-xs outline-none focus:border-[#C17A5A]"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => confirmEditCourse(course.id)}
                                disabled={busy}
                                className="rounded bg-[#C17A5A] px-4 py-1.5 text-xs text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                              >
                                {busy ? "저장 중..." : "저장"}
                              </button>
                              <button
                                onClick={() => setEditingCourseId(null)}
                                disabled={busy}
                                className="rounded border border-[#807872]/30 px-4 py-1.5 text-xs text-[#807872] hover:text-[#2C2C2C] disabled:opacity-50"
                              >
                                취소
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-base font-bold text-[#2C2C2C]">{course.title}</h3>
                              {course.description && (
                                <p className="mt-0.5 text-xs text-[#807872]">{course.description}</p>
                              )}
                            </div>
                            <div className="flex gap-3">
                              <button
                                onClick={() => startEditCourse(course)}
                                className="text-xs text-[#807872] hover:text-[#C17A5A]"
                              >
                                수정
                              </button>
                              <button
                                onClick={() => deleteCourse(course)}
                                className="text-xs text-[#807872] hover:text-red-500"
                              >
                                삭제
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Materials List */}
                      <div className="px-5 py-3">
                        {course.materials.length === 0 && addingMaterialTo !== course.id && (
                          <p className="py-3 text-xs text-[#807872]">자료가 없습니다.</p>
                        )}
                        {course.materials.map((m) => {
                          const isEditingMat = editingMaterialId === m.id;
                          if (isEditingMat) {
                            return (
                              <div
                                key={m.id}
                                className="flex items-center gap-3 border-b border-[#807872]/10 py-3 last:border-0"
                              >
                                <select
                                  value={materialDraft.type}
                                  onChange={(e) => setMaterialDraft({ ...materialDraft, type: e.target.value })}
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
                                  value={materialDraft.title}
                                  onChange={(e) => setMaterialDraft({ ...materialDraft, title: e.target.value })}
                                  placeholder="자료 제목"
                                  className="flex-1 border-b border-[#807872]/15 bg-transparent py-1 text-sm outline-none focus:border-[#C17A5A]"
                                  autoFocus
                                />
                                <input
                                  type="text"
                                  value={materialDraft.url}
                                  onChange={(e) => setMaterialDraft({ ...materialDraft, url: e.target.value })}
                                  placeholder="URL"
                                  className="flex-1 border-b border-[#807872]/15 bg-transparent py-1 text-sm outline-none focus:border-[#C17A5A]"
                                />
                                <input
                                  type="date"
                                  value={materialDraft.date}
                                  onChange={(e) => setMaterialDraft({ ...materialDraft, date: e.target.value })}
                                  className="w-36 border-b border-[#807872]/15 bg-transparent py-1 text-xs outline-none focus:border-[#C17A5A]"
                                />
                                <button
                                  onClick={() => confirmEditMaterial(m.id, course.id)}
                                  disabled={busy}
                                  className="rounded bg-[#C17A5A] px-3 py-1 text-xs text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                                >
                                  {busy ? "..." : "저장"}
                                </button>
                                <button
                                  onClick={() => setEditingMaterialId(null)}
                                  disabled={busy}
                                  className="rounded border border-[#807872]/30 px-3 py-1 text-xs text-[#807872] hover:text-[#2C2C2C] disabled:opacity-50"
                                >
                                  취소
                                </button>
                              </div>
                            );
                          }
                          return (
                            <div
                              key={m.id}
                              className="flex items-center gap-3 border-b border-[#807872]/10 py-3 last:border-0"
                            >
                              <span className="w-20 rounded bg-[#807872]/10 px-2 py-1 text-center text-xs text-[#807872]">
                                {m.type}
                              </span>
                              <span className="flex-1 text-sm text-[#2C2C2C]">{m.title}</span>
                              <span className="flex-1 truncate text-xs text-[#807872]">{m.url}</span>
                              <span className="w-36 text-xs text-[#807872]">{m.date}</span>
                              <button
                                onClick={() => startEditMaterial(m)}
                                className="text-xs text-[#807872] hover:text-[#C17A5A]"
                              >
                                수정
                              </button>
                              <button
                                onClick={() => deleteMaterial(m)}
                                className="text-xs text-[#807872] hover:text-red-500"
                              >
                                삭제
                              </button>
                            </div>
                          );
                        })}

                        {/* 새 자료 추가 폼 */}
                        {addingMaterialTo === course.id && (
                          <div className="flex items-center gap-3 border-t border-[#C17A5A]/40 bg-[#C17A5A]/5 py-3">
                            <select
                              value={materialDraft.type}
                              onChange={(e) => setMaterialDraft({ ...materialDraft, type: e.target.value })}
                              className="w-20 rounded border border-[#807872]/20 bg-white px-2 py-1.5 text-xs outline-none"
                            >
                              <option value="pptx">PPT</option>
                              <option value="video">영상</option>
                              <option value="image">이미지</option>
                              <option value="pdf">PDF</option>
                              <option value="site">사이트</option>
                            </select>
                            <input
                              type="text"
                              value={materialDraft.title}
                              onChange={(e) => setMaterialDraft({ ...materialDraft, title: e.target.value })}
                              placeholder="자료 제목"
                              className="flex-1 border-b border-[#807872]/20 bg-transparent py-1 text-sm outline-none focus:border-[#C17A5A]"
                              autoFocus
                            />
                            <input
                              type="text"
                              value={materialDraft.url}
                              onChange={(e) => setMaterialDraft({ ...materialDraft, url: e.target.value })}
                              placeholder="URL (구글드라이브 등)"
                              className="flex-1 border-b border-[#807872]/20 bg-transparent py-1 text-sm outline-none focus:border-[#C17A5A]"
                            />
                            <input
                              type="date"
                              value={materialDraft.date}
                              onChange={(e) => setMaterialDraft({ ...materialDraft, date: e.target.value })}
                              className="w-36 border-b border-[#807872]/20 bg-transparent py-1 text-xs outline-none focus:border-[#C17A5A]"
                            />
                            <button
                              onClick={() => confirmAddMaterial(course.id)}
                              disabled={busy}
                              className="rounded bg-[#C17A5A] px-3 py-1 text-xs text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                            >
                              {busy ? "..." : "추가"}
                            </button>
                            <button
                              onClick={() => setAddingMaterialTo(null)}
                              disabled={busy}
                              className="rounded border border-[#807872]/30 px-3 py-1 text-xs text-[#807872] hover:text-[#2C2C2C] disabled:opacity-50"
                            >
                              취소
                            </button>
                          </div>
                        )}

                        {addingMaterialTo !== course.id && editingMaterialId === null && !isEditingThis && (
                          <div className="pt-3">
                            <button
                              onClick={() => startAddMaterial(course.id)}
                              className="text-xs text-[#C17A5A] hover:underline"
                            >
                              + 자료 추가
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
