import React, { useEffect, useState, useCallback } from 'react'
import { useHistory } from 'react-router'
import { magic } from '../magic'
import Loading from './Loading'
import OpenAIAPI from 'react-openai-api'

export default function Profile(props) {
  const { highlightedText } = props
  const [userMetadata, setUserMetadata] = useState()
  const [userText, setUserText] = useState(highlightedText)
  const [shouldCallOpenAI, setShouldCallOpenAI] = useState(false)
  const [openAIResponse, setOpenAIResponse] = useState()
  const history = useHistory()

  useEffect(() => {
    // On mount, we check if a user is logged in.
    // If so, we'll retrieve the authenticated user's profile.
    magic.user.isLoggedIn().then((magicIsLoggedIn) => {
      if (magicIsLoggedIn) {
        magic.user.getMetadata().then(setUserMetadata)
      } else {
        // If no user is logged in, redirect to `/login`
        history.push('/login')
      }
    })
  }, [])

  /**
   * Perform logout action via Magic.
   */
  const logout = useCallback(() => {
    magic.user.logout().then(() => {
      history.push('/login')
    })
  }, [history])

  const handleChange = (e) => {
    setUserText(e.target.value)
  }

  const submit = () => {
    setShouldCallOpenAI(true)
  }

  return userMetadata ? (
    <div className="container">
      <h1>Current user: {userMetadata.email}</h1>
      <button onClick={logout}>Logout</button>
      <input type="text" value={userText} onChange={handleChange} />
      <button onClick={submit}>Submit</button>
    </div>
  ) : (
    <Loading />
  )
}
