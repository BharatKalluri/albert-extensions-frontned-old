import React from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'


const octokit = require('@octokit/rest')()

export default class Ideas extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      ideasData: [],
      showLoading: false
    }
  }

  componentDidMount() {
    this.getRepos()
  }

  getRepos() {
    octokit.issues.getForRepo({
      owner: 'AlbertExtensions',
      repo: 'Ideas'
    }).then((response)=>{
        console.log(response['data'])
      this.setState({
        ideasData: response['data']
      })
    }).catch((err)=>{
      console.error(err)
    })
  }

  loadingLine = () => {
    if (this.state.showLoading) {
      return (
        <div className="progress">
            <div className="indeterminate"></div>
        </div>
      )
    } else {
      return(<div></div>)
    }
  }

  render() {

    return (
      <div>
        <Head title="Albert Extensions" />
        <Nav />

        <div>
          <this.loadingLine/>
          <h5 className="center-align">
            Ideas for new Albert extensions
          </h5>
          <p className="center-align">
            If you wish to add an Idea, create an issue in <Link href="https://github.com/AlbertExtensions/Ideas">this repo.</Link>
            Feel free to upvote ideas.
          </p>

          <div className="row container-fluid">
            {this.state.ideasData.map((item,i)=>(
                <div className="col s12 m6 l4">
                <div class="card card-small">
                  <div className="card-content">
                    <span class="card-title"><b>{item.title}</b></span>
                  </div>
                  <div className="card-action">
                    <Link href={item.html_url}>
                        <a className="waves-effect waves-light btn purple darken-1">Upvote</a>
                    </Link>
                  </div>
                </div>
                </div>
              ))}
          </div>
          
        </div>
      </div>
    )
  }
}
