{
    targets: {
        install: {
            executor: 'std:commands',
            options: {
                commands: ['npm install']
            },
            cache: {
                invalidateWhen: {
                    inputChanges: ['package.json'],
                    outputChanges: ['package-lock.json'],
                    filesMissing: ['node_modules']
                }
            }
        },
        source: {
            cache: {
                invalidateWhen: {
                    inputChanges: [
                        'src/**',
                        'app/**',
                        'public/**',
                        'next.config.ts',
                        'tsconfig.json',
                        'middleware.ts'
                    ]
                }
            }
        },
        'build-web-bundle': {
            executor: 'std:commands',
            options: {
                commands: ['./node_modules/.bin/next build'],
            },
            cache: {
                invalidateWhen: {
                    outputChanges: ['out/**', '.next/**']
                }
            },
            dependencies: ['install', 'source']
        },
        serve: {
            executor: 'std:commands',
            options: {
                commands: [
                    {
                        program: './node_modules/.bin/next',
                        arguments: ['dev', '--port', '12000', '--hostname', '127.0.0.1'],
                        environment: {
                            NODE_ENV: 'development'
                        }
                    }
                ],
            },
            dependencies: ['install', 'source']
        },
        clean: {
            executor: 'std:commands',
            options: {
                commands: [
                    'rm -rf node_modules .next next-env.d.ts out'
                ]
            }
        }
    }
}