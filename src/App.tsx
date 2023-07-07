import DOMPurify from 'dompurify'
import './App.css'

interface Data {
  name: string
  location: string
  email: string
  gitHub: string
  linkedIn: string
  frontendSkills: string[]
  backendSkills: string[]
  otherSkills: string[]
}

function App() {
  // Keys to process for special formatting
  let processKeys: string[] = ['email', 'gitHub', 'linkedIn']

  // Regular expression pattern for matching JSON lines
  let jsonLineRegex: RegExp = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/gm

  // Regular expression pattern for validating email format
  let emailRegex: RegExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gm

  // Data object containing the JSON data
  let data: Data = {
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

  function jsonReplacer(
    match: string,
    indent: string,
    keyPart: string,
    valuePart: string,
    endPart: string
  ): string {
    // Extracted key without quotes or spaces
    let actualKey: string | null = null

    // HTML styles for key, value, and string
    let key: string = '<span class="json-key">'
    let value: string = '<span class="json-value">'
    let string: string = '<span class="json-string">'

    // Reconstructed line with indentation
    let result: string = indent || ''

    if (keyPart) {
      // Remove quotes and spaces from key
      actualKey = keyPart.replace(/[": ]/g, '')
      result = result + key + actualKey + '</span>: '
    }

    if (keyPart && valuePart && processKeys.indexOf(actualKey!) !== -1) {
      // Process the value for special formatting
      valuePart = processValue(actualKey!)
    }

    if (valuePart) {
      // Apply appropriate styling to the value
      result =
        result + (valuePart[0] == '"' ? string : value) + valuePart + '</span>'
    }

    return result + (endPart || '')
  }

  // Converts the JSON object to a pretty-printed string with HTML formatting
  function jsonPrettyPrint(obj: Data): string {
    return JSON.stringify(obj, null, 3)
      .replace(/&/g, '&amp;')
      .replace(/\\"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(jsonLineRegex, jsonReplacer)
  }

  // Processes a value based on the provided key
  function processValue(key: string): string {
    // @ts-ignore
    if (emailRegex.test(data[key])) {
      // Format email value as a mailto link
      return wrapWithQuotes(
        // @ts-ignore
        '<a href="mailto:' + data[key] + '">' + data[key] + '</a>'
      )
    } else {
      // Format other values as external links
      return wrapWithQuotes(
        '<a href="https://www.' +
          // @ts-ignore
          data[key] +
          '" target="_blank">' +
          // @ts-ignore
          data[key] +
          '</a>'
      )
    }
  }

  // Wraps a string with double quotes
  function wrapWithQuotes(str: string): string {
    return '"' + str + '"'
  }

  const safeInnerHTML = DOMPurify.sanitize(jsonPrettyPrint(data))

  return (
    <pre>
      <code
        dangerouslySetInnerHTML={{
          __html: safeInnerHTML,
        }}
      ></code>
    </pre>
  )
}

export default App
