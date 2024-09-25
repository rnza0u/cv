local image = 'registry.rnzaou.me/cv';
local languages = ['en', 'fr'];
local blaze = std.extVar('blaze');

{
    targets: {
        install: {
            description: 'Install dependencies.',
            executor: 'std:commands',
            cache: {
                invalidateWhen: {
                    inputChanges: [
                        'package.json',
                    ],
                    outputChanges: [
                        'package-lock.json'
                    ],
                    filesMissing: ['node_modules']
                }
            },
            options: {
                commands: [
                    'npm ci'
                ] +  (if blaze.vars.playwright.installDeps then ['npx playwright install --with-deps'] else [])
            }
        },
        source: {
            description: 'The build source files.',
            cache: {
                invalidateWhen: {
                    inputChanges: ['src/**']
                }
            }
        },
        'build-pdf-files': {
            executor: 'std:commands',
            description: 'Build the cv files for PDF target.',
            cache: {
                invalidateWhen: {
                    outputChanges: ['build/pdf/**']
                }
            },
            options: {
                commands: [
                    {
                        program: 'node',
                        arguments: ['src/builder/build.mjs'],
                        environment: {
                            CV_TARGET: 'pdf'
                        }
                    }
                ]
            },
            dependencies: ['source', 'install']
        },
        'build-pdf-bundle': {
            executor: 'std:commands',
            description: 'Build the PDF files.',
            cache: {
                invalidateWhen: {
                    outputChanges: ['pdfs/**']
                }
            },
            options: {
                commands: [
                    {
                        program: 'docker',
                        arguments: [
                            'compose', 
                            '-f', 
                            'docker-compose-dev.yml',
                            'up', 
                            '--build',
                            '--detach',
                            '--force-recreate'
                        ],
                        environment: {
                            CV_BUNDLE: 'build/pdf'
                        }
                    },
                    {
                        program: 'node',
                        arguments: ['src/builder/export-pdf.mjs']
                    },
                    {
                        program: 'docker',
                        arguments: [
                            'compose', 
                            '-f', 
                            'docker-compose-dev.yml',
                            'down'
                        ],
                        environment: {
                            CV_BUNDLE: 'build/pdf'
                        }
                    }
                ]
            },
            dependencies: ['build-pdf-files']
        },
        'build-web-files': {
            executor: 'std:commands',
            description: 'Build the cv files for web target.',
            options: {
                commands: [
                    {
                        program: 'node',
                        arguments: ['src/builder/build.mjs'],
                        environment: {
                            CV_TARGET: 'web'
                        }
                    }
                ]
            },
            cache: {
                invalidateWhen: {
                    inputChanges: [
                        'src/**'
                    ],
                    outputChanges: [
                        'build/web/**'
                    ]
                }
            },
            dependencies: ['source', 'install']
        },
        'build-web-bundle': {
            executor: 'std:commands',
            description: 'Build the production web bundle.',
            options: {
                commands: [
                    'rm -rf dist',
                    './node_modules/.bin/parcel build --no-source-maps ' + std.join(' ', ['build/web/' + lang + '/index.html' for lang in languages])
                ]
            },
            cache: {
                invalidateWhen: {
                    outputChanges: [
                        'dist/**'
                    ]
                }
            },
            dependencies: ['build-web-files']
        },
        'build-image': {
            executor: 'std:commands',
            description: 'Build the Docker image.',
            options: {
                commands: [
                    'docker build -t ' + image + ' .'
                ]
            },
            cache: {
                invalidateWhen: {
                    inputChanges: ['Dockerfile', 'conf/**']
                }
            },
            dependencies: [
                'build-web-bundle'
            ]
        },
        publish: {
            executor: 'std:commands',
            description: 'Publish the Docker image.',
            options: {
                commands: [
                    'docker push ' + image
                ]
            },
            dependencies: [
                'ci:docker-authenticate',
                'build-image'
            ]
        },
        'serve-parcel': {
            executor: 'std:commands',
            description: 'Serve in dev mode with parcel.',
            options: {
                commands: [
                    './node_modules/.bin/parcel build/web/{{ vars.dev.lang }}/index.html'
                ]
            },
            dependencies: ['build-web-files']
        },
        'serve-compose': {
            executor: 'std:commands',
            description: 'Build for production and serve locally using docker compose (for testing purpose only).',
            options: {
                commands: [
                    {
                        program: 'docker',
                        arguments: [
                            'compose', 
                            '-f', 
                            'docker-compose-dev.yml',
                            'up', 
                            '--build',
                            '--force-recreate'
                        ]
                    }
                ]
            },
            dependencies: ['build-web-bundle']
        },
        deploy: {
            executor: 'std:commands',
            description: 'Deploy in production using docker compose.',
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
                            '--remove-orphans'
                        ]
                    }
                ]
            }
        },
        clean: {
            executor: 'std:commands',
            options: {
                commands: [
                    {
                        program: 'rm',
                        arguments: [
                            '-rf',
                            '.parcel-cache',
                            'dist',
                            'pdfs',
                            'build',
                            'node_modules'
                        ]
                    }
                ]
            }
        }
    }
}