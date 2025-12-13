"use client";

export function MeridianLine() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[15] flex justify-center"
      aria-hidden="true"
    >
      <div className="w-[1px] h-full bg-stone opacity-15" />
    </div>
  );
}
