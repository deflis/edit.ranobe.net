import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { execSync } from "child_process";

const commitDate = execSync("git log -1 --format=%cI").toString().trimEnd();
const branchName = execSync("git rev-parse --abbrev-ref HEAD")
  .toString()
  .trimEnd();
const commitHash = execSync("git rev-parse HEAD").toString().trimEnd();

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __COMMIT_DATE: JSON.stringify(commitDate),
    __BRANCH_NAME: JSON.stringify(branchName),
    __COMMIT_HASH: JSON.stringify(commitHash),
  },
  plugins: [react()],
});
