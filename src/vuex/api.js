module.exports = {
  // 分类
    getCategories(cb) {
        api.get('/api/categories')
        .then(res => {
          cb && cb(res.data)
        })
        .catch(err => {});
      },
      // 购物车list
      getCarts(cb) {
        api.get('/api/carts')
        .then(res => {
          cb && cb(res.data)
        })
        .catch(err => {});
      },
      // footer
      getFooter(cb) {
         api.get('/api/footers')
        .then(res => {
          cb && cb(res.data)
        })
        .catch(err => {});
      },
      // 收藏
      getWish(cb) {
        api.get('/api/my-collections', {page: 1, size: 10})
       .then(res => {
         cb && cb(res.data)
       })
       .catch(err => {});
     },
}