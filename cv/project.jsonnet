local image = 'registry.rnzaou.me/cv';
local languages = ['en', 'fr'];

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
                ]
            }
        },
        'build-website': {
            executor: 'std:commands',
            description: 'Build the website files.',
            options: {
                commands: [
                    'node src/builder/main.mjs'
                ]
            },
            cache: {
                invalidateWhen: {
                    inputChanges: [
                        'src/**'
                    ],
                    outputChanges: [
                        'build/**'
                    ]
                }
            },
            dependencies: ['install']
        },
        'build-bundle': {
            executor: 'std:commands',
            description: 'Build the production bundle.',
            options: {
                commands: [
                    'rm -rf dist',
                    './node_modules/.bin/parcel build --no-source-maps ' + std.join(' ', ['build/' + lang + '/index.html' for lang in languages])
                ]
            },
            cache: {
                invalidateWhen: {
                    outputChanges: [
                        'dist/**'
                    ]
                }
            },
            dependencies: ['build-website']
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
                'build-bundle'
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
                    './node_modules/.bin/parcel build/{{ vars.dev.lang }}/index.html'
                ]
            },
            dependencies: ['build-website']
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
                            '--pull', 
                            'never', 
                            '--force-recreate'
                        ]
                    }
                ]
            },
            dependencies: [
                'build-image'
            ]
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
                            'build',
                            'node_modules'
                        ]
                    }
                ]
            }
        }
    }
}