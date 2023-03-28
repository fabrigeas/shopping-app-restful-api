version bump 1.2.0
buid(grunt): add git push to pipeline
fix(app): update frontend path for static files
build(grunt): update ssh task
build: rename package
chore(gruntfile): add push and ssh tasks
npm install
temp(grunt): fix buildFrontend
version bump 1.1.0
chore(gruntfile): update pipeline
update frontend bundle
update frontend bundle
update frontend bundle
fix(router): send index.html file for other routes
chore(npm): uninstall grunt-shell, grunt-ssh
chore(app): disable helmet
chore: init grunt for deployment
build(frontend): update frontend bumdle
version bump 1.0.1
build(tsconfig): exclude frontend from tsc
temp(frontend): clone shop from react
build(env)remove en variables before deploying to ec2
fix: reove redundant ObjectId declaration
update frontend bundle
update frontend bundle
build: change frontend folder
chore(types): extend user interface with firstName, lastName
Merge branch 'deploy' into main
npm i typecript
feat: set middleware to serve images
build: change db DB_HOST name for docker-compose
config: update app port and crendentials
refactor: return tokenData and cookie from sign in
feat: add update/password endpoint
fix: update/ patch users
feat: add firstName, lastName to users schema
build: change app env port
fix: delete file with validated filename
fix: serve static files
fix: return updateOne offer when calling POST
proj/husky: add test as  pre-commit hook
docs: update readme
ci: validate envs
ci: setup deployment scripts using ecosystem
ci: setup build and start scripts
ci: setup docker
tests: add tests for /api/auth
tests: add tests for /api/users
tests: add unit test for /api/offers
tests: setup jest, supertest
feat: define public and index routes
feat: implement REST /api/files
feat: implement REST /api/auth
feat: implement REST /api/users
feat: setup swagger-jsdoc, swagger-ui-express
feat: add rest /api/offers
feat: setup mongoose database
feat: setup middleware
ci: setup dev script with nodemon and corss-env
ci: setup husky pre-commit hooks
ci: setup eslint
ci: setup prettier
feat: implement hello world server
ci: setup typescript
ci: npm i -D  git-commit-msg-linter
Initial commit
