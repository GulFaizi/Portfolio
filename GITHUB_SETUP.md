# Portfolio GitHub Setup Guide (A-Z)

**Current Status:** Your push failed because the **Commit failed**.
**Reason:** Git doesn't know who you are yet (`Author identity unknown`).

Follow these steps to fix it.

## Step 1: Configure Git Identity
You must run these commands to tell Git your name and email. Replace the email with your GitHub email if possible.

```bash
git config --global user.name "Gul Faizi"
git config --global user.email "you@example.com"
```

## Step 2: Commit files
Now that Git knows who you are, we can save the files.

```bash
git add .
git commit -m "Initial commit"
```

## Step 3: Push to GitHub
Now send it to the cloud.

```bash
git branch -M main
git push -u origin main
```

---

### Why did "git push" fail before?
`git push` sends your *commits* to GitHub. Because your commit failed in Step 2 (due to missing identity), there was nothing to push! Once you run the config and commit commands, the push will work.
