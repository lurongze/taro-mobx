
function withLogin() {

  return function demoComponent(Component) {

    class WithLogin extends Component {

      constructor(props) {
        super(props)
      }

      async componentWillMount() {
        console.log('WithLogin-componentWillMount', this.props)

        this.props.commonStore.login()
        // fixme 这里会触发两次的，暂时去掉吧
        // super.componentDidMount()
      }
    }

    return WithLogin
  }
}



export default withLogin;
