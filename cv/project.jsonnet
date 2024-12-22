local image = 'registry.rnzaou.me/cv';
local blaze = std.extVar('blaze');

{
  targets: {
    source: {
      cache: {
        invalidateWhen: {
          inputChanges: [
            'routes/**',
            'islands/**',
            'src/**',
            'static/**',
            'deno.json',
            '*.ts',
          ],
        },
      },
    },
    lint: {
      executor: 'std:commands',
      options: {
        commands: [
          'deno check $(find . -path ./node_modules -prune -o -regex \'.+\\.tsx?\')',
        ]
        + (if blaze.vars.lint.fix then ['deno fmt'] else [])
        + [
          {
            program: 'deno',
            arguments: ['lint'] + (if blaze.vars.lint.fix then ['--fix'] else [])
          }
        ],
        shell: true
      }
    },
    install: {
      executor: 'std:commands',
      cache: {
        invalidateWhen: {
          filesMissing: ['node_modules'],
        },
      },
      options: {
        commands: [
          'deno install',
        ],
      },
    },
    serve: {
      executor: 'std:commands',
      options: {
        commands: [
          'deno task start',
        ],
      },
      dependencies: ['install'],
    },
    'build-bundle': {
      executor: 'std:commands',
      options: {
        commands: [
          'deno task build',
        ],
      },
      cache: {
        invalidateWhen: {
          outputChanges: [
            '_fresh/**',
          ],
        },
      },
      dependencies: ['install', 'source'],
    },
    'build-image': {
      executor: 'std:commands',
      options: {
        commands: [
          'docker build -t ' + image + ' .',
        ],
      },
      cache: {
        invalidateWhen: {
          inputChanges: ['Dockerfile'],
        },
      },
      dependencies: ['build-bundle'],
    },
    'build-pdfs': {
      executor: 'std:commands',
      options: {
        local containerName = 'cv-pdf-rendering',
        commands: [
          {
            program: 'docker',
            arguments: [
              'run',
              '--detach',
              '--name',
              containerName,
              '-p',
              '[::1]:23000:8000/tcp',
              '-p',
              '127.0.0.1:23000:8000/tcp',
              '-e',
              'CV_RENDER_MODE=pdf',
              'registry.rnzaou.me/cv',
            ],
          },
          './node_modules/.bin/playwright install',
          'deno -A scripts/export-to-pdf.ts',
          'docker stop ' + containerName,
          'docker rm ' + containerName,
        ],
      },
      cache: {
        invalidateWhen: {
          outputChanges: ['pdfs/**'],
        },
      },
      dependencies: ['build-image'],
    },
    publish: {
      executor: 'std:commands',
      options: {
        commands: [
          'docker push ' + image,
        ],
      },
      dependencies: ['build-image', 'ci:docker-authenticate'],
    },
    deploy: {
      executor: 'std:commands',
      options: {
        commands: [
          {
            program: 'docker',
            arguments: [
              'compose',
              'up',
              '--detach',
              '--pull',
              'always',
              '--force-recreate',
              '--remove-orphans',
            ],

          },
        ],
      },
    },
    clean: {
      executor: 'std:commands',
      options: {
        commands: [
          'rm -rf node_modules pdfs _fresh',
        ],
      },
    },
  },
}
