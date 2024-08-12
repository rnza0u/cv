local Step = function(config){
    pull: 'always',
    image: 'registry.rnzaou.me/ci:latest',
} + config;

local ci = {
    kind: 'pipeline',
    type: 'docker',
    name: 'CI/CD pipeline',
    steps: [
        Step({
            name: 'publish',
            commands: [
                'blaze run ci:docker-authenticate',
                'blaze run cv:publish'
            ],
            volumes: [
                {
                    name: 'docker-socket',
                    path: '/var/run/docker.sock'
                }
            ]
        })
    ],
    trigger: {
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

[ci]