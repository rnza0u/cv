local image = 'registry.rnzaou.me/cv';

{
    targets: {
        install: {
            description: 'Install dependencies',
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
                    {
                        program: 'npm',
                        arguments: ['install']
                    }
                ]
            }
        },
        'build-bundle': {
            executor: 'std:commands',
            description: 'Build the website files for production.',
            options: {
                commands: [
                    {
                        program: 'npm',
                        arguments: ['run', 'build']
                    }
                ]
            },
            cache: {
                invalidateWhen: {
                    inputChanges: [
                        'src/**'
                    ],
                    outputChanges: [
                        'dist/**'
                    ]
                }
            },
            dependencies: ['install']
        },
        'build-image': {
            executor: 'std:commands',
            description: 'Build the Docker image',
            options: {
                commands: [
                    {
                        program: 'docker',
                        arguments: [
                            'build',
                            '-t',
                            image,
                            '.'
                        ]
                    }
                ]
            },
            cache: {
                invalidateWhen: {
                    inputChanges: ['Dockerfile']
                }
            },
            dependencies: [
                'build-bundle'
            ]
        },
        publish: {
            executor: 'std:commands',
            options: {
                commands: [
                    {
                        program: 'docker',
                        arguments: [
                            'push',
                            image
                        ]
                    }
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
                    {
                        program: './node_modules/.bin/parcel'
                    }
                ]
            },
            dependencies: ['install']
        },
        'serve-compose': {
            executor: 'std:commands',
            description: 'Build for production and serve locally (for testing purpose only).',
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
                            'node_modules'
                        ]
                    }
                ]
            }
        }
    }
}