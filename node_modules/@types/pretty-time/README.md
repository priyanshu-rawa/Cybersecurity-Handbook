# Installation
> `npm install --save @types/pretty-time`

# Summary
This package contains type definitions for pretty-time (https://github.com/jonschlinkert/pretty-time).

# Details
Files were exported from https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/pretty-time.
## [index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/pretty-time/index.d.ts)
````ts
type Increment =
    | "ns"
    | "nano"
    | "nanosecond"
    | "nanoseconds"
    | "μs"
    | "micro"
    | "microsecond"
    | "microseconds"
    | "ms"
    | "milli"
    | "millisecond"
    | "milliseconds"
    | "s"
    | "sec"
    | "second"
    | "seconds"
    | "m"
    | "min"
    | "minute"
    | "minutes"
    | "h"
    | "hr"
    | "hour"
    | "hours"
    | "d"
    | "day"
    | "days"
    | "w"
    | "wk"
    | "week"
    | "weeks";

declare function prettyTime(time: number | number[] | string[], smallest?: Increment | string, digits?: number): string;

export = prettyTime;

````

### Additional Details
 * Last updated: Tue, 07 Nov 2023 09:09:39 GMT
 * Dependencies: none

# Credits
These definitions were written by .
