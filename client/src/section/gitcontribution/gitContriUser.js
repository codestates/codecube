import React from 'react'
import './gitContri.css'
const GitContributionUser = (props) => {
  return (
    <div className="contribution">
      <div id="github-img-wrapper">
        <img
          className="githublogo"
          src="https://png2.cleanpng.com/sh/c978bf3f649015bb1301f20998cd1338/L0KzQYm3WMA4N6ttiZH0aYP2gLBuTfdqfJl6ep95YXfog37zjBdwNaNqiNH8aYTygsq0hv9zc15sgeZxdXKwfLFuj70yNZ5mf9d3dIn2PYbpVsllbWg2eqc6Mka4Pom8WMYxP2c7Sac8M0a5RImBUcc1OWgziNDw/kisspng-github-pages-logo-repository-fork-github-logo-1-magentys-5b69de71b51265.8586076615336648817417.png"
        ></img>
        <img
          className="hat"
          src="https://png2.cleanpng.com/sh/6b9917d5009eb044e9f8cb1a67bb2d20/L0KzQYi4UsA3N5Y8fJGAYUK7coW4gcNnPGQ4TJCAMUC2Q4a6WME2OWM7SagEOEa1RYq4TwBvbz==/5a28b41a3f4334.5103353815126169862591.png"
        ></img>
        <div className="greet">Merry Github</div>
      </div>
      {props.gitContri ? (
        <img className="empty-cont" src={props.gitContri}></img>
      ) : (
        <img
          className="empty-cont"
          src="https://ghchart.rshah.org/219138/codestate"
        ></img>
      )}
    </div>
  )
}

export default GitContributionUser
