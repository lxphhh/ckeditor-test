import { COMMON_BUTTON, CONFIRM_BUTTON } from '../../styles/common'
import { DISCOUNT_INFORMATION } from './constant'

export default class AddsPlat {
  constructor() {
    this.activeId = 0
    this.nodeArr = []
  }
  showAddGood() {
    let box = document.createElement('div')
    box.className = 'add_plat'
    box.style.cssText =
      'position:absolute;display:block;width:390px;height:310px;box-sizing: border-box;border-radius: 4px;border: 1px solid #d9d9d9;background-color:#fff;right:50px;top:35px;z-index:999;'
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
    span1.innerText = DISCOUNT_INFORMATION
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
      { label: '商家名称', placeholder: '请选择商家,支持下拉搜索' }
    ]

    for (let i = 0; i < 1; i++) {
      // 下拉
      let dataListDiv = document.createElement('div')
      dataListDiv.id = 'dataList'

      let inputDiv = document.createElement('div')
      inputDiv.style.cssText =
        'padding-top: 24px;padding-left: 20px;color:#828282;font-size: 15px;'
      let label = document.createElement('span')
      label.innerText = arr[i].label
      label.style.cssText =
        'display: inline-block;width: 76px;text-align: left;height: 32px;line-height: 32px;'
      let input = document.createElement('input')
      // 输入
      input.id = 'editorInput'
      input.autocomplete = 'off'
      input.style.cssText = `display: inline-block;width: 272px;text-align: left;height: 32px;
    line-height: 32px;box-sizing: border-box;padding-left: 16px;border: 1px solid #eee;
    border-radius: 4px;color:#828282;outline: none;`
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
        z-index:1000;
        border-radius: 4px;
      `
      // dataListDiv.style.display = 'none'
      const buttonGroupContent = document.createElement('div')
      buttonGroupContent.style.cssText = `
        position: absolute;
        top: 210px;
        z-index:111;
        display:flex;
        flex-direction: column;
        width: 347px;
        height: 200px;
        box-sizing: border-box;
      `

      for (let i = 0; i < 4; i++) {
        const singleButtonContent = document.createElement('div')
        singleButtonContent.style.cssText = `
          display:flex;
          align-items: center;
          width: 100%;
          height: 25%;
          z-index:111;
     `
        const btn = document.createElement('div')
        btn.style.cssText = `
          display:flex;
          align-items: center;
          width: 70px;
          height: 70%;
          border-radius: 4px;
          cursor:pointer;
          border: 1px solid #e0e0e0;
          z-index:111;
       `
        const btnName = document.createElement('span')
        const label = document.createElement('span')
        label.style.cssText = `
          flex:1;
          color:#e0e0e0;
          margin-left: 15px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        `
        label.innerHTML = '商家信息商家信息商家信息商家信息'
        btnName.style.cssText = `margin-left: 4px;`
        btnName.innerText = '商家信息'

        btn.appendChild(btnName)
        singleButtonContent.appendChild(btn)
        singleButtonContent.append(label)
        buttonGroupContent.appendChild(singleButtonContent)
      }

      input.placeholder = arr[i].placeholder
      inputDiv.appendChild(label)
      inputDiv.appendChild(input)
      inputDiv.appendChild(dataListDiv)

      inputDiv.appendChild(buttonGroupContent)
      this.nodeArr.push(inputDiv)
      node.appendChild(inputDiv)
    }
    node.style.cssText = 'height:190px;border-bottom: 1px solid #eee;'
    // node.style.cssText = 'height:90px;border-bottom: 1px solid #eee;'
  }
  createButton(node) {
    let div1 = document.createElement('div')
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

  // 创建按钮组合
  createSingleButton(node) {
    // div > span *4
    let span1 = document.createElement('span')
    let span2 = document.createElement('span')
    span1.style.cssText = COMMON_BUTTON
    span1.innerText = '取消'
    span2.style.cssText = COMMON_BUTTON
    span2.innerText = '取消'
    node.style.cssText = `display: flex;justify-content: flex-end;padding-top:15px;`
    node.appendChild(span1)
    node.appendChild(span2)
  }
}
