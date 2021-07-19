import React, {useState,useEffect} from 'react';

import { Label,CatePost } from '../../utils/types';

import { queryLabels } from '../../utils/service';

import PostItem from '../category/components/postItem';

import "./index.scss";

const Labels = () => {

  const [isSelected,setIsSelected] = useState(false);

  const [selectLabel,setSelectLabel] = useState<Label>({} as Label);

  const [labelPosts,setLabelPosts] = useState<Array<CatePost>>([]);

  const [labels, setLabels] = useState<Array<Label>>([]);

  useEffect(()=>{
    const subscription = queryLabels().subscribe(res => {
      setLabels(res.repository.labels.nodes)
    })
    
    return () => {
      subscription.unsubscribe()
    }
  },[])


  const handleClick = (item:Label) => {
    if(item && item.issues && item.issues.nodes && item.issues.nodes.length > 0) {
      setLabelPosts(item.issues.nodes);
      setSelectLabel(item);
      setIsSelected(true)
    }else{
      setIsSelected(false)
    }
  }

  return (
    <div className="container">
      {isSelected?(
        <>
        <div className="cate-title">标签：<span onClick={()=>{setIsSelected(false)}}>{selectLabel.name}</span></div>
        {labelPosts.map((item) =>(
          <PostItem key={item.id} item={item} />
        ))}
        </>
      ):(
        <>
          <div className="tag">
            {labels.map(item=>(
              <span onClick={()=>{handleClick(item)}} key={item.id} className="tag-item" style={{color:`#${item.color}`}} title={item.description}>{item.name}</span>
            ))}
          </div>
        </>
      )}
    </div>
  ) 
}

export default Labels;
