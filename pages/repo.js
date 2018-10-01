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
      readmeData: ""
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
                readmeData: atob(response['data']['content'])
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

  render() {

    let repoData = this.state.repoData

    return (
      <div>
        <Head title="Albert Extensions" />
        <Nav />

        <div className="hero">
          <h1 className="title">{repoData.name}</h1>
          <h3>{repoData.description}</h3>
          <em>{repoData.html_url}</em>

          <hr></hr>

          <div className="col">
            <h3>Installation Instructions</h3>
            <div><em>After completing <Link href={`/install`}>Installation Instructions</Link></em></div>
            <code>git clone {this.state.repoData.html_url} /usr/share/albert/org.albert.extension.python/modules/{this.state.repoData.name}</code>
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

        <style jsx>{`
          .hero {
            width: 90vw;
            padding:3vw;
            color: #333;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .title {
            margin: 0;
            width: 100%;
            padding-top: 60px;
            line-height: 1.15;
            font-size: 48px;
          }
          .title,
          .description {
            text-align: center;
          }
          .row {
            margin: 5vw auto 5vw;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
          }
          .col {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
          }
          .card {
            padding: 18px 18px 24px;
            margin: 5px;
            width: 220px;
            text-align: left;
            text-decoration: none;
            color: #434343;
            border: 1px solid #9b9b9b;
          }
          .card:hover {
            border-color: #067df7;
          }
          .card h3 {
            margin: 0;
            color: #067df7;
            font-size: 18px;
          }
          .card p {
            margin: 0;
            padding: 12px 0 0;
            font-size: 13px;
            color: #333;
          }
        `}</style>
      </div>
    )
  }
}


export default withRouter(Repo)