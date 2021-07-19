import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Post } from '../../utils/types';

import { queryPostItem } from '../../utils/service';

import { format, formatWeek  } from '../../utils/index';

import './index.scss';

const Detail = () => {

  const { id } = useParams();

  const [article,setArticle] = useState({} as Post);

  useEffect(()=>{
    const subscription = queryPostItem(Number(id)).subscribe(res => {
      setArticle(res.repository.issue);
    })
    
    return () => {
      subscription.unsubscribe();
    }
  },[id])

  const dangerouslyHtml = (articleHtml = "") => ({ __html: articleHtml });

  return (
    <div className="container">
      <article>
        <div className="article-title">
          <h3>{article.title}</h3>
          <div className="mate">
            <span>发布于: {format(article.createdAt)}</span>
            <span>当前: {formatWeek()}</span>
          </div>
          <hr/>
        </div>
        <div dangerouslySetInnerHTML={dangerouslyHtml(article.bodyHTML)}></div>
      </article>
    </div>
  ) 
}

export default Detail;
