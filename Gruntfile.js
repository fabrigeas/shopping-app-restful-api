module.exports = grunt => {
  const pkg = grunt.file.readJSON('package.json');
  const depBranchName = 'deployment';
  const callback = (error, stdout, stderr, callback) => {
    if (error) {
      grunt.log.errorlns(error);
      grunt.task.run('shell:revert');
      callback();
    }
  };
  const options = {
    callback,
    // stdout: false,
  };

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-ssh');
  grunt.initConfig({
    pkg,
    shell: {
      detach: {
        command: [
          `git branch -D ${depBranchName}`,
          `git checkout -b ${depBranchName}`,
        ].join(';'),
        options: {
          stderr: false,
          callback(error, {}, {}, callback) {
            if (error) {
              grunt.task.run('shell:revert');
            }
            callback();
          },
        },
      },
      remerge: {
        options,
        command: [
          'git checkout -',
          `git merge ${depBranchName} --no-ff`,
          `git checkout -b ${depBranchName}`,
        ].join(';'),
      },
      revert: {
        command: ['git checkout -', `git branch -D ${depBranchName}`].join(';'),
        options: {
          callback() {
            // grunt.log.error(`failed to deploy. Reverting all changes`);
          },
        },
      },
      buildFrontend: {
        options,
        command: [
          'npm run build',
          'git add .',
          'git commit -m "build(frontend): update frontend bumdle"',
        ].join(';'),
        cwd: 'frontend',
      },
      buildBackend: {
        options,
        command: [
          // 'tsc',
          'tsc-alias',
        ].join(';'),
      },
      bumpVersion: {
        command: isMinor =>
          `npm version ${isMinor ? 'minor' : 'patch'} -m "version bump %s"`,
        options: {
          stdout: false,
          callback(error, {}, stderr, callback) {
            if (error) {
              grunt.log.error(stderr);
              grunt.task.run('shell:revert');
            }
            callback();
          },
        },
      },
      updateChangelog: {
        command: [
          "git log --oneline | sed 's/^[a-zA-Z0-9]* //g' > CHANGELOG.md",
          'git add CHANGELOG.md',
          'git commit --amend  --no-edit',
        ].join(';'),
        options: {
          stdout: false,
          callback(error, {}, {}, callback) {
            if (error) {
              grunt.log.error('Failed to update changelog');
              grunt.task.run('shell:revert');
            }
            callback();
          },
        },
      },
    },
    secret: grunt.file.readJSON('secret.json'),
    sshexec: {
      test: {
        command: [
          `cd ${pkg.name}`,
          'git pull',
          'npm install',
          'npm run deploy:prod',
        ].join(';'),
        options: {
          host: '<%= secret.host %>',
          username: '<%= secret.username %>',
          password: '<%= secret.password %>',
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('build', 'Prepare for deployment', () => {
    grunt.task.run(['shell:buildFrontend', 'shell:buildBackend']);
  });

  grunt.registerTask('dev', 'deploy to dev server', () => {
    grunt.log('deploying to dev server');
  });

  grunt.registerTask('stage', 'deploy to staging server', () => {
    grunt.log('deploying to staging server');
  });

  grunt.registerTask('production', 'deploying to prosuction server', () => {
    console.log('deploying to production server');
  });

  grunt.registerTask('ssh:deploy', '', () => {
    task.run(['sshexec:deploy']);
  });

  grunt.registerTask('deploy', 'A sample task that logs stuff.', () => {
    const isMinor = grunt.option('minor');
    const { task } = grunt;

    task.run('shell:detach');
    // task.run('build');
    task.run('shell:bumpVersion:isMinor');
    // task.run('shell:updateChangelog');
    // task.run('shell:remerge');
    task.run('ssh:deploy');
  });

  grunt.registerTask('shell:default', ['npm version']);
};
