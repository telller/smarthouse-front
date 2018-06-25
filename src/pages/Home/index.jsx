import { Spin, Switch, Col, Row, Slider } from 'antd'
import LightService from 'services/light.service.js'
import { getLightStatus } from 'store/light/actions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import './index.styl'

class Home extends React.Component {
  static propTypes = {
    isFetchingStatus: PropTypes.bool,
    dispatch: PropTypes.func
  }
  state = {
    yellow: 0,
    white: 0
  }
  componentWillMount = () => this.props.dispatch(getLightStatus())
  componentWillReceiveProps = n => this.setState({white: n.lightStatus.white, yellow: n.lightStatus.yellow})
  toogleLed = async () => {
    const { white, yellow } = this.state
    const body = { white, yellow }
    const req = await LightService.toogleLed(body)
    req && this.setState({white: req.white, yellow: req.yellow})
  }
  render () {
    const { white, yellow } = this.state
    return (
      <div id='home'>
        <Spin className='home' spinning={this.props.isFetchingStatus}>
          <div style={{padding: '10px 30px'}}>
            <Row>
              <Col span={12}>
                <Slider min={0} max={255} value={white}
                  onChange={white => this.setState({white}, () => this.toogleLed())} />
              </Col>
              <Col span={4}>
                <Switch checked={!!white}
                  onChange={() => this.setState({white: white ? 0 : 255}, () => this.toogleLed())} />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Slider min={0} max={255} value={yellow}
                  onChange={yellow => this.setState({yellow}, () => this.toogleLed())} />
              </Col>
              <Col span={4}>
                <Switch checked={!!yellow}
                  onChange={() => this.setState({yellow: yellow ? 0 : 255}, () => this.toogleLed())} />
              </Col>
            </Row>
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
