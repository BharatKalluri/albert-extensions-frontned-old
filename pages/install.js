import React from 'react'
import Head from '../components/head'
import Nav from '../components/nav'


export default class InstallSteps extends React.Component {

  render() {

    return (
      <div>
        <Head title="Albert Extensions" />
        <Nav />

        <div className="hero">
          <div className="col">
            <h1 className="title">Installation steps</h1>
            <h4>Step 1:</h4>
            <p>
                Setup permissions for installing extensions.
            </p>
            <h4>Step 2:</h4>
            <div>
              Change permissions: 
                <code>
                    sudo chmod -R 777 /usr/share/albert/org.albert.extension.python/modules
                </code>
            </div>
            <h4>Step 3:</h4>
            <p>
                Now, go ahead and follow instructions in the extension page to install.
                Remember to enable extensions after downloading the extensions.
            </p>
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
