import React from 'react'

export default function Page({params}: any) {
  return (
    <div>
      <h1>
        Profile
        {params.id}
      </h1>
    </div>
  )
}
