import React from 'react'
import {Route, Link } from "react-router-dom";

const CharacterItem = ({ item }) => {
  console.log(item);
  return (
    <div className='card'>
      <div className='card-inner'>
        <div className='card-front'>
          <div className="card border-dark mb-3">
            <div className="card-body text-dark">
              <h5 className="card-title crop-text">{item.name}</h5>
              <div className="row card-body-height"   ><div className="col-sm-2">  <i className={`fa fa-${item.displayIcon} fa-3x`} aria-hidden="true"></i></div>
              <div className="col-sm-10"  > <p className="card-text">{item.description}</p> </div>
              </div>
              <div className="row"  >
                <div className="col-sm-6"><small className=" card-text-small text-muted">
                  Added {item.created}</small></div>
                <div className="col-sm-6 text-right">    <i className="fa fa-share-alt" aria-hidden="true"></i> </div>
              </div>
            </div>
          </div>
        </div>
        <div className='card-back'>
          <div>
            <div className="card-body">
              <h5 className="card-title crop-text">{item.name}</h5>
              <p className="card-text card-body-back-height">{item.description}</p>
            </div>
            <div className="row"  >
              <div className="col-sm-3"><i className="fa fa-star" aria-hidden="true"></i></div>
              <div className="col-sm-6 text-center">
                <a target="_blank" href={item.url} className="btn btn-primary" 
                 rel="noopener noreferrer">Redirect</a>
              </div>
              <div className="col-sm-3 text-right">
                <a href={`mailto:?subject=Bookmark Dashboard: sharing url '${item.name}'&body=Hello,%0D%0A%0D%0AI would like to share this url with you:
                 ${ window.location.protocol + "//" + window.location.host+ "/cardview/"+ item.id} 
                  ${item.expireDate?"which will be expire before" + item.expireDate:""} %0D%0A%0D%0A Regards,` } className="fa fa-share-alt-square" >&nbsp;</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CharacterItem
