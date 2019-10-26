import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ResourceList = ({ resource }) => {
  const [ resources, setResources ] = useState([])

  // const fetchResource = async (resource) => {
  //   const resp = await axios.get(
  //     `https://jsonplaceholder.typicode.com/${resource}`
  //   )
    
  //   setResources(resp.data)
  // }

  // useEffect(() => {
  //   fetchResource(resource)
  // }, [ resource ])

  // rewritten in the self invoking function syntax
  useEffect (
    () => {
      (async resource => {
        const resp = await axios.get(`https://jsonplaceholder.typicode.com/${resource}`)

        setResources(resp.data)
      })(resource)
    },
    [ resource ]
  )

  return (
    <ul>{resources.map(record => (<li key={record.id}>{record.title}</li>))}</ul>
  )
}

export default ResourceList
