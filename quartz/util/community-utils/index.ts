
❯ cd C:\Users\Pansi\Downloads\Cybersecurity-Handbook

❯ git add quartz/util/community-utils/index.ts quartz/util/path.ts

❯ git commit -m "fix: add full community-utils export set"
On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   .gitignore

no changes added to commit (use "git add" and/or "git commit -a")

❯ git push origin main
To https://github.com/priyanshu-rawa/Cybersecurity-Handbook.git
 ! [rejected]        main -> main (fetch first)
error: failed to push some refs to 'https://github.com/priyanshu-rawa/Cybersecurity-Handbook.git'
hint: Updates were rejected because the remote contains work that you do not
hint: have locally. This is usually caused by another repository pushing to
hint: the same ref. If you want to integrate the remote changes, use
hint: 'git pull' before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.

❯ git pull origin main
remote: Enumerating objects: 17, done.
remote: Counting objects: 100% (17/17), done.
remote: Compressing objects: 100% (9/9), done.
remote: Total 10 (delta 6), reused 0 (delta 0), pack-reused 0 (from 0)
Unpacking objects: 100% (10/10), 3.22 KiB | 86.00 KiB/s, done.
From https://github.com/priyanshu-rawa/Cybersecurity-Handbook
 * branch            main       -> FETCH_HEAD
   38416e5..5a79a52  main       -> origin/main
Updating 38416e5..5a79a52
Fast-forward
 content/01 Cybersecurity Mastery.md  |   7 --
 quartz/util/community-utils/index.ts | 194 ++++++++++++++++-------------------
 2 files changed, 86 insertions(+), 115 deletions(-)

❯ git push origin main
Everything up-to-date

❯
