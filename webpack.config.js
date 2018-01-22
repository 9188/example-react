
const script = process.env.npm_lifecycle_event;
const env = {'start': 'dev', 'build': 'produce'}[script] || 'dev'

module.exports = function() {
  return require(`./script/${env}.js`)
}
