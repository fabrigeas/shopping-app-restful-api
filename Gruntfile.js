module.exports = grunt => {
  const pkg = grunt.file.readJSON('package.json');

  /**
   *
   * @param {string} stderr
   */
  const revertAndAbort = error => {
    grunt.log.error(error.toString());
    grunt.task.run('shell:revert');
  };

  grunt.initConfig({
    pkg,
    shell: {
      revert: {
        command: [
          // 'git checkout -',
          // `git branch -D ${depBranchName}`
        ].join(';'),
        options: {
          callback() {
            grunt.log.error(`failed to deploy. Reverting all changes`);
          },
        },
      },
      buildFrontend: {
        command: [
          'npm run build',
          'git add .',
          'git commit --no-verify -m "build(frontend): update frontend bumdle"',
        ].join(';'),
        cwd: 'frontend',
        options: {
          stdout: false,
          callback(error, stderr, {}, callback) {
            callback();
          },
        },
      },
      buildBackend: {
        command: ['npm run build'].join(';'),
        options: {
          callback(error, stderr, {}, callback) {
            if (error) {
              console.log(error);
            }
            callback();
          },
        },
      },
      bumpVersion: {
        command: isMinor =>
          `npm version --allow-same-version ${
            isMinor ? 'minor' : 'patch'
          } -m "version bump %s"`,
        options: {
          stdout: false,
          callback(error, {}, {}, callback) {
            if (error) {
              return revertAndAbort(error);
            }
            callback();
          },
        },
      },
      updateChangelog: {
        command: [
          "git log --oneline | sed 's/^[a-zA-Z0-9]* //g' > CHANGELOG.md",
          'git add CHANGELOG.md',
          'git commit --no-verify --amend  --no-edit',
        ].join(';'),
        options: {
          stdout: false,
          callback(error, {}, {}, callback) {
            if (error) {
              return revertAndAbort(error);
            }
            callback();
          },
        },
      },
      push: 'git push',
      ssh: {
        command: `ssh ec2 ls && cd ${pkg.name}&& git pull & sudo docker-compose up`,
        options: {},
      },
    },
  });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-ssh');

  grunt.registerTask('build', 'Build frontend and backend', () => {
    grunt.task.run(['shell:buildFrontend', 'shell:buildBackend']);
  });

  grunt.registerTask('ssh:deploy', '', () => {
    task.run(['sshexec:deploy']);
  });

  grunt.registerTask(
    'deploy',
    'Buld bundles, update npm version and changelog, push',
    () => {
      const isMinor = grunt.option('minor');
      const { task } = grunt;

      task.run('build');
      task.run('shell:bumpVersion:isMinor');
      task.run('shell:updateChangelog');
      // task.run('ssh:deploy');
    },
  );

  grunt.registerTask('shell:default', ['npm version']);
};
