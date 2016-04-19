var React = require('react');
var ReactDOM = require('react-dom');

var Blog = React.createClass({
  getInitialState: function(){
    return {data: []};
  },
  componentDidMount: function(){
    var self = this;
    $.ajax({
      method: "GET",
      url: "/posts"
    })
      .done(function(response) {
        self.setState({data: response});
      });
  },
  onFormSubmit: function(post){
    var dataTransform = this.state.data;
    dataTransform.push(post);
    this.setState({data: dataTransform});
  },
  render: function(){
    return (
      <div>
        <PostForm onFormSubmit={this.onFormSubmit} />
        <PostList data={this.state.data} />
      </div>
    );
  }
})

var PostForm = React.createClass({
  getInitialState: function(){
    return {title: "", content: ""};
  },
  titleChange: function(e){
    this.setState({title: e.target.value});
  },
  contentChange: function(e){
    this.setState({content: e.target.value});
  },
  onSubmit: function(e){
    e.preventDefault();
    var self = this;
    $.ajax({
      method: "POST",
      url: "/posts",
      data: this.state
    })
      .done(function(response) {
        self.props.onFormSubmit(response);
        self.setState({title: "", content: ""});
      });
  },
  render: function(){
    return (
      <div>
        <div className="well">
          <form onSubmit={ this.onSubmit }>
            Title:<br />
            <input value={ this.state.title } onChange={ this.titleChange } type="text" name="title" /><br />
            Content:<br />
            <input value={ this.state.content } onChange={ this.contentChange } type="text" name="content" /><br />
            <input type="submit" />
          </form>
        </div>
        <div className="well">
          <h2>Post Preview</h2>
          <h3>{ this.state.title }</h3>
          <h4>{ this.state.content }</h4>
        </div>
      </div>
    );
  }
});

var PostList = React.createClass({
  render: function(){
    var postsElements = this.props.data.map(function(post){
      return <Post key={ post._id } title={ post.title }>{ post.content }</Post>;
    });

    return (
      <div className="postList well">
        { postsElements.reverse() }
      </div>
    );
  }
});

var Post = React.createClass({
  render: function(){
    return <div><blockquote><h3>{ this.props.title }</h3>{ this.props.children }</blockquote></div>;
  }
});

ReactDOM.render(<Blog />, document.getElementById("content"));
