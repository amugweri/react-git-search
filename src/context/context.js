import React, { useState, useEffect } from 'react'
import mockUser from './mockData.js/mockUser'
import mockRepos from './mockData.js/mockRepos'
import mockFollowers from './mockData.js/mockFollowers'
import axios from 'axios'

const rootUrl = 'https://api.github.com'

const GithubContext = React.createContext()

// const [githubUser, setGithubUSer]=useState(mockUser);

//
// dev-cb2m4iuk.us.auth0.com
// dev-cb2m4iuk.us.auth0.com

// AsKKcYhm9CnfpRnSaQaKFrCB2mIoeUgP

const GithubProvider = ({ children }) => {
  // const [requests, setRequests]=useState(0);
  const [githubUser, setGithubUSer] = useState(mockUser)
  const [repos, setRepos] = useState(mockRepos)
  const [followers, setFollowers] = useState(mockFollowers)
  const [requests, setRequests] = useState(0)
  const [isLoading, setisLoading] = useState(false)
  const [error, setError] = useState('')
  const [user, setUser] = useState('')
  ///
  const searchGithubUser = async (user) => {
    toggleError()
    // console.log(user  );
    // let xlink=`${rootUrl}/users/${user}`
    // console.log(xlink);
    setisLoading(true)
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err),
    )
    // console.log(response)
    if (response) {
      // https://api.github.com/users/bradtraversy/repos
      //https://api.github.com/users/bradtraversy/followers

      setGithubUSer(response.data)
      const { login, followers_url } = response.data
      //repos
      axios(`${rootUrl}/users/${login}/repos?per_page=100`).then((response) =>
        setRepos(response.data),
      )
      //      console.log(response);
      // followers
      axios(
        `${rootUrl}/users/${login}/followers?per_page=100`,
      ).then((response) => setFollowers(response.data))
    } else {
      toggleError(true, 'there is no user with that name')
    }
    checkRequests()
    setisLoading(false)
  }
  //

  function toggleError(show, msg) {
    setError({ show, msg })
  }

  const checkRequests = () => {
    axios('https://api.github.com/rate_limit')
      .then((data) => {
        let {
          rate: { remaining },
        } = data.data

        // console.log(remaining)

        setRequests(remaining)

        if (remaining == 0) {
          console.log(' t=0')
          toggleError(true, 'You have exceeded your hourly limit')
        }
        // console.l2og(data);
      })
      .catch((err) => {
        console.log(console.log(err))
      })
  }
  useEffect(() => {
    checkRequests()
    //  console.log("App loaded");
  }, [])

  // console.log();
  return (
    <GithubContext.Provider
      value={{
        repos,
        followers,
        githubUser,
        requests,
        error,
        user,
        isLoading,
        searchGithubUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}
export { GithubContext, GithubProvider }
