# ANSI Truncate

A tiny function for truncating a string that may contain ANSI escape sequences.

## Install

```sh
npm install ansi-truncate
```

## Usage

```ts
import colors from 'tiny-colors';
import truncate from 'ansi-truncate';

// Let's truncate a string to a visual width of 2

truncate ( colors.red ( 'foo' ), 2 ); // => Same as: colors.red ( 'f…' );
```

## License

MIT © Fabio Spampinato
