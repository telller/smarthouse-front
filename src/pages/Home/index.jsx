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
    checked: false
  }
  onChange = async () => {
    const req = await LightService.toogleLed()
    req && this.setState({checked: !!req.state})
  }
  componentWillReceiveProps = n => {
    this.setState({checked: !!n.status.state})
  }
  render () {
    return (
      <Spin indicator={<Icon type='loading' style={{ fontSize: 50 }} spin />} spinning={this.props.loading}>
        <div style={{padding: '10px 30px'}}>
          LED: <Switch onChange={this.onChange} checked={this.state.checked} />
        </div>
      </Spin>
    )
  }
}
const mapStateToProps = state => ({ ...state.app })
export default connect(mapStateToProps)(Home)
