const trListEl = document.querySelectorAll("tbody tr");
// console.log("所有列表：", trListEl);

// 获取显示列表
function getShowTrList(arr) {
  let showArr = []
  for (let index = 0; index < arr.length; index++) {
    if (arr[index].style.display !== "none") {
      showArr.push(arr[index])
    }
  }
  // 删除table标题
  showArr.shift()
  return showArr
}
// console.log("所有显示列表：", getShowTrList(trListEl));

// 获取所有显示列表数据信息
function getTrTdList(arr) {
  let postArr = []
  let postObj = {}
  for( let i = 0; i < arr.length; i++) {
    let itemChildrenList = arr[i].children
    postObj["招录机关"] = itemChildrenList[0]?.innerText
    postObj["机构性质"] = itemChildrenList[1]?.innerText
    postObj["机构层级"] = itemChildrenList[2]?.innerText
    postObj["职位类别"] = itemChildrenList[3]?.innerText
    postObj["职位名称"] = itemChildrenList[4]?.innerText
    postObj["职级层次"] = itemChildrenList[5]?.innerText
    postObj["职位代码"] = itemChildrenList[6]?.innerText
    postObj["招考人数"] = itemChildrenList[7]?.innerText
    postObj["专业"] = itemChildrenList[8]?.innerText
    postObj["学历"] = itemChildrenList[9]?.innerText
    postObj["学位"] = itemChildrenList[10]?.innerText
    postObj["年龄"] = itemChildrenList[11]?.innerText
    postObj["经历要求"] = itemChildrenList[12]?.innerText
    postObj["其他"] = itemChildrenList[13]?.innerText
    postObj["申论类别"] = itemChildrenList[14]?.innerText
    postObj["专业科目"] = itemChildrenList[15]?.innerText
    postObj["备注（职位简介）"] = itemChildrenList[16]?.innerText
    postObj["咨询电话"] = itemChildrenList[17]?.innerText
    postArr.push(postObj)
    postObj = {}
  }
  return postArr
}

const postArr = getTrTdList(getShowTrList(trListEl))
console.log("所有显示列表数据信息: ", postArr);

function handlePost(arr) {
  return {
    postList: arr,
    filterBy(fn) {
      this.postList = this.postList.filter(fn)
      return this
    },
    end() {
      return this.postList
    }
  }
}
const result = handlePost(postArr)
                .filterBy(item => item["招录机关"].includes("长丰"))
                .end()
console.log("根据条件处理过的结果", result);