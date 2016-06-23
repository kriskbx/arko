# arko

> Super simple and ultra lightweight vanilla JS library that detects embeds like iframe/embed or object tags and makes them responsive.

## Usage

1. Include the CSS file in your build-script
2. Install and use arko:

```
npm install arko
```

```
var options = {};

var arko = require('arko');
new arko(options);
```

## Available Options

```
{
    selectors: [
        'embed',
        'object',
        'iframe'
    ],
    classNames: {
        active: 'is-responsive',
        container: 'embed-container'
    }
}
```

## License

MIT