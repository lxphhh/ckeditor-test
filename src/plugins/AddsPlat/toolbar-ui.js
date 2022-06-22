import { COMMON_BUTTON, CONFIRM_BUTTON } from '../../styles/common'

export default class AddsPlat {
  constructor() {
    this.activeId = 0
    this.nodeArr = []
  }
  showAddGood() {
    let box = document.createElement('div')
    box.className = 'add_plat'
    box.style.cssText =
      'position:absolute;display:block;width:390px;height:215px;box-sizing: border-box;border-radius: 4px;border: 1px solid #d9d9d9;background-color:#fff;right:50px;top:35px;z-index:999;'
    for (let i = 1; i < 4; i++) {
      let d = document.createElement('div')
      d.className = 'd' + i
      box.appendChild(d)
      this.createCon(d, i)
    }
    document.querySelector('#editorBox').appendChild(box)
  }
  hideAddGood() {
    document
      .querySelector('#editorBox')
      .removeChild(document.querySelector('.add_plat'))
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
    let span1 = document.createElement('span')
    span1.innerText = '插入商家'
    node.style.cssText = `height:57px;line-height: 57px;
        border-bottom: 1px solid #eee;
      padding-left: 24px;
  color: #8c8c8c;`
    span1.style.cssText = 'color: #237fff;margin-right: 40px;'

    node.appendChild(span1)
  }
  createContent(node) {
    let arr = [
      // { label: "店铺名称", placeholder: "请输入店铺名称" },
      { label: '商家ID', placeholder: '请输入商家ID' }
    ]

    for (let i = 0; i < 1; i++) {
      let inputDiv = document.createElement('div')
      inputDiv.style.cssText =
        'padding-top: 24px;padding-left: 20px;color:#828282;font-size: 15px;'
      let label = document.createElement('span')
      label.innerText = arr[i].label
      label.style.cssText =
        'display: inline-block;width: 76px;text-align: left;height: 32px;line-height: 32px;'
      let input = document.createElement('input')
      input.style.cssText = `display: inline-block;width: 272px;text-align: left;height: 32px;
    line-height: 32px;box-sizing: border-box;padding-left: 16px;border: 1px solid #eee;
    border-radius: 4px;color:#828282;outline: none;`
      input.placeholder = arr[i].placeholder
      inputDiv.appendChild(label)
      inputDiv.appendChild(input)
      this.nodeArr.push(inputDiv)
      node.appendChild(inputDiv)
    }
    node.style.cssText = 'height:90px;border-bottom: 1px solid #eee;'
  }
  createButton(node) {
    let span1 = document.createElement('span')
    let span2 = document.createElement('span')
    span1.style.cssText = `width: 63px;
  height: 31.5px;
  line-height: 30px;
  box-sizing: border-box;
  text-align: center;
  background: #1677ff;
  border-radius: 4px;
  cursor:pointer;
  border: 1px solid #1677ff;
  display: inline-block;
  margin-right: 9px;
  color: #dceaff;
  `
    span1.innerText = '确定'
    span2.style.cssText = `width: 63px;
  height: 31.5px;
  line-height: 30px;
  box-sizing: border-box;
  text-align: center;
  border-radius: 4px;
  cursor:pointer;
  background: #fafafa;
  margin-right: 24px;
  border: 1px solid #e0e0e0;display: inline-block;
  color: #777;`
    span2.innerText = '取消'
    node.style.cssText = `display: flex;justify-content: flex-end;padding-top:15px;`
    node.appendChild(span1)
    node.appendChild(span2)
  }
}
