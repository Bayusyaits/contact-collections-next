.PHONY: remove-local-tag create-tag push-tag increment-patch-version git-push-release git-pull-release complete-tag

remove-local-tag:
	@echo "--- remove all local tags ---"
	@git tag -d $(shell git tag -l)

create-tag:
	@echo "--- create tag ---"
	@git tag $(shell node -p "require('./package.json').version")
	@git tag -l

push-tag:
	@echo "--- push tag ---"
	@git push origin $(shell node -p "require('./package.json').version")

increment-patch-version:
	@echo "--- increment patch version ---"
	@npm version patch

git-push-release:
	@echo "--- push master ---"
	@git push origin master

git-pull-release:
	@echo "--- pull master ---"
	@git pull origin master

complete-tag: remove-local-tag increment-patch-version create-tag push-tag git-push-release
	@echo "--- complete tags ---"

latest-tag:
	@git fetch --tags
	@git checkout $(shell git describe --tags `git rev-list --tags --max-count=1`)
	@git checkout $(shell git describe --tags `git rev-list --tags --max-count=1`)

execute-complete: git-pull-release complete-tag
	@echo "--- running build image user  ---"
	@docker build -t https://hub.docker.com/r/bayusyaits/contact-collection:$(shell node -p "require('./package.json').version") .
	@docker build -t https://hub.docker.com/r/bayusyaits/contact-collection:latest .
	@echo "--- running docker tag and docker push node-ipfs-stream-publisher  ---"
	@docker push https://hub.docker.com/r/bayusyaits/contact-collection:$(shell node -p "require('./package.json').version")
	@docker push https://hub.docker.com/r/bayusyaits/contact-collection:latest
	@echo "--- running docker-compose transaction service  ---"
	@docker-compose up -d
	@echo "--- Congratulation your deployment is SUCCESS ---"
	@echo "--- running docker tag and docker push user management service  ---"
