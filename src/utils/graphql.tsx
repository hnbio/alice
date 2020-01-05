import { QueryPost } from "./types";


function stringify(params: QueryPost) {
  let result = JSON.stringify(params).replace(/[{}"]/g, "");
  return result;
};

export default {
  /**
   * 获取文章列表
   */
  queryGraphQLPosts : (username: string, repository: string, params: QueryPost) => `
    query {
      repository(owner:"${username}", name: "${repository}") {
        issues(${stringify(params)}) {
          pageInfo {
            hasNextPage
            endCursor
            hasPreviousPage
            startCursor
          }
          totalCount
          edges {
            node {
              id
              number
              updatedAt
              author {
                url
              }
              bodyText
              bodyHTML
              title
              labels(first: 5) {
                nodes {
                  id
                  name
                  color
                }
              }
              milestone {
                id
                title
              }
            }
          }
        }
      }
    }
  `,

  /**
   * 获取标签
   */
  queryGraphQLLable: (username: string, repository: string) => `
    query { 
      repository(owner:"${username}", name: "${repository}") {
        labels(first:100) {
          edges {
            node {
              id
              name
              color
              description
            }
          }
        }
      }
    }
  `,

  /**
   * 获取分类
   */
  queryGraphQLCategory: (username: string, repository: string) => `
    query { 
      repository(owner:"${username}", name: "${repository}") {
        milestones(first:10) {
          edges {
            node {
              id,
              title,
              description
            }
          }
        }
      }
    }
  `,


  /**
   * 获取单个文章及其评论
   * 评论只获取最新的15个
   */
  queryGraphQLPostItem: (username: string, repository: string, number: number) => `
    query { 
      repository(owner:"${username}", name: "${repository}") {
        issue(number:${number}) {
          id
          createdAt
          labels(first:5) {
            edges {
              node {
                id
                name
              }
            }
          }
          milestone {
            title
          }
          author {
            login
            url
          }
          title
          body
          bodyHTML
          comments(last:15) {
            edges {
              node {
                id
                createdAt
                body
                bodyHTML
                databaseId
                createdAt
              }
            }
          }
        }
      }
    }
  `,


  /**
   * 单个文章添加评论
   * 评论规则：必须 @github账户名称 后才能提交
   */
  mutationGraphQLPostComment: (subjectId: string, body: string) => `
    mutation {
      addComment(input:{subjectId: "${subjectId}", body: "${body}"}) {
        commentEdge {
          node {
            body
            repository {
              id
              name
              nameWithOwner
            }
            issue {
              number
            }
          }
        }
      }
    }
  `,









}