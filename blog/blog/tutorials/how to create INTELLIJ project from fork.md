# Quick Guide: Starting a Project from a Forked Repo in IntelliJ IDEA

## Prerequisites
- IntelliJ IDEA installed
- Git installed and configured
- GitHub account
- Forked repository on your GitHub account

## Steps

1. **Fork the Repository**
    - Navigate to the original repository on GitHub
    - Click the "Fork" button in the top-right corner
    - Select your account to create the fork

2. **Clone the Forked Repository**
    - Open IntelliJ IDEA
    - Click on "Get from VCS" on the welcome screen (or File > New > Project from Version Control)
    - URL: Paste the URL of your forked repository
    - Directory: Choose where to save the project locally
    - Click "Clone"

3. **Set Up the Project**
    - IntelliJ will detect the project type and suggest to open it
    - Click "Trust Project" if prompted
    - Wait for IntelliJ to index the files and download dependencies

4. **Configure Remote Upstream**
    - Open the Terminal in IntelliJ (View > Tool Windows > Terminal)
    - Add the original repository as a remote:
      ```
      git remote add upstream https://github.com/original-owner/original-repo.git
      ```
    - Verify the new remote:
      ```
      git remote -v
      ```

5. **Create a New Branch**
    - In IntelliJ, go to Git > New Branch (or use the branch icon in the bottom-right corner)
    - Name your branch (e.g., "feature/new-feature" or "bugfix/issue-123")
    - Click "Create"

6. **Start Working**
    - Make your changes in the new branch
    - Commit regularly: Git > Commit (or Ctrl+K / Cmd+K)
    - Push your changes: Git > Push (or Ctrl+Shift+K / Cmd+Shift+K)

7. **Keeping Your Fork Updated**
    - Fetch upstream changes:
      ```
      git fetch upstream
      ```
    - Merge upstream changes into your local main branch:
      ```
      git checkout main
      git merge upstream/main
      ```
    - Push the updated main to your fork:
      ```
      git push origin main
      ```

8. **Create a Pull Request**
    - Go to your fork on GitHub
    - Click "Pull request"
    - Select the branch with your changes
    - Add a title and description
    - Click "Create pull request"

Remember to regularly sync your fork with the upstream repository to keep it up-to-date!