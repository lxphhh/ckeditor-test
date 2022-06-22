import { COMMON_BUTTON, CONFIRM_BUTTON } from '../../styles/common'

export default class Adds {
  constructor() {
    this.activeId = 0
    this.nodeArr = []
  }
  showAddGood() {
    let box = document.createElement('div')
    box.className = 'add_good'
    box.style.cssText =
      'position:absolute;display:block;width:390px;height:310px;box-sizing: border-box;border-radius: 4px;border: 1px solid #d9d9d9;background-color:#fff;right:50px;top:35px;z-index:999;'
    for (let i = 1; i < 4; i++) {
      let d = document.createElement('div')
      d.className = 'd' + i
      box.appendChild(d)
      this.createCon(d, i)
    }
    document.querySelector('#editorBox').appendChild(box)
    Array.from(document.querySelectorAll('#editorBox .add_good .d1 span')).map(
      (ele, index) => {
        ele.onclick = () => {
          this.clickHandle(ele, index)
        }
      }
    )
  }
  hideAddGood() {
    document
      .querySelector('#editorBox')
      .removeChild(document.querySelector('.add_good'))
  }
  clickHandle(node, index) {
    if (!node.style.color) {
      node.style.color = '#237fff'
      this.activeId = index
      document.querySelector('#editorBox .add_good .d2').innerHTML = ''
      if (this.activeId == 0) {
        //切换到常规商品
        document.querySelectorAll(
          '#editorBox .add_good .d1 span'
        )[1].style.color = '' //清空之前样式
        document
          .querySelector('#editorBox .add_good .d2')
          .appendChild(this.nodeArr[0])
      } else {
        //切换到活动商品
        document.querySelectorAll(
          '#editorBox .add_good .d1 span'
        )[0].style.color = ''
        document
          .querySelector('#editorBox .add_good .d2')
          .appendChild(this.nodeArr[1])
      }
    }
  }
  createCon(node, num) {
    if (num == 1) {
      this.createTab(node)
    } else if (num == 2) {
      this.createContent(node)
    } else {
      this.createButton(node)
    }
  }
  createTab(node) {
    // let span1 = document.createElement("span");
    // span1.innerText = "常规商品";
    let span3 = document.createElement('span')
    span3.innerText = '优惠'
    let span2 = document.createElement('span')
    span2.innerText = '商品'
    node.style.cssText = `height:57px;line-height: 57px;
  border-bottom: 1px solid #eee;
 padding-left: 24px;
 color: #8c8c8c;`
    // span1.style.cssText = "color: #237fff;margin-right: 40px;cursor:pointer;";
    span3.style.cssText = 'color: #237fff;margin-right: 40px;cursor:pointer;'
    span2.style.cssText = 'cursor:pointer;'
    // node.appendChild(span1);
    node.appendChild(span3)
    node.appendChild(span2)
  }
  createContent(node) {
    let arr = [
      // { label: "商品链接", placeholder: "请输入商品链接" },
      { label: '优惠ID', placeholder: '请输入优惠ID,支持下拉搜索' },
      { label: '商品名字', placeholder: '请输入商品名字进行搜索' }
    ]

    for (let i = 0; i < 2; i++) {
      let inputDiv = document.createElement('div')
      inputDiv.style.cssText =
        'position: relative;padding-top: 24px;padding-left: 20px;color:#828282;font-size: 15px;'
      let label = document.createElement('span')
      label.innerText = arr[i].label
      label.style.cssText =
        'display: inline-block;width: 76px;text-align: left;height: 32px;line-height: 32px;'
      let input = document.createElement('input')
      input.style.cssText = `display: inline-block;width: 272px;text-align: left;height: 32px;
      line-height: 32px;box-sizing: border-box;padding-left: 16px;border: 1px solid #eee;
      border-radius: 4px;color:#828282;outline: none;`
      input.placeholder = arr[i].placeholder
      // dataListDiv.appendChild(p);
      inputDiv.appendChild(label)
      // input.id = "myInput";
      // console.log(input, "inputinput");
      if (i === 0) {
        input.id = 'editorInput'
        input.autocomplete = 'off'
        let dataListDiv = document.createElement('div')
        dataListDiv.id = 'dataList'
        // const element = document.querySelector(".add_good");
        // element && (element.style.height = "330px");
        inputDiv.style.cssText = `
           padding-top: 24px;
           padding-left: 20px;
           color:#828282;
           font-size: 15px;
        `
        dataListDiv.style.cssText = `
          position: absolute;
          right: 20px;
          width: 272px;
          height: 100px;
          border: 1px solid #eee;
          overflow-y: auto;
          overflow-x: auto;
          max-height: 100px;
          color:#828282;
          border-radius: 4px;
      `

        dataListDiv.style.display = 'none'
        inputDiv.appendChild(input)
        inputDiv.appendChild(dataListDiv)
        this.nodeArr.push(inputDiv)
        node.style.cssText = 'height:190px;border-bottom: 1px solid #eee;'
        node.appendChild(this.nodeArr[0])
      } else {
        inputDiv.appendChild(input)
        this.nodeArr.push(inputDiv)
        node.style.cssText = 'height:190px;border-bottom: 1px solid #eee;'
        node.appendChild(this.nodeArr[0])
      }
    }
  }
  createButton(node) {
    let span1 = document.createElement('span')
    let span2 = document.createElement('span')
    span1.style.cssText = CONFIRM_BUTTON
    span1.innerText = '确定'
    span2.style.cssText = COMMON_BUTTON
    span2.innerText = '取消'
    node.style.cssText = `display: flex;justify-content: flex-end;padding-top:15px;`
    node.appendChild(span1)
    node.appendChild(span2)
  }
}
