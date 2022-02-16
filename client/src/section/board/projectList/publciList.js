import React, { useEffect, useState } from 'react'
import { v4 } from 'uuid'
import axios from 'axios'

import './postCard.css'

const PublicList = () => {
  const [publicList, setPublicList] = useState([{}])

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API__URL + '/projects')
      .then(({ data }) => {
        setPublicList(data.list)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return (
    <>
      <div id="post-card-wrapper">
        {publicList.map((post) => {
          return (
            <div key={v4()} className="post-card">
              <h3>{post.title}</h3>
              <div>{`참여인원 ${post.confirmed}/ 4`}</div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default PublicList
