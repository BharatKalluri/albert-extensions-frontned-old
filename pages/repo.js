import React from 'react'
import Head from '../components/head'
import Nav from '../components/nav'
import {withRouter} from 'next/router'

import Link from 'next/link'

const ReactMarkdown = require('react-markdown')

const octokit = require('@octokit/rest')()

class Repo extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      repoData: {},
      readmeData: "",
      showLoading: true
    }
  }

  componentDidMount() {
    this.getRepoData()
    this.getReadme()
  }

  getRepoData() {
    if (this.props.router.query.name!=null) {
        let repoName = this.props.router.query.name.split("/")
        octokit.repos.get({
            owner: repoName[0],
            repo: repoName[1]
        }).then((response)=>{
            this.setState({
                repoData: response['data']
            })
        }).catch((err)=>{
            console.error(err)
        })
    }
  }

  getReadme() {
    if (this.props.router.query.name!=null) {
        let repoName = this.props.router.query.name.split("/")
        octokit.repos.getReadme({
            owner: repoName[0],
            repo: repoName[1]
        }).then((response)=>{
            this.setState({
                readmeData: atob(response['data']['content']),
                showLoading: false
            })
        }).catch((err)=>{
            console.error(err)
        })
    }
  }

  getLinkTarget = url => {
    if (this.props.router.query.name!=null) {
        let repoName = this.props.router.query.name.split("/")
        let fileName = url.split("/")
        if (fileName.length > 2) {
            return url
        }
        return "https://raw.githubusercontent.com/"+this.props.router.query.name+"/master/"+url
    }
  }

  imageRenderer = props => {
    return <img
              src={props.src}
              alt={props.alt}
              style={{
                width:"100%"
              }}
            />
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
    let repoData = this.state.repoData

    return (
      <div>
        <Head title="Albert Extensions" />
        <Nav />

        <div className="container">
          <this.loadingLine/>
          <h1 className="header center blue-text">{repoData.name}</h1>
          <div className="row center">
            <h5>{repoData.description}</h5>
            <h7>{repoData.html_url}</h7>
          </div>
          <div className="row center">
            <h6>Installation Instructions</h6>
            <pre className="language-markup" style={{overflow: "auto"}}>
              <code>
                git clone {this.state.repoData.html_url} ~/.local/share/albert/org.albert.extension.python/modules/{this.state.repoData.name}
              </code>
            </pre>
          </div>
          <div className="row">
                <ReactMarkdown 
                    source={this.state.readmeData}
                    transformImageUri={this.getLinkTarget}
                    skipHtml={false}
                    escapeHtml={false}
                    renderers={{image:this.imageRenderer}}
                />
          </div>
        </div>
      </div>
    )
  }
}


export default withRouter(Repo)