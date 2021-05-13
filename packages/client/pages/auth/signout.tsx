import Router from 'next/router'
import React, { useEffect } from 'react'
import useRequest from '../../lib/hooks/useRequest'

const signout = () => {
  const { doRequest } = useRequest({
      url: '/api/users/signout',
      method: 'POST',
      body: {},
      onSuccess: () => Router.push('/')
    });
  useEffect(() => {
    doRequest();
  }, [])

  return (
    <div>
      <h1>Signing you out...</h1>
    </div>
  )
}

export default signout
