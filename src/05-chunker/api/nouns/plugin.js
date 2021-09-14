import isSubordinate from './isSubordinate.js'
import isPlural from './isPlural.js'
import { getNth } from '../_lib.js'
import find from './find.js'

const toJSON = function (m) {
  return {
    isPlural: isPlural(m),
    isSubordinate: isSubordinate(m),
  }
}

const findNouns = function (View) {
  class Nouns extends View {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.viewType = 'Nouns'
    }
    json(opts = {}) {
      return this.map(m => {
        let json = {} //vb.json(opts)
        if (opts && opts.noun !== true) {
          json.noun = toJSON(m)
        }
        return json
      })
    }
  }

  View.prototype.nouns = function (n) {
    this.compute('chunks')
    let m = find(this)
    m = getNth(m, n)
    return new Nouns(this.document, m.pointer)
  }
}
export default findNouns
