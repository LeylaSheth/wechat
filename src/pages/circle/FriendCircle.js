import React, {Component, Fragment} from "react";
import './friendcircle.css'
import {Link} from "react-router-dom";
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

class FriendCircle extends Component {
  constructor(props) {//构造函数最优先执行
    super(props);//父类的构造函数，调用方法
    this.state = {//组件的状态，用来存储一些数据
      inputValue: '',//input框里的内容,由这个来决定，数据变化，页面自动就响应的变化了
      list: []//列表中的每一项
    }
  }

  handleInputChange(event) {//传入事件对象
    this.setState({//改变数据的方法,改变里面的状态
      inputValue: event.target.value//获取到输入的内容，并且把数据的内容改变
    });
  }

  handleBtnClick() {
    if (this.state.inputValue !== '') {
      this.setState({//将输入的内容推进到list然后显示，同时重置inputValue的值
        list: [...this.state.list, this.state.inputValue],
        inputValue: ''
      })
    }
  }

  handleItemDelete(index) {//通过bind的传递接收到了index
    //immutable  state不允许做怎么改变，不要直接修改，性能优化有问题
    const list = this.state.list;
    list.splice(index, 1);
    this.setState({list})
  }

  render() {
    const {loginStatus}=this.props;
    if(loginStatus){
      return (
        <Fragment>
          <header className='circle-header'>
            <Link to="/home" className='img-back'></Link>
            <div className='img-edi'>
              <div className="dropdown-content">
                            <textarea className='issue'
                                      id='input'
                                      value={this.state.inputValue}
                                      onChange={this.handleInputChange.bind(this)} >
                            </textarea>
                <button className='submit' onClick={this.handleBtnClick.bind(this)}>Submit</button>
              </div>
            </div>
          </header>
          <div className='head-bg'>
            <div className="container1">
              <span className="pillar"></span>
              <span className="pillar"></span>
              <span className="pillar"></span>
              <span className="pillar"></span>
              <span className="pillar"></span>
            </div>
            <div className="container-bg">
              <div>W</div>
              <div>E</div>
              <div>L</div>
              <div>C</div>
              <div>O</div>
              <div>M</div>
              <div>E</div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className='icon-img'></div>
            <div className='my-name'>AfterWeb</div>
          </div>
          <div className='issue-content'>
            <div id='my-icon'></div>
            <div id='issue-content'>
              <div id='name'>AfterWeb</div>
              <div>长白山的天池真好看</div>
              <div id='photo'></div>
              <span id='delete1'>删除</span>
            </div>

          </div>
          <div>
            {//一个js表达式,循环输出list数组里的内容,一个回调函数接受内容和下标
              this.state.list.map((item, index) => {
                return (
                  <div className='issue-content' key={index}>
                    <div id='my-icon'></div>
                    <div id='issue-content'>
                      <div id='name'>AfterWeb</div>
                      <div> {item}</div>
                      <span id='delete' onClick={this.handleItemDelete.bind(this, index)}>删除</span>
                    </div>
                  </div>)
              })
            }
          </div>
        </Fragment>
      )
    }else{
      return <Redirect to='/'/>
    }
  }
}
const mapState = (state) => ({
  loginStatus: state.getIn(['login', 'login'])
});

export default connect(mapState, null)(FriendCircle);
