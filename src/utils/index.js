module.exports = {
      // 精确计算浮点height（offsetHeight会被四舍五入）
      compuFloatHeight(el) {
            return el.getBoundingClientRect().bottom - el.getBoundingClientRect().top;
      },
    // 精确计算left top right bottom一边距离   
      compuFloat(el, d = 'left') {
        return el.getBoundingClientRect()[d]
      }
}