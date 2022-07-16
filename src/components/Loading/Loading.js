import React from 'react';
import loadingGif from '../../assets/loadingGif.gif';
import "./loading.css"

function Loading() {
  return (
    <div>
        <img className='loadingGif' src={loadingGif} alt="Loading" />
    </div>
  )
}

export default Loading