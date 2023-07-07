import JSONPretty from 'react-json-pretty'
import './App.css'

function App() {
  var data = {
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
    projects: [
      // {
      //   name: 'Air BNB',
      //   value: 'https://airbnb-clone-1a0d9.web.app/',
      // },
    ],
  }

  return <JSONPretty id="json-pretty" data={data}></JSONPretty>
}

export default App
