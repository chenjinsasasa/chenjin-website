import { execFileSync, spawnSync } from "node:child_process";
import { argv, exit, stdin, stdout } from "node:process";
import readline from "node:readline/promises";

function getOutput(command, args) {
  return execFileSync(command, args, { encoding: "utf8" }).trim();
}

function run(command, args) {
  const result = spawnSync(command, args, { stdio: "inherit" });

  if (result.status !== 0) {
    exit(result.status ?? 1);
  }
}

function printHelp() {
  console.log(`Usage:
  npm run push -- "commit message"
  npm run push

If no commit message is provided, the script will prompt for one.
The script shows current changes, asks for confirmation, then runs:
git add -A -> git commit -> git push`);
}

async function prompt(question) {
  const rl = readline.createInterface({ input: stdin, output: stdout });
  const answer = (await rl.question(question)).trim();
  rl.close();
  return answer;
}

const args = argv.slice(2);

if (args.includes("--help") || args.includes("-h")) {
  printHelp();
  exit(0);
}

const statusOutput = getOutput("git", ["status", "--short"]);

if (!statusOutput) {
  console.log("No local changes to push.");
  exit(0);
}

console.log("Pending changes:");
console.log(statusOutput);
console.log("");

let commitMessage = args.join(" ").trim();

if (!commitMessage) {
  commitMessage = await prompt("Commit message: ");
}

if (!commitMessage) {
  console.error("Commit message is required.");
  exit(1);
}

const confirmation = await prompt("Stage, commit, and push all changes? (y/N): ");

if (!/^(y|yes)$/i.test(confirmation)) {
  console.log("Push cancelled.");
  exit(0);
}

const branch = getOutput("git", ["branch", "--show-current"]);

if (!branch) {
  console.error("Could not determine the current Git branch.");
  exit(1);
}

run("git", ["add", "-A"]);
run("git", ["commit", "-m", commitMessage]);

const upstream = spawnSync(
  "git",
  ["rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{upstream}"],
  { stdio: "ignore" }
);

if (upstream.status === 0) {
  run("git", ["push"]);
} else {
  run("git", ["push", "-u", "origin", branch]);
}

console.log(`Push complete on branch ${branch}.`);
