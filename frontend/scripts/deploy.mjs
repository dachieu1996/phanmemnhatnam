/**
 * Build website rồi đẩy bản build (frontend/out) lên nhánh GitHub Pages đang phục vụ (mặc định: main).
 *
 *   npm run deploy               # lint + test + build + push lên main
 *   npm run deploy -- --dry-run  # làm mọi bước, tạo commit nhưng KHÔNG push (để xem trước)
 *
 * GitHub Pages của repo để chế độ "Deploy from a branch: main / (root)" nên main phải chứa HTML đã build.
 * Mã nguồn nằm ở nhánh khác (new-web). Biến môi trường build được đặt cố định ở đây, không đọc từ .env.local.
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const BRANCH = process.env.DEPLOY_BRANCH || "main";
const DRY = process.argv.includes("--dry-run");
const BUILD_ENV = {
  NEXT_PUBLIC_CHAT_API: "off",
  NEXT_PUBLIC_SITE_URL: "https://phanmemnhatnam.com",
  NEXT_TELEMETRY_DISABLED: "1",
};

const FRONT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(FRONT, "out");
const log = (...a) => console.log("[deploy]", ...a);
const run = (cmd, opts = {}) => execSync(cmd, { stdio: "inherit", cwd: FRONT, ...opts });
const read = (cmd, cwd = FRONT) => execSync(cmd, { cwd, encoding: "utf8" }).trim();
function fail(msg) {
  console.error("[deploy] ✖", msg);
  process.exit(1);
}

// 1. Mã nguồn phải sạch và không nằm trên nhánh deploy — để mỗi bản build ứng với đúng một commit nguồn
const srcBranch = read("git rev-parse --abbrev-ref HEAD");
if (srcBranch === BRANCH) fail(`Đang đứng trên nhánh ${BRANCH} (nhánh chứa bản build). Chuyển sang nhánh mã nguồn trước.`);
if (read("git status --porcelain")) fail("Còn thay đổi chưa commit. Commit (và push) mã nguồn trước khi deploy.");
const srcSha = read("git rev-parse --short HEAD");

// 2. Kiểm tra + build
const env = { ...process.env, ...BUILD_ENV };
log("lint + test + build", BUILD_ENV);
run("npm run lint", { env });
run("npm test", { env });
run("npm run build", { env }); // postbuild tự kiểm tra link

// 3. File bắt buộc cho GitHub Pages
fs.writeFileSync(path.join(OUT, ".nojekyll"), ""); // không có file này Jekyll sẽ bỏ thư mục _next/ → mất CSS/JS
for (const f of ["index.html", "404.html", "CNAME"]) {
  if (!fs.existsSync(path.join(OUT, f))) fail(`Thiếu out/${f}`);
}

// 4. Chép bản build vào một worktree tạm của nhánh deploy rồi commit
run(`git fetch origin ${BRANCH}`);
const wt = fs.mkdtempSync(path.join(os.tmpdir(), "nhatnam-deploy-"));
try {
  run(`git worktree add --detach "${wt}" origin/${BRANCH}`);
  for (const f of fs.readdirSync(wt)) if (f !== ".git") fs.rmSync(path.join(wt, f), { recursive: true, force: true });
  fs.cpSync(OUT, wt, { recursive: true });
  // Xóa index rồi add lại để git lấy đúng chữ hoa/thường của tên file: Windows không phân biệt
  // (ghi logo.png đè Logo.png vẫn giữ tên cũ), còn GitHub Pages có phân biệt → 404.
  run("git rm -r -q --cached .", { cwd: wt });
  run("git add -A", { cwd: wt });
  if (!read("git status --porcelain", wt)) {
    log("Bản build giống hệt bản đang chạy — không có gì để deploy.");
  } else {
    run(`git commit -q -m "Deploy ${srcBranch}@${srcSha}"`, { cwd: wt });
    log(read("git show --stat --format=%s HEAD", wt).split("\n").slice(-1)[0]);
    if (DRY) {
      log(`--dry-run: đã tạo commit ${read("git rev-parse --short HEAD", wt)} nhưng KHÔNG push.`);
    } else {
      run(`git push origin HEAD:${BRANCH}`, { cwd: wt });
      log(`Đã đẩy lên ${BRANCH}. GitHub Pages cập nhật sau 1–2 phút: https://phanmemnhatnam.com`);
    }
  }
} finally {
  run(`git worktree remove --force "${wt}"`);
}
