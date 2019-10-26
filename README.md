# React Hooks Notes

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Will's notes on React hooks

JavaScript array descructuring.
eg

```
const myColors = ['red', 'green']

destructured and assigned to new variables:
const [myColorThree, myColorFour] = colors

// console.log(myColorThree) = 'red'
// console.log(myColorFour) = 'green'
```

## useState
- useState -> Allow a functional component to use component-level state.

```
const [ currentValue, setValue ] = useState( initialValue )
```
__currentValue__ === the value of the piece of state.

__setValue__ === function to call when we want to update our state & render.

__useState__ === React function

__initialValue__ === to setting the state initial value in the class constructor


## useEffect
- useEffect -> Allow a functional component to use lifecycle methods.
combination of the __componentDidMount__ and the __componentDidUpdate__ lifecycle methods

```
useEffect(() => {}, [])
```
useEffect is provided by React.
The first argument is the function that runs if the second argumnet has changed.

eg:
```
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ResourceList = ({ resource }) => {
  const [ resources, setResources ] = useState([])

  const fetchResource = async (resource) => {
    const resp = await axios.get(
      `https://jsonplaceholder.typicode.com/${resource}`
    )
    
    setResources(resp.data)
  }

  useEffect(() => {
    fetchResource(resource)
  }, [ resource ])

  return (
    <div>{resources.length}</div>
  )
}

export default ResourceList
```

__explaination__ fetchResource in the useEffect function gets called whenever the resource state changes.

|  function at first Render | function at second render | is the function provided to useEffect called on rerender? |
| ------------- |:-------------:| ---- |
| useEffect(() => {})  | useEffect(() => {}) | Called, nothing to compare to so always run |
| useEffect(() => {}, []) | useEffect(() => {}, []) | Not Called ```// [] === [])```, run on first render only|
| useEffect(() => {}, [1] | useEffect(() => {}, [1]) | Not Called ```// [1] === [1]```|
| useEffect(() => {}. ['hi]) | useEffect(() => {}, [1]) | Called ``` // ['hi'] !== [1]``` |
| useEffect(() => {}, [{color: 'red'}]) | useEffect(() => {}, [{color: 'red'}]) | Called ```// {color: 'red'} !== {color: 'red'}``` different objects in memory |
| useEffect(() => {}, [10, 10]) | useEffect(() => {}, [10, 10]) | Not Called ```// [10, 10] === [10, 10]``` |
| useEffect(() => {}, [10, 10]) | useEffect(() => {}, [10]) | Called ```// [10, 10] !== [10]``` |

useEffect first argument function cannot take an async function or a promise. This is why in the resource example above we have the fetchResource function handling the async api call. The other workaround is to use the syntax for an immediatly invoked function. e.g.

```
(() => {
  // defining the function
  })
  ( // this is the invocation)
```

```
  useEffect (
    () => {
      (async resource => {
        const resp = await axios.get(`https://jsonplaceholder.typicode.com/${resource}`)

        setResources(resp.data)
      })(resource)
    },
    [ resource ]
  )
```

- useContext -> Allow a functional component to use the context system.

- useRef -> Allow a functional component to use the ref system.

- useReducer -> Allow a functional component to store data through a 'reducer'.