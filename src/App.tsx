import './App.css'

function App() {
  // Keys to process for special formatting
  let processKeys = ['email', 'gitHub', 'linkedIn']

  // Regular expression pattern for matching JSON lines
  let jsonLineRegex = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/gm

  // Regular expression pattern for validating email format
  let emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gm

  // Data object containing the JSON data
  let data = {
    name: 'Benn King',
    location: 'Surrey, UK',
    email: 'bennkingy@gmail.com',
    gitHub: 'github.com/bennkingy',
    linkedIn: 'linkedin.com/in/bennking',
    frontendSkills: [
      'HTML',
      'CSS',
      'SASS',
      'JavaScript',
      'TypeScript',
      'React',
      'React Native',
      'Vue',
    ],
    backendSkills: ['Node.JS', 'Express', 'MongoDB', 'PHP', 'MySQL'],
    otherSkills: ['Git', 'WordPress', 'SPFX'],
  }

  function jsonReplacer(match, indent, keyPart, valuePart, endPart) {
    // Extracted key without quotes or spaces
    let actualKey = null

    // HTML styles for key, value, and string
    let key = '<span class="json-key">'
    let value = '<span class="json-value">'
    let string = '<span class="json-string">'

    // Reconstructed line with indentation
    let result = indent || ''

    if (keyPart) {
      // Remove quotes and spaces from key
      actualKey = keyPart.replace(/[": ]/g, '')
      result = result + key + actualKey + '</span>: '
    }

    if (keyPart && valuePart && processKeys.indexOf(actualKey) !== -1) {
      // Process the value for special formatting
      valuePart = processValue(actualKey)
    }

    if (valuePart) {
      // Apply appropriate styling to the value
      result =
        result + (valuePart[0] == '"' ? string : value) + valuePart + '</span>'
    }

    return result + (endPart || '')
  }

  // Converts the JSON object to a pretty-printed string with HTML formatting
  function jsonPrettyPrint(obj) {
    return JSON.stringify(obj, null, 3)
      .replace(/&/g, '&amp;')
      .replace(/\\"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(jsonLineRegex, jsonReplacer)
  }

  // Processes a value based on the provided key
  function processValue(key) {
    if (emailRegex.test(data[key])) {
      // Format email value as a mailto link
      return wrapWithQuotes(
        '<a href="mailto:' + data[key] + '">' + data[key] + '</a>'
      )
    } else {
      // Format other values as external links
      return wrapWithQuotes(
        '<a href="https://www.' +
          data[key] +
          '" target="_blank">' +
          data[key] +
          '</a>'
      )
    }
  }

  // Wraps a string with double quotes
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
