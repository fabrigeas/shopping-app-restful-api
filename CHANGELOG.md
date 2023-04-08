version bump 1.21.0
fix(services): remove duplicate name validation
feat(models): set images prefixes
build(frontend): update frontend bumdle
feat(models/offers): add images getters, setters
feat(models): map images before responding
build(Docker): change default command
build(grunt): fix failing deploy frontend task
build(husky): remove failing pre-push hook
build(frontend): update frontend bumdle
build(frontend): update frontend bumdle
build(frontend): update frontend bumdle
build(frontend): update frontend bumdle
build(frontend): update frontend bumdle
build(frontend): update frontend bumdle
version bump 1.20.0
version bump 1.19.0
build: refactor PORT numbers to use new EC" Instance
build(app): log connection status
version bump 1.18.0
build: change part numbers and database  host name
version bump 1.17.0
build: chage mongo and nginx port numbers
version bump 1.16.0
version bump 1.15.0
deploy(Gruntfile): scp .env files
version bump 1.14.0
build(frontend): update frontend bumdle
version bump 1.13.0
version bump 1.12.0
fix(routes): render index page on reload
version bump 1.11.0
build(frontend): update frontend bumdle
version bump 1.10.0
fix(files): upload file fails
version bump 1.9.0
version bump 1.8.0
docs: update readme
version bump 1.7.0
build(frontend): update frontend bumdle
Merge branch 'dev' into main
refactor(routes/auth): send message rather than throwing error
fix(services/auth): add blocks to if statements
ci: add index.html as watch file to restart nodemon
build(docker-compose): prepend container names
Merge pull request #1 from fabrigeas/deploy-ec2
version bump 1.6.0
refactor(grunt): remove redundant import
version bump 1.5.0
build(frontend): update frontend bumdle
version bump 1.4.0
buid(docker-compose): remove dev task
version bump 1.3.0
buid(docker-compose): update server default command
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
