import { Tooltip, notification, Button, Modal } from 'antd'
import React from 'react'

import './showError.styl'

function showError (err, aditionalMessage) {
  let action
  let title
  const btn = (
    <Button type='primary' size='small' onClick={() => { notification.destroy(); readMore() }} >
      Read More
    </Button>
  )
  function readMore () {
    return Modal.error({
      title: err.isMultiple && err.messages.length > 1 ? title || 'MULTIPLE ERRORS' : title || 'ERROR',
      width: 750,
      content: err.isMultiple && err.messages.length > 1 ? err.messages.map((errorMsg, i) => {
        const mainErrorMsg = errorMsg.split('code:')[1]
        const childErrorMsg = errorMsg.split('code:').slice(2)
        return (
          <div key={i}>
            <div className='mainErrorMsg'>
              <span className='num'>{i + 1}. </span>
                #{mainErrorMsg}
            </div>
            <ul>
              {childErrorMsg && childErrorMsg.map((msg, i) => <li key={i}>#{msg}</li>)}
            </ul>
          </div>
        )
      }) : (err && err.message) || aditionalMessage
    })
  }

  if (err) {
    if (err.isWarning) {
      action = 'warning'
    } else if (err.isInfo) {
      action = 'info'
    } else {
      action = 'error'
    }
    title = err.title
  }

  if (err === 'User login is required') {
    notification.info({
      message: 'Token expired',
      description: 'Auth token is expired, redirecting to login page...',
      duration: 8
    })
    return
  }

  if (err === 'Please wait for refreshing token' || err.message === 'Please wait for refreshing token') {
    notification.info({
      message: 'Refreshing token',
      description: 'Please wait for refreshing token...',
      duration: 8
    })
    return
  }

  if (err && err.toString && err.toString().indexOf('Security Service error: User with id') > -1) {
    if (window.location.pathname !== '/error/user-not-found') window.location = '/error/user-not-found?msg=' + err
    return
  }
  if (err.isMultiple && err.messages.length > 1) {
    // err.messages.map(errorMsg => {
    //   console.log('errorMsg:', errorMsg)
    //   notification[action || 'warning']({
    //     message: title || 'MULTIPLE ERRORS',
    //     description: errorMsg,
    //     duration: 10
    //   })
    // })
    notification[action || 'warning']({
      message: title || 'MULTIPLE ERRORS',
      description: err.messages.map((errorMsg, i) => {
        const mainErrorMsg = errorMsg.split('code:')[1]
        const childErrorMsg = errorMsg.split('code:').slice(2)
        return (
          <div key={i} className='Notifications'>
            <div className='mainErrorMsg'>
              <span className='num'>{i + 1}. </span>
              <Tooltip
                placement='left'
                title={`code ${mainErrorMsg}`}
                overlayClassName='tooltip'>
                #{mainErrorMsg.substring(0, Math.min(mainErrorMsg.length, 70)) + (mainErrorMsg.length > 70 ? '...' : '')}
              </Tooltip>
            </div>
            <ul>
              {childErrorMsg && childErrorMsg.map((msg, i) => <Tooltip placement='left' key={i} title={msg}><li>#{msg}</li></Tooltip>)}
            </ul>
          </div>
        )
      }),
      btn,
      duration: 10
    })
  } else {
    notification[action || 'warning']({
      message: title || 'Error',
      description: (err && err.message) || aditionalMessage,
      btn,
      duration: 10
    })
  }
}

export default showError
