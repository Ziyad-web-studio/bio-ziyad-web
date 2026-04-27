body { background-color: #F0F4F8; }

#studio-title {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

/* VIEW SYSTEM */
.view { display: none; }
.view.active { display: flex; }

/* SLIDE ANIMATION */
@keyframes slideIn {
  from { opacity: 0; transform: translateX(24px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes slideBack {
  from { opacity: 0; transform: translateX(-24px); }
  to   { opacity: 1; transform: translateX(0); }
}
.slide-in  { animation: slideIn  0.25s ease forwards; }
.slide-back { animation: slideBack 0.25s ease forwards; }

/* COPY BOX */
.copy-box {
  background: #fff;
  border-radius: 20px;
  padding: 18px;
  width: 100%;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  border: 1px solid #e2e8f0;
}
.copy-label {
  display: block;
  font-size: 11px;
  font-weight: 700;
  color: #3953bd;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 10px;
  font-family: 'Inter', sans-serif;
}
.code-wrapper {
  position: relative;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  padding: 14px;
  padding-right: 48px;
}
.code-content {
  color: #1e293b;
  font-size: 13px;
  font-family: 'Courier New', monospace;
  word-break: break-all;
  word-wrap: break-word;
  user-select: all;
  line-height: 1.5;
}
.copy-btn {
  position: absolute;
  top: 10px; right: 10px;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  color: #3953bd;
  width: 30px; height: 30px;
  border-radius: 8px;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px;
  transition: 0.2s;
}
.copy-btn:hover { background: #3953bd; color: #fff; }
.copy-btn:active { transform: scale(0.9); }

/* DOWNLOAD BLOCK */
.download-block {
  display: flex; align-items: center; gap: 14px; margin-top: 8px;
}
.app-thumb {
  width: 46px; height: 46px;
  border-radius: 12px;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden; flex-shrink: 0;
}
.app-thumb img { width: 100%; height: 100%; object-fit: cover; }
.dl-info { flex-grow: 1; }
.dl-title { font-weight: 700; color: #0f1e21; font-size: 14px; font-family: 'Inter', sans-serif; }
.dl-sub   { font-size: 12px; color: #64748b; margin-top: 2px; font-family: 'Inter', sans-serif; }
.btn-dl {
  background: #3953bd;
  color: #fff;
  padding: 7px 16px;
  border-radius: 99px;
  text-decoration: none;
  font-size: 13px;
  font-weight: 700;
  font-family: 'Inter', sans-serif;
  transition: 0.2s;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(57,83,189,0.3);
}
.btn-dl:hover { background: #2a40a8; transform: translateY(-1px); }

.note-text {
  font-size: 12px; color: #64748b;
  margin-top: 10px; line-height: 1.5;
  font-style: italic;
  font-family: 'Inter', sans-serif;
  padding-left: 10px;
  border-left: 2px solid #bfdbfe;
}

/* PROMPT SCROLL */
.prompt-scroll {
  max-height: 90px;
  overflow-y: auto;
}

/* LINK CARD */
.link-card {
  background: #fff;
  width: 100%;
  border-radius: 24px;
  padding: 16px;
  display: flex; align-items: center; justify-content: space-between;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  color: inherit;
}
.link-card:hover {
  box-shadow: 0 8px 25px rgba(0,0,0,0.08);
  border-color: rgba(57,83,189,0.2);
  transform: translateY(-2px);
}
.link-card:active { transform: scale(0.98); }
.card-icon-wrap {
  width: 48px; height: 48px;
  border-radius: 99px;
  background: #e1f1f5;
  display: flex; align-items: center; justify-content: center;
  color: #3953bd;
  flex-shrink: 0;
}