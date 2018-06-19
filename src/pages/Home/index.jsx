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
    BaseService.get('http://192.168.0.159/light/toogle')
      .then(r => this.setState({checked: !!r.state}))
  }
  componentWillReceiveProps = n => {
    this.setState({checked: !!n.status})
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
