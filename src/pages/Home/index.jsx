import LightService from 'services/light.service.js'
import { getLightStatus } from 'store/light/actions'
import { connect } from 'react-redux'
import { Spin, Switch } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import './index.styl'

class Home extends React.Component {
  static propTypes = {
    isFetchingStatus: PropTypes.bool,
    dispatch: PropTypes.func
  }
  state = {
    white: false,
    yellow: false
  }
  componentWillMount = () => this.props.dispatch(getLightStatus())
  componentWillReceiveProps = n => this.setState({white: !!n.lightStatus.white, yellow: !!n.lightStatus.yellow})
  handleWhite = async () => {
    const body = {
      white: !this.state.white,
      yellow: this.state.yellow
    }
    const req = await LightService.toogleLed(body)
    req && this.setState({white: !!req.white, yellow: !!req.yellow})
  }
  handleYellow = async () => {
    const body = {
      white: this.state.white,
      yellow: !this.state.yellow
    }
    const req = await LightService.toogleLed(body)
    req && this.setState({white: !!req.white, yellow: !!req.yellow})
  }
  render () {
    return (
      <div id='home'>
        <Spin className='home' spinning={this.props.isFetchingStatus}>
          <div style={{padding: '10px 30px'}}>
            Whitess: <Switch onChange={this.handleWhite} checked={this.state.white} />
            Yellow: <Switch onChange={this.handleYellow} checked={this.state.yellow} />
          </div>
        </Spin>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  isFetchingStatus: state.light.isFetchingStatus,
  lightStatus: state.light.lightStatus
})
export default connect(mapStateToProps)(Home)
