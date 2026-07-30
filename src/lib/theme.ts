export function initTheme() {
  if (typeof document === "undefined") return;
  const stored = localStorage.getItem("theme");
  const isLight = stored !== "dark";
  document.documentElement.classList.toggle("light", isLight);
  document.documentElement.classList.toggle("dark", !isLight);
}


export function toggleTheme(): "light" | "dark" {
  const isLight = document.documentElement.classList.toggle("light");
  document.documentElement.classList.toggle("dark", !isLight);
  const mode = isLight ? "light" : "dark";
  localStorage.setItem("theme", mode);
  return mode;
}
