import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import { INSERT_BUSINESS, ADPLATFORM } from './constant'
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview'
import AddsPlat from './toolbar-ui'

export default class adPlatform extends Plugin {
  static get pluginName() {
    return 'adPlatform'
  }

  // 初始化
  init() {
    const editor = this.editor
    this.firstClick = 0
    editor.ui.componentFactory.add(ADPLATFORM, locale => {
      const view = new ButtonView(locale)
      const adds = new AddsPlat()
      view.set({
        label: INSERT_BUSINESS,
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
      })
      return view
    })
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
  /**
   *
   * @param {*} id 添加商品的id名字输入
   */
  addGoods(id) {
    const editor = this.editor
    editor.model.change(writer => {
      const paragraph = writer.createElement('paragraph', {})
      writer.appendText(`<!~2>商家ID:${id}</!~2>`, paragraph)
      editor.model.insertContent(paragraph, editor.model.document.selection)
    })
  }
}
