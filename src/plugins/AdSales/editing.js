import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import AddsSales from './toolbar-ui'
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview'
import { INSERT_PROMO_CODE } from './constant'

export default class adSales extends Plugin {
  init() {
    const editor = this.editor
    this.firstClick = 0
    // const t1 = editor.t
    editor.ui.componentFactory.add('addSales', locale => {
      const view = new ButtonView(locale)
      const adds = new AddsSales()
      view.set({
        label: INSERT_PROMO_CODE,
        withText: true,
        tooltip: true
      })
      view.on('execute', () => {
        if (this.firstClick == 0) {
          adds.showAddSales()
          this.firstClick = 1
        } else {
          adds.hideAddSales()
          this.firstClick = 0
        }
        Array.from(
          document.querySelectorAll('#editorBox .add_sales .d3 span')
        ).map((ele, index) => {
          ele.onclick = () => {
            this.buttonHandle(index, adds)
          }
        })
      })
      return view
    })
  }
  buttonHandle(index, adds) {
    if (index == 0) {
      let input1 = document.querySelector('#editorBox .add_sales .d2 input')
      this.addSales(input1.value)
    } else {
      adds.hideAddSales()
      this.firstClick = 0
    }
  }
  addSales(info) {
    const editor = this.editor
    editor.model.change(writer => {
      const paragraph = writer.createElement('paragraph', {})
      writer.appendText(`<!~3>优惠码:${info}</!~3>`, paragraph)
      editor.model.insertContent(paragraph, editor.model.document.selection)
    })
  }
}
