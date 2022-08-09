import { Match } from './types'
import { extractMatch } from './helper'
import { cloneDeep, get, isFunction } from 'lodash'

type Method = 'push' | 'unshift'

type Options<T> = {
	match?: Match<T>
	method?: Method
	clone?: boolean
}

function deepMerge<T = any>(
	arr1: T[],
	arr2: T[],
	options?: Match<T> | Options<T>,
	method?: Method
): T[] {
	const match = extractMatch<T>(options)
	const clone: boolean = get(options, 'clone', true)
	const mMethod: Method = get(options, 'method', method || 'push')

	return arr2.reduce(
		(items, arr2Item) => {
			const index = items.findIndex((item) => {
				if (isFunction(match)) return match(item, arr2Item)
				return get(item, match) === get(arr2Item, match)
			})

			index === -1
				? items[mMethod](arr2Item)
				: items.splice(index, 1, arr2Item)

			return items
		},
		clone ? cloneDeep(arr1) : arr1
	)
}

export { deepMerge }
