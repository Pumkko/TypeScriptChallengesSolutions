/*
  898 - Includes
  -------
  by null (@kynefuk) #easy #array

  ### Question

  Implement the JavaScript `Array.includes` function in the type system. A type takes the two arguments. The output should be a boolean `true` or `false`.

  For example:

  ```ts
  type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`
  ```

  > View on GitHub: https://tsch.js.org/898
*/

/* _____________ Your Code Here _____________ */

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

// Failed to do that one, i was not expecting a solution which requires me to use their lib,
// So when i ended up needing something like Equal i stopped looking believing i was far off

type Includes2<T extends readonly unknown[], U> =
T extends [infer First, ...infer Tail] ?
  Equal<First, U> extends true ? true : Includes<Tail, U> : false

type Test<T extends readonly unknown[]> = {
  [Key in keyof T]: T[Key]
}

type IncludesWithRecord<T extends readonly unknown[], U> = {
  [Key in keyof T]: Equal<T[Key], U>
} extends Record<number, false> ? false : true

// Okay so that one is actually clever, and maybe easier to understand if we cut in two
// AllEqualResults will
// return false if all Equal have returned false
// but if some (or all) equals have returned true then the result will either be : boolean (some Equal have returned true, others have returned false) or true (because they're all true)
type AllEqualResults<T extends readonly unknown[], U> =
{ [Key in keyof T]: Equal<T[Key], U> }[number]

type T = AllEqualResults<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'dddWamuudddddddd'>
// Now to know we just have to check, Did it return false if it did then no includes, if true or boolean then one or more includes
type Includes<T extends readonly unknown[], U> = AllEqualResults<T, U> extends false ? false : true

type cases = [
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Wamuu', 'Santana'], 'Wamuu'>, true>>,
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>, false>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<[{}], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<Includes<[{ a: 'A' }], { readonly a: 'A' }>, false>>,
  Expect<Equal<Includes<[{ readonly a: 'A' }], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[1], 1 | 2>, false>>,
  Expect<Equal<Includes<[1 | 2], 1>, false>>,
  Expect<Equal<Includes<[null], undefined>, false>>,
  Expect<Equal<Includes<[undefined], null>, false>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/898/answer
  > View solutions: https://tsch.js.org/898/solutions
  > More Challenges: https://tsch.js.org
*/
