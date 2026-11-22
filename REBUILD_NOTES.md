# REBUILD NOTES — tiny-stack-vm-01

Practice 1,000,000; edge differential 62/62; extra sets 40/40 each.

Weaknesses: size is the only lever left (main.ts 3,983 B; repo ~5.5 KB
vs leader 6,217 B at 11:08 WIB). No JIT/pre-decode, but worst case is
~0.3 s per 40 instances — far inside the 60 s wall.

Rebuild ideas: re-check the live leaderboard first; if a rival goes
below our total size, golf further (candidates: pops/pushes table
instead of inline checks; fixed i001-i040 ids instead of readdirSync).
Draw fresh sets with draw.ts and differential-test vs vm.mjs before
any resubmit. Do NOT chase speed: correctness + size decide this bounty.
