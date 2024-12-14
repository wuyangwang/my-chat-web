commit:
	@echo "Commit changes to git"
	git add .
	git commit -am "feat: update"
	git push origin main

pull:
	@echo "Pull latest changes from GitHub"
	git pull --rebase origin main

deploy:
	@echo "Deploy to Cloudflare Pages"
	pnpm run deploy
