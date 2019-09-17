const shell = require('shelljs')
const l = console.log

module.exports = {
  exec(query) {
    try {
      const { command } = query
      // console.log(command.split(''))
      // console.log(typeof command)
      shell.exec('cd ~/Desktop/company/wubaCunzhen')
      const a = shell.exec('cd ~/Desktop/company/wubaCunzhen && git status')
      // const a = shell.exec(command)
      return a + ""
    } catch (error) {
      
    }
  }
}