import { get, isFunction, isString } from 'lodash'
import { Match } from './types'

function extractMatch<T>(v?: Match<T> | (any & { match: Match<T> })): Match<T> {
	if (isString(v) || isFunction(v)) return v
	return v?.match || 'id'
}

function isSame<T>(el1: T, el2: T, match: Match<T>): boolean {
	return (
		(isString(match) && get(el1, match) === get(el2, match)) ||
		(isFunction(match) && match(el1, el2))
	)
}

export { isSame, extractMatch }
