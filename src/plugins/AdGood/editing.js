import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import Adds from './toolbar-ui'
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview'
import { INSERT_OFFER } from './constant'
import service from '../../request'
import PinyinMatch from 'pinyin-match' // es

export default class adGood extends Plugin {
  init() {
    const editor = this.editor
    this.firstClick = 0
    // const t1 = editor.t
    editor.ui.componentFactory.add('addGood', locale => {
      const view = new ButtonView(locale)
      const adds = new Adds()
      view.set({
        label: INSERT_OFFER,
        withText: true,
        tooltip: true
      })
      view.on('execute', async () => {
        if (this.firstClick == 0) {
          adds.showAddGood()
          this.firstClick = 1
        } else {
          adds.hideAddGood()
          this.firstClick = 0
        }
        Array.from(
          document.querySelectorAll('#editorBox .add_good .d3 span')
        ).map((ele, index) => {
          ele.onclick = () => {
            this.buttonHandle(ele, index, adds)
          }
        })
        Array.from(
          document.querySelectorAll('#editorBox .add_good .d2 input')
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
        let dataListEle = document.getElementById('dataList')
        dataListEle && (dataListEle.onclick = this.pushInput)
        let closeAll = document.querySelectorAll(
          '#editorBox .add_good .d2 span'
        )
      })
      return view
    })
  }
  async getListData(target) {
    try {
      const res = await service.get(
        `https://fentu.maibuymai.com/admin/material?page=1&page_size=20&material_enabled=&material_content=&tab_id=11&article_title=${target}`
      )
      if (res) {
        const resData = res.data.d.map((ele, index) => {
          return {
            id: ele.material_id,
            // 加上优惠id 方便之后的截取信息
            text: `${ele.article_title},优惠ID:${ele.material_id}`
          }
        })
        return resData
      }
    } catch (error) {}
  }
  showDiv() {
    dataList.style.display = ''
  }
  pushInput(event) {
    // console.log(event, "event");
    var e = event.target || event.srcElement
    var input = document.getElementById('editorInput')
    // input.setAttribute("title", `${}`); //为红盒子对象设置title属性和值
    // console.log(input.value, "input");
    input.value = e.innerText
    dataList.style.display = 'none'
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
    dataList.innerHTML = '' //清空div下的所有P元素
    const dataArray = this.filterList(data, str)
    // console.log(dataArray, "是是");
    if (dataArray) {
      dataArray.forEach(function (item) {
        // console.log(item);
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
  buttonHandle(node, index, adds) {
    if (index == 0) {
      let input1 = document.querySelector('#editorBox .add_good .d2 input')
      let index = input1.value.indexOf(':')
      let result = input1.value.substr(index + 1, input1.value.length)

      if (adds.activeId == 0) {
        this.addArticle(result)
      } else {
        this.addGoods(result)
      }
    } else {
      adds.hideAddGood()
      this.firstClick = 0
    }
  }
  // 变量名称调整，原插入商品是文章id：addGoods => addArticle
  addArticle(id) {
    const editor = this.editor
    editor.model.change(writer => {
      const paragraph = writer.createElement('paragraph', {})
      writer.appendText(`<!~1>优惠ID:${id}</!~1>`, paragraph)
      editor.model.insertContent(paragraph, editor.model.document.selection)
    })
  }
  addGoods(id) {
    const editor = this.editor
    editor.model.change(writer => {
      const paragraph = writer.createElement('paragraph', {})
      writer.appendText(`<!~4>商品ID:${id}</!~4>`, paragraph)
      editor.model.insertContent(paragraph, editor.model.document.selection)
    })
  }
}
