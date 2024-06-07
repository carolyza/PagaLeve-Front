const rules = [
    {release: 'minor', title: 'New features', type: '{f,F}eat'},
    {release: 'minor', title: 'New features', type: '{f,F}eature'},
    {release: 'patch', title: 'Bug fixes', type: '{f,F}ix'},
    {release: 'patch', title: 'Code changes', type: '{r,R}efactor'},
    {release: 'patch', title: 'Other chores', type: '{c,C}hore'},
    {release: 'patch', title: 'Documentation changes', type: '{d,D}ocs'},
  ]
  
  // Simple mapping to order the commit groups
  const sortMap = Object.fromEntries(rules.map((rule, index) => [rule.title, index]))
  
  module.exports = {
    branches: ['main'],
    plugins: [
      [
        '@semantic-release/commit-analyzer',
        {
          preset: 'conventionalcommits',
          releaseRules: [
            {release: 'patch', revert: true},
            {breaking: true, release: 'major'},
          ].concat(
            rules.map(({breaking, release, type}) => ({
              breaking,
              release,
              type,
            }))
          ),
        },
      ],
      [
        '@semantic-release/release-notes-generator',
        {
          preset: 'conventionalcommits',
          writerOpts: {
            commitGroupsSort: (a, z) => sortMap[a.title] - sortMap[z.title],
          },
        },
      ],
      '@semantic-release/changelog',
      ['@semantic-release/npm', {npmPublish: false}],
      '@semantic-release/github',
    ],
  }
  