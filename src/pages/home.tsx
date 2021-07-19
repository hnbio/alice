import React, {useState,useEffect} from 'react';

import ShowCase from '../components/showCase/index';

import Pagination, { setPagination, PageAction } from '../components/pagination/index';

import { queryPosts } from '../utils/service';

import { Post, PageInfo } from '../utils/types';

const Homes = () => {

  const [posts, setPosts] = useState([] as Array<Post>);
  const [pageInfo,setPageInfo] = useState({} as PageInfo);

  const [action,setAction] = useState<PageAction>("");
  const [cursor,setCursor] = useState("");

  useEffect(()=>{
    const params = `
      orderBy: {
        field: CREATED_AT
        direction: DESC
      }
      states: OPEN
      ${setPagination(action,cursor)}
    `
    const subscription = queryPosts(params).subscribe(res => {
      setPosts(res.repository.issues.nodes)
      setPageInfo(res.repository.issues.pageInfo)
    })
    return () => {
      subscription.unsubscribe()
    }
  },[action, cursor])


  const getPaginationAction = (action:PageAction,cursor:string) => {
    setAction(action);
    setCursor(cursor);
  }

  return (
    <div className="grid-container">
      {posts.map(item => (
        <ShowCase key={item.id} info={item} />
      ))}
      <Pagination pageInfo={pageInfo} getPaginationAction={(action:PageAction, cursor:string)=>{getPaginationAction(action,cursor)}} />
    </div>
  )
}

export default Homes;
