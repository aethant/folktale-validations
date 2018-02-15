import { assoc } from 'ramda'
import PAYLOAD_FIELD_NAMES from '../const/payloadFieldNames'
import { composeFailure } from '../utils/validations'

const { UID } = PAYLOAD_FIELD_NAMES

export default (uid, validator) => o =>
  validator(o).orElse(composeFailure(assoc(UID, uid)))