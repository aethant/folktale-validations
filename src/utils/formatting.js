import {
  join,
  compose,
  map,
  append,
  reject,
  anyPass,
  repeat,
  over,
  lensIndex,
  toUpper,
  of,
  prepend,
  when,
  always,
  gt,
} from 'ramda'
import {
  isEmptyString,
  isEmptyArray,
  isUndefined,
  isNull,
  isNaN,
  isFunction,
} from 'ramda-adjunct'

// -----------------------------------------------------------------------------
// Internal
// -----------------------------------------------------------------------------

const NEWLINE = `\n`
const TAB = `\t`
const SINGLE_QUOTE = `'`
const SQUARE_BRACKET_OPENING = `[`
const SQUARE_BRACKET_CLOSING = `]`
const SOFT_BRACKET_OPENING = `(`
const SOFT_BRACKET_CLOSING = `)`

const NULL = 'null'
const UNDEFINED = 'undefined'
const NAN = 'NaN'
const FUNCTION = `function () {}`

const stringRepresentationIfNil = compose(
  when(isNull, always(NULL)),
  when(isUndefined, always(UNDEFINED)),
  when(isNaN, always(NAN))
)

const stringRepresentationIfFunction = when(
  isFunction,
  always(FUNCTION)
)

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export const joinDefined = withString =>
  compose(
    join(withString),
    reject(anyPass([isEmptyString, isEmptyArray, isUndefined]))
  )

export const joinWithComma = joinDefined(`, `)
export const joinWithAnd = joinDefined(` and `)
export const joinWithOr = joinDefined(` or `)
export const joinWithEmDash = joinDefined(` – `)
export const joinWithColon = joinDefined(`: `)
export const joinWithSpace = joinDefined(` `)
export const joinWithNoSpace = joinDefined(``)

export const wrapWith = (a, b = a) =>
  compose(
    joinWithNoSpace,
    prepend(a),
    append(b),
    of,
    stringRepresentationIfNil,
    stringRepresentationIfFunction
  )
export const wrapWithSingleQuotes = wrapWith(SINGLE_QUOTE)
export const wrapWithSquareBrackets = wrapWith(SQUARE_BRACKET_OPENING, SQUARE_BRACKET_CLOSING)
export const wrapWithSoftBrackets = wrapWith(SOFT_BRACKET_OPENING, SOFT_BRACKET_CLOSING)

export const quoteAndJoinWithComma = compose(
  joinWithComma,
  map(wrapWithSingleQuotes)
)
export const tabsForLevel = compose(joinWithNoSpace, repeat(TAB))

export const newlineAndTabsForLevel = level =>
  joinWithNoSpace([NEWLINE, tabsForLevel(level)])

export const toTitle = compose(joinWithNoSpace, over(lensIndex(0), toUpper))

export const pluralise = (value, count) =>
  gt(count, 1) ? joinWithNoSpace(value, `s`) : value