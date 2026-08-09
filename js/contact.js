// Dynamic footer year
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

const fileUploader = document.querySelector(".file-upload-label");
