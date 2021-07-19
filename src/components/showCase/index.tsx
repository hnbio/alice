import React from 'react';
import { Link } from 'react-router-dom';

import { CatePost } from '../../utils/types';

import { randomColor, format } from '../../utils/index';

import './index.scss';

interface ShowCase {
  info: CatePost
}

interface Label {
    id: string
    name: string
    color: string
    description: string
}



function getReadTime(len: number) {
  return Math.floor(len / 360);
}

const ShowCase = (props:any) => {
  const { info } = props

  return (
    <div className="show-case-bg">
      <div className="show-case">
        <Link to={`/post/${info.number}`}>
          <div className="case-shadow"></div>
          <div className="case-content">
              <h3>{info.title}</h3>
              <p>发布于 {format(info.createdAt)} • {getReadTime(info.bodyText.length)}分钟</p>
              <div className="list-tags">
                {info.labels.nodes.map((item:Label)=>(
                  <span key={item.id} > {item.name} </span>
                ))}
                <span> {info.milestone.title} </span>
              </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default ShowCase;