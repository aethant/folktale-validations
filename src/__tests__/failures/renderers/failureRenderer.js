import { compose, assoc, of, prepend } from 'ramda'
import { list } from 'ramda-adjunct'
import {
  flatFailureMessage,
  nestedFailureMessageWithObject,
  nestedFailureMessageWithArray,
  nestedAndOrs,
} from '../../testHelpers/fixtures/rendererFailureMessages'
import {
  uid1,
  value1,
  value2,
  value3,
  value4,
  value5,
  value6,
  uid2,
  uid3,
  uid4,
  uid5,
  uid6,
  payload1,
  payload2,
} from '../../testHelpers/fixtures/generic'
import { joinWithColon, wrapWithSoftBrackets } from '../../../utils/formatting'
import { invalidFailureStructureErrorMessage } from '../../../errors'
import defaultFailureRendererHelpers from '../../../config/defaults/customise/defaultFailureRendererHelpers'
import failureRendererDefaults from '../../../config/defaults/customise/failureRendererDefaults'
import failureRenderer from '../../../failures/renderers/failureRenderer'

const renderPayload = uid =>
  compose(joinWithColon, prepend(uid), of, wrapWithSoftBrackets, list)

describe(`failureRenderer()`, () => {
  const validatorMessages = {
    [uid1]: renderPayload(value1),
    [uid2]: renderPayload(value2),
    [uid3]: renderPayload(value3),
    [uid4]: renderPayload(value4),
    [uid5]: renderPayload(value5),
    [uid6]: renderPayload(value6),
  }

  const renderer = failureRenderer(
    defaultFailureRendererHelpers(failureRendererDefaults),
    validatorMessages
  )
  describe(`with an invalid payload`, () => {
    it(`throws`, () => {
      const value = []
      expect(() => renderer(value)).toThrow(
        invalidFailureStructureErrorMessage(value)
      )
    })
  })

  describe(`with a single payload`, () => {
    it(`renders the correct error message`, () => {
      const result = renderer(payload1)
      expect(result).toEqualWithCompressedWhitespace(`value1: (1,2)`)
    })
  })

  describe(`with ands and ors`, () => {
    it(`renders the correct error message`, () => {
      const result = renderer({ and: [payload1, payload2] })
      expect(result).toEqualWithCompressedWhitespace(
        `value1: (1,2) and value2: (1,2)`
      )
    })
  })

  describe(`with a flat error object`, () => {
    it(`renders the correct error message`, () => {
      const result = renderer(flatFailureMessage)
      expect(result).toEqualWithCompressedWhitespace(
        `Object 
          – value1: (1,2)
          – included invalid value(s)
            – Key 'a': value2: (1,2)
            – Key 'b': value3: (1,2)
            – Key 'c': value4: (1,2)`
      )
    })

    describe(`with a name`, () => {
      it(`renders the correct error message`, () => {
        const name = `Object Name`
        const result = renderer(assoc(`name`, name, flatFailureMessage))
        expect(result).toEqualWithCompressedWhitespace(
          `Object Name 
            – value1: (1,2)
            – included invalid value(s)
              – Key 'a': value2: (1,2)
              – Key 'b': value3: (1,2)
              – Key 'c': value4: (1,2)`
        )
      })
    })
  })

  describe(`with a nested error object`, () => {
    it(`renders the correct error message`, () => {
      const result = renderer(nestedFailureMessageWithObject)
      expect(result).toEqualWithCompressedWhitespace(
        `Object 
          – included invalid value(s)
            – Key 'a': value1: (1,2)
            – Key 'b':
                Object
                  – value2: (1,2)
                  – included invalid value(s)
                    –  Key 'ba': value3: (1,2)
            – Key 'c': value4: (1,2)`
      )
    })
  })

  describe(`with a nested array of error objects`, () => {
    it(`renders the correct error message`, () => {
      const result = renderer(nestedFailureMessageWithArray)
      expect(result).toEqualWithCompressedWhitespace(
        `Object 
          – included invalid value(s)
            – Key 'a': value1: (1,2)
            – Key 'b': Array included invalid value(s)
              – [1] Object 
                – included invalid value(s)
                  – Key 'b1a': value2: (1,2)
                  – Key 'b1b': value3: (1,2)
              – [3] Object 
                – value4: (1,2)
                – included invalid value(s)
                  – Key 'b2a': value5: (1,2)
            – Key 'c': value6: (1,2)`
      )
    })
  })

  describe(`with nested ands and ors`, () => {
    it(`renders the correct error message`, () => {
      const result = renderer(nestedAndOrs)
      expect(result).toEqualWithCompressedWhitespace(
        `Object
          – value1: (1,2)
          – included invalid value(s) value1: (1,2) and value2: (1,2) and (value3: (1,2) or value4: (1,2) or (value5: (1,2) and value6: (1,2)))`
      )
    })
  })
})