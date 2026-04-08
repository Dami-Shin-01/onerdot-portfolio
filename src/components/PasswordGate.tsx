"use client";

import { useState } from "react";

interface PasswordGateProps {
  correctPassword: string;
  children: React.ReactNode;
}

export default function PasswordGate({ correctPassword, children }: PasswordGateProps) {
  const [input, setInput] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === correctPassword) {
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (authenticated) return <>{children}</>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-cream)]">
      <div className="w-full max-w-sm px-6">
        <h1 className="mb-2 font-serif-kr text-2xl text-[var(--color-headline)]">
          강의자료실
        </h1>
        <p className="mb-8 text-sm text-[var(--color-warm-gray)]">
          비밀번호를 입력해주세요.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError(false);
            }}
            placeholder="비밀번호"
            className="rounded-[2px] border border-[var(--color-warm-gray)]/30 bg-transparent px-4 py-3 text-base text-[var(--color-charcoal)] outline-none transition-colors focus:border-[var(--color-terracotta)]"
            autoFocus
          />
          {error && (
            <p className="text-sm text-[var(--color-terracotta)]">
              비밀번호가 일치하지 않습니다.
            </p>
          )}
          <button
            type="submit"
            className="rounded-[2px] bg-[var(--color-terracotta)] px-6 py-3 text-base text-[var(--color-cream)] transition-colors hover:bg-[var(--color-terracotta-hover)]"
          >
            입장하기
          </button>
        </form>
      </div>
    </div>
  );
}
