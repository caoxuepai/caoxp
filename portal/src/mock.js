
const Mock = require('mockjs')

const Random = Mock.Random

const produceNewsData = function () {
  let articles = [];
  for(let i = 0; i <= 19; i++) {
    let newArticleObj = {
      id: i,
      title: Random.csentence(5, 30),
      thumbnail_pic_s: Random.dataImage('300 * 250', 'mock的图片'),
      author_name: Random.cname(),
      date: Random.date() + ' ' + Random.time()
    }
    articles.push(newArticleObj)
  }
  return {
    articles: articles
  }
}

Mock.mock('/news/index', 'post', produceNewsData())
