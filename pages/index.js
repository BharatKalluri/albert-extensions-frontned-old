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
      repoData: []
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

  render() {

    return (
      <div>
        <Head title="Albert Extensions" />
        <Nav />

        <div className="hero">
          <h1 className="title">Albert Extensions</h1>
          <p className="description">
            A hub for Albert extensions
          </p>

          <div className="row">
            {this.state.repoData.filter((item)=>{
              if (!excluded_repos.includes(item.name)) {return item}
            }).map((item,i)=>(
              <Link href={`/repo?name=${item.full_name}`} key={i}>
                  <a className="card">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                  </a>
              </Link>
            ))}
          </div>
        </div>

        <style jsx>{`
          .hero {
            width: 100%;
            color: #333;
          }
          .title {
            margin: 0;
            width: 100%;
            padding-top: 80px;
            line-height: 1.15;
            font-size: 48px;
          }
          .title,
          .description {
            text-align: center;
          }
          .row {
            max-width: 90vw;
            margin: 5vw auto 5vw;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
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
