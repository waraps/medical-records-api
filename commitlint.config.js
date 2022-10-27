module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'body-leading-blank': [
            2,
            'never'
        ],
        'subject-empty': [
            2,
            'never'
        ],
        'subject-case': [
            2,
            'never',
            ['start-case', 'pascal-case', 'upper-case']
        ],
        'type-enum': [
            1,
            'always',
            [
                'build',
                'release',
                'chore',
                'feat',
                'fix',
                'refactor',
                'revert',
                'test',
                'CodeFactor'
            ]
        ]
    }
};