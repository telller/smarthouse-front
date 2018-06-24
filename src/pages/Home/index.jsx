import LightService from 'services/light.service.js'
import { Spin, Icon, Switch } from 'antd'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import './index.styl'

class Home extends React.Component {
  static propTypes = {
    loading: PropTypes.bool
  }
  state = {
    white: 0,
    yellow: 0
  }
  handleWhite = async () => {
    const body = {
      white: !this.state.white,
      yellow: this.state.yellow
    }
    const req = await LightService.toogleLed(body)
    req && this.setState({white: req.white, yellow: req.yellow})
  }
  handleYellow = async () => {
    const body = {
      white: this.state.white,
      yellow: !this.state.yellow
    }
    const req = await LightService.toogleLed(body)
    req && this.setState({white: req.white, yellow: req.yellow})
  }
  componentWillReceiveProps = n => {
    this.setState({white: n.status.white, yellow: n.status.yellow})
  }
  render () {
    return (
      <Spin indicator={<Icon type='loading' style={{ fontSize: 50 }} spin />} spinning={this.props.loading}>
        <div style={{padding: '10px 30px'}}>
          White: <Switch onChange={this.handleWhite} checked={this.state.white} />
          Yellow: <Switch onChange={this.handleYellow} checked={this.state.yellow} />
        </div>
      </Spin>
    )
  }
}
const mapStateToProps = state => ({ ...state.app })
export default connect(mapStateToProps)(Home)
