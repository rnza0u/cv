local Step = function(config){
    pull: 'always',
    image: 'registry.rnzaou.me/ci:latest',
} + config;

local publish = {
    kind: 'pipeline',
    type: 'docker',
    name: 'Publishing pipeline',
    steps: [
        Step({
            name: 'publish',
            commands: [
                'blaze run cv:publish',
                'blaze run cv:deploy'
            ],
            environment: {
                DOCKER_REGISTRY_USERNAME: {
                    from_secret: 'DOCKER_REGISTRY_USERNAME'
                },
                DOCKER_REGISTRY_PASSWORD: {
                    from_secret: 'DOCKER_REGISTRY_PASSWORD'
                }
            },
            volumes: [
                {
                    name: 'docker-socket',
                    path: '/var/run/docker.sock'
                }
            ]
        })
    ],
    trigger: {
        branch: ['master'],
        event: ['custom', 'push']
    },
    volumes: [
        {
            name: 'docker-socket',
            host: {
                path: '/run/user/1002/docker.sock',
            },
        }
    ],
    image_pull_secrets: ['DOCKER_REGISTRY_AUTHENTICATION_JSON'],
};

[publish]