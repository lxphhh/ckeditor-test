import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import { DISCOUNT_INFORMATION, DISCOUNTINFO } from './constant'
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview'
import AddsPlat from './toolbar-ui'
import $ from 'jquery'
import debounce from 'lodash.debounce'
import PinyinMatch from 'pinyin-match' // es
import service from '../../request'

export default class adPlatform extends Plugin {
  constructor(editor) {
    super(editor)
    ;(this.labelArray = [
      {
        key: 'btn_1',
        labelName: '简介/特色',
        desc: '暂无信息2'
      },
      {
        key: 'btn_2',
        labelName: '免邮政策',
        desc: '暂无信息1'
      },
      {
        key: 'btn_3',
        labelName: '关于税费',
        desc: '暂无信息3'
      },
      {
        key: 'btn_4',
        labelName: '退货政策',
        desc: '暂无信息4'
      },
      {
        key: 'btn_5',
        labelName: '退货流程及其他',
        desc: '暂无信息5'
      }
    ]),
      (this.data = [])
  }
  // 初始化
  init() {
    this._this = this
    const editor = this.editor
    this.firstClick = 0
    editor.ui.componentFactory.add(DISCOUNTINFO, locale => {
      const view = new ButtonView(locale)
      const adds = new AddsPlat()
      view.set({
        label: DISCOUNT_INFORMATION,
        withText: true,
        tooltip: true
      })
      view.on('execute', () => {
        if (this.firstClick == 0) {
          adds.showAddGood()
          this.firstClick = 1
        } else {
          adds.hideAddGood()
          this.firstClick = 0
        }
        Array.from(
          document.querySelectorAll('#editorBox .add_plat .d3 span')
        ).map((ele, index) => {
          ele.onclick = () => {
            this.buttonHandle(index, adds)
          }
        })
        Array.from(
          document.querySelectorAll('#editorBox .add_plat .d2 input')
        ).map((ele, index) => {
          ele.oninput = e => {
            if (e.target.value === '') {
              dataList.style.display = 'none'
              return
            } else {
              dataList.style.display = ''
              return this.handleInput(e)
            }
          }
          ele.onfocus = this.showDiv
        })
        this.labelArray.forEach((item, index) => {
          const element = $(`#${item.key}`)
          // console.log(element, 'element')
          element.click(() => {
            this.handleAddInfomation(item)
          })
        })

        let dataListEle = document.getElementById('dataList')
        if (dataListEle) {
          dataListEle.onclick = this.pushInput.bind(this)
        }
      })
      return view
    })
  }

  showDiv() {
    dataList.style.display = ''
  }

  async getListData(target) {
    try {
      this.data.length = []
      const res = await service.get(
        `https://fentu.maibuymai.com/admin/material?page=1&page_size=20&material_enabled=&material_content=&tab_id=11&article_title=${target}`
      )
      if (res) {
        const resData = res.data.d.map((ele, index) => {
          return {
            id: ele.material_id,
            // 加上优惠id 方便之后的截取信息
            text: `${ele.article_title},优惠ID:${ele.material_id}`,
            alldata: ele
          }
        })
        return resData
      }
    } catch (error) {}
  }

  // 模糊搜索方案
  filterList(list, str) {
    return [...list].filter(item => PinyinMatch.match(item.text, str))
  }

  async handleInput(e) {
    var dataList = document.getElementById('dataList')
    var e = event.target || event.srcElement
    var str = e.value
    const data = await this.getListData(str)
    this.data.push(data)
    console.log(this.data, '是1')
    dataList.innerHTML = '' //清空div下的所有P元素
    const dataArray = this.filterList(data, str)
    // console.log(dataArray, "是是");
    if (dataArray) {
      dataArray.forEach(function (item) {
        var p = document.createElement('p')
        p.style.cssText = `
        display:inline
        height: 30px;
        font-size: 14px;
        margin:0;
        padding: 10px 14px;
        cursor: pointer;
        line-height: 2;`
        var text = document.createTextNode(item.text)
        var id = document.createTextNode(item.id)
        p.appendChild(text)
        dataList.appendChild(p)
      })
    }
    if (dataList.innerHTML == '') {
      var p = document.createElement('p')
      p.style.cssText = `
          display:inline
          height: 30px;
          font-size: 14px;
          margin:0;
          padding: 10px 14px;
          cursor: pointer
          line-height: 2;`
      var text = document.createTextNode('暂无数据请重新搜索你的商品名字')
      p.style.color = '#d7d7d7'
      p.onclick = function (event) {
        event.preventDefault()
        event.stopImmediatePropagation()
      } //阻止事件的冒泡
      p.appendChild(text)
      dataList.appendChild(p)
    }
  }

  async pushInput(event) {
    var e = event.target || event.srcElement
    var input = document.getElementById('editorInput')
    // input.setAttribute("title", `${}`); //为红盒子对象设置title属性和值
    // console.log(input.value, "input");
    input.value = e.innerText
    dataList.style.display = 'none'
    console.log(e.innerText, 'e.innerText')
    this.addGoods(e.innerText)
  }
  /**
   *
   * @param {*} index 0 开启 1 隐藏
   * @param {*} adds
   */
  buttonHandle(index, adds) {
    if (index == 0) {
      let input1 = document.querySelector('#editorBox .add_plat .d2 input')
      this.addGoods(input1.value)
    } else {
      adds.hideAddGood()
      this.firstClick = 0
    }
  }
  handleAddInfomation(item) {
    console.log(item, 'item------')
    // this.addInfomation(item.desc)
  }
  /**
   *
   * @param {*} id 添加商品的id名字输入
   */
  addGoods(value) {
    // console.log(id, 'id')
    let index = value.indexOf(':')
    let result = value.substr(index + 1, value.length)
    //TODO: 开个接口
  }

  addInfomation(desc) {
    const editor = this.editor
    editor.model.change(writer => {
      const paragraph = writer.createElement('paragraph', {})
      writer.appendText(`${desc}`, paragraph)
      editor.model.insertContent(paragraph, editor.model.document.selection)
    })
  }
}
