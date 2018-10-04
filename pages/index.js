import React from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'


const octokit = require('@octokit/rest')()

const excluded_repos = ["Ideas"]

export default class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      repoData: [],
      showLoading: false
    }
  }

  componentDidMount() {
    this.getRepos()
  }

  getRepos() {
    octokit.repos.getForOrg({
      org: 'AlbertExtensions',
      type: 'public'
    }).then((response)=>{
      this.setState({
        repoData: response['data']
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
            A hub for Albert extensions
          </h5>

          <div className="row container">
            {this.state.repoData.filter((item)=>{
              if (!excluded_repos.includes(item.name)) {return item}
                }).map((item,i)=>(
                <div className="col s12 m4">
                <div class="card card-small purple">
                  <div className="card-content white-text">
                    <span class="card-title">{item.name}</span>
                    <p>{item.description}</p>
                  </div>
                  <div className="card-action">
                    <Link href={`/repo?name=${item.full_name}`}>Install</Link>
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
