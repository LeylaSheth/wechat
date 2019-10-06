import React,{Component,Fragment} from "react";
class Issue extends Component {
    constructor(props){//构造函数最优先执行
        super(props);//父类的构造函数，调用方法
        this.state={//组件的状态，用来存储一些数据
            inputValue:'',//input框里的内容,由这个来决定，数据变化，页面自动就响应的变化了
            list:[]//列表中的每一项
        }
    }

    handleInputChange(event){//传入事件对象
        this.setState({//改变数据的方法,改变里面的状态
            inputValue:event.target.value//获取到输入的内容，并且把数据的内容改变
        });
    }

    handleBtnClick(){
        if(this.state.inputValue!==''){
            this.setState({//将输入的内容推进到list然后显示，同时重置inputValue的值
                list:[...this.state.list,this.state.inputValue],
                inputValue:''
            })
        }
    }

    handleItemDelete(index){//通过bind的传递接收到了index
        //immutable  state不允许做怎么改变，不要直接修改，性能优化有问题
        const list=this.state.list;
        list.splice(index,1);
        this.setState({list})
    }

    render() {
        return(
            <Fragment>
                <div>
                    <label htmlFor='input'>INPUT</label>
                    <input
                        id='input'
                        className='input'
                        value={this.state.inputValue}
                        onChange={this.handleInputChange.bind(this)}
                        //ref={(input)=>{this.input=input}}//引用指向DOM
                    />
                    <button onClick={this.handleBtnClick.bind(this)}>Submit</button>
                </div>
            </Fragment>
        )
    }
}
export default Issue;