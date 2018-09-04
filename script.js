
  // App component

  class App extends React.Component {
    constructor() {
      super();
      this.state = {
        searchText: '',
        users: []
      };
    }
  
    onChangeHandle(event) {
      this.setState({searchText: event.target.value});
    }
  
    onSubmit(event) {
      event.preventDefault();
      const {searchText} = this.state;
      const url = `https://api.github.com/search/users?q=${searchText}`;
      fetch(url)
        .then(response => response.json())
        .then(responseJson => this.setState({users: responseJson.items}));
    }
  
    render() {
      return (
        <div>
          <div className="logo">
            <img src="https://dwa5x7aod66zk.cloudfront.net/assets/pack/logo-github-fe55a081ff239877f791f5882f9c3cddc371653c88d9b06f504ea10f453996ed.jpg" />
          </div>
          <div className="container">
            <form onSubmit={event => this.onSubmit(event)}>
              <label htmlFor="searchText">Search by user name: </label>
                <input
                  type="text"
                  id="searchText"
                  onChange={event => this.onChangeHandle(event)}
                  value={this.state.searchText} />
            </form>
          </div> 
          <UsersList users={this.state.users}/>
        </div>
      );
    }
  }

// List component

  class UsersList extends React.Component {
    get users() {
      return this.props.users.map(user => <User key={user.id} user={user}/>);
    }
  
    render() {
      return (
        <div className="box">
          {this.users}
        </div>
      );
    }
  }

// User component

  class User extends React.Component {
    render() {
      return (
        <div className="user">
          <img src={this.props.user.avatar_url} style={{maxWidth: '150px'}}/>
          <a href={this.props.user.html_url} target="_blank">{this.props.user.login}</a>
        </div>
      );
    }
  }

  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );