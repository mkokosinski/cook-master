const ghpages = require('gh-pages')

// replace with your repo url
ghpages.publish(
  'public',
  {
    branch: 'gatsby',
    repo: 'https://github.com/mkokosinski/cook-master.git',
  },
  () => {
    console.log('Deploy Complete!')
  }
)