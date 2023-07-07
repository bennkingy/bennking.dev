import './App.css'

function App() {
  let PROCESSKEYS = ['email', 'gitHub', 'linkedIn']
  let JSON_LINE_REGEX = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/gm
  let EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gm

  let data = {
    name: 'Benn King',
    location: 'Surrey, UK',
    email: `bennkingy@gmail.com`,
    gitHub: 'github.com/bennkingy',
    linkedIn: 'linkedin.com/in/bennking',
    frontendSkills: [
      'HTML',
      'CSS',
      'SASS',
      'JavaScript',
      'TypeScript',
      'React',
      'Vue',
    ],
    backendSkills: ['Node.JS', 'Express', 'MongoDB', 'PHP', 'MySQL'],
    otherSkills: ['Git', 'WordPress', 'SPFX'],
  }

  function jsonReplacer(match, pIndent, pKey, pVal, pEnd) {
    let actualKey = null
    let key = '<span class="json-key">'
    let val = '<span class="json-value">'
    let str = '<span class="json-string">'
    let r = pIndent || ''

    if (pKey) {
      actualKey = pKey.replace(/[": ]/g, '')
      r = r + key + actualKey + '</span>: '
    }
    if (pKey && pVal && PROCESSKEYS.indexOf(actualKey) !== -1) {
      pVal = processValue(actualKey)
    }
    if (pVal) {
      r = r + (pVal[0] == '"' ? str : val) + pVal + '</span>'
    }

    return r + (pEnd || '')
  }

  function jsonPrettyPrint(obj) {
    return JSON.stringify(obj, null, 3)
      .replace(/&/g, '&amp;')
      .replace(/\\"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(JSON_LINE_REGEX, jsonReplacer)
  }

  function processValue(key) {
    if (EMAIL_REGEX.test(data[key])) {
      return wrapWithQuotes(
        '<a href="mailto:' + data[key] + '">' + data[key] + '</a>'
      )
    } else {
      return wrapWithQuotes(
        '<a href="https://www.' +
          data[key] +
          '" target="_blank">' +
          data[key] +
          '</a>'
      )
    }
  }

  function wrapWithQuotes(str) {
    return '"' + str + '"'
  }

  return (
    <pre>
      <code
        dangerouslySetInnerHTML={{
          __html: jsonPrettyPrint(data),
        }}
      ></code>
    </pre>
  )
}

export default App
