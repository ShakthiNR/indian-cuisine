import { Spinner, SpinnerSize } from '@fluentui/react'
import React from 'react'

const Loader = () => {
  return (
    <div>
      <Spinner  size={SpinnerSize.medium} label='Please wait...'></Spinner> 
    </div>
  )
}

export default Loader