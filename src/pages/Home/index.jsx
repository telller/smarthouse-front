import { Spin, Icon, Switch } from 'antd'
import BaseService from 'base-service'
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
  onChange = () => {
    BaseService.get('http://192.168.0.159/toggle').then(r =>
      r && this.setState({checked: !this.state.checked}))
  }
  render () {
    return (
      <Spin indicator={<Icon type='loading' style={{ fontSize: 50 }} spin />} spinning={this.props.loading}>
        <Switch onChange={this.onChange} checked={this.state.checked} />
      </Spin>
    )
  }
}
const mapStateToProps = state => ({ ...state.app })
export default connect(mapStateToProps)(Home)
