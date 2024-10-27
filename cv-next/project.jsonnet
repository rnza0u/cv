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
        build: {
            executor: 'std:commands',
            options: {
                commands: ['./node_modules/.bin/next build'],
            },
            cache: {
                invalidateWhen: {
                    outputChanges: ['.next/**']
                }
            },
            dependencies: ['install', 'source']
        },
        pdfs: {
            local pdfGenPort = '12001',
            local pidFile = 'pid.file',
            executor: 'std:commands',
            options: {
                commands: [
                    {
                        program: './node_modules/.bin/next',
                        arguments: [
                            'start',
                            '--hostname',
                            '127.0.0.1',
                            '--port',
                            pdfGenPort,
                            '&&',
                            'echo',
                            '-n',
                            '$!',
                            '>',
                            pidFile
                        ],
                        detach: true,
                        environment: {
                            RENDER_MODE: 'pdf',
                            NODE_ENV: 'production',
                            ORIGIN: 'http://127.0.0.1:' + pdfGenPort
                        }
                    },
                    {
                        program: './node_modules/.bin/ts-node',
                        arguments: ['scripts/export-pdf.mts'],
                        // onFailure: 'ForceExit'
                    },
                    {
                        program: 'kill',
                        arguments: [
                            '-SIGINT', 
                            '$(cat ' + pidFile +')'
                        ],
                        // onFailure: 'ForceExit'
                    },
                    {
                        program: 'rm',
                        arguments: [pidFile],
                        // onFailure: 'ForceExit'
                    }
                ],
                shell: true
            },
            dependencies: ['build']
        },
        serve: {
            local devPort = '12000',
            executor: 'std:commands',
            options: {
                commands: [
                    {
                        program: './node_modules/.bin/next',
                        arguments: ['dev', '--port', devPort, '--hostname', '127.0.0.1'],
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