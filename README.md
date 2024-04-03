<div align="center">

<img title="promise-with-events" alt="promise-with-events" src="https://github.com/martinsbicudo/promise-with-events/blob/3b63ede978993a09919e6b2744e60c565283b9b4/public/logo.png" width="500px">

<br>
<br>

![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/martinsbicudo/promise-with-events/pr_build_check.yml)
![minified size](https://img.shields.io/bundlephobia/min/promise-with-events)
![npm](https://img.shields.io/npm/v/promise-with-events)

<p>Simple lib to use <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise" target="_blank">promises</a> with <strong>events</strong></p>
</div>

<br>

# Compatibility

[check here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#browser_compatibility)

# Bundle Analyzer

- [main](https://htmlpreview.github.io/?https://github.com/martinsbicudo/promise-with-events/blob/main/parcel-bundle-reports/main.html)
- [types](https://htmlpreview.github.io/?https://github.com/martinsbicudo/promise-with-events/blob/main/parcel-bundle-reports/types.html)

# Quick Menu

- [how to use](#how-to-use)
- [documentation](#documentation)
- [how to contribute](#how-to-contribute)
- [license](#license)

# How to use

### Install

```shell
npm i promise-with-events

#or

yarn add promise-with-events

#or

pnpm add promise-with-events
```

### Simple example

```ts
import { createWatchEvent, onResolveEvents } from "promise-with-events";

const promiseExample1 = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000, "example1");
  });
};

createWatchEvent(promiseExample1, {
  eventName: "key1",
  autoStart: true,
});

onResolveEvents(
  (error, resolve1) => {
    console.log(resolve1); //output = "example1"
  },
  ["key1"]
);
```

# Documentation

- [watch events](#watch-events)
  - [single promise](#single-promise)
  - [multi promises](#multi-promises)
  - [multi events](#multi-events)
  - [auto start](#auto-start)
  - [promise method](#promise-method)
- [start events](#start-events)
- [events](#events)
  - [onStartEvents](#onstartevents)
  - [onResolveEvents](#onresolveevents)
  - [onRejectEvents](#onrejectevents)
  - [onFinallyEvents](#onfinallyevents)
- [advanced]
  - [reuse watched events](#reuse-watched-events)

## Watch Events

`createWatchEvent` receive 2 params:

1. `promises`: (() => promises)[]
2. `key`: that is the event name `OR` `config`:

```ts
type TConfig = {
  eventName: string;
  autoStart?: boolean;
  promiseMethod?: "all" | "allSettled" | "any" | "race";
};
```

<details><summary><strong>Quick Examples</strong></summary>

```ts
...
createWatchEvent(promise1, "key1")
```

```ts
...
createWatchEvent(promise1, {
  eventName: "key1",
  autoStart: true,
  promiseMethod: 'race',
})
```

```ts
...
createWatchEvent([promise1, promise2], "key2")
```

```ts
...
createWatchEvent([promise1, promise2], {
  eventName: "key2",
  autoStart: true,
  promiseMethod: 'race',
})
```

</details>

### Single Promise

<details><summary><strong>Example</strong></summary>

```ts
import {
  createWatchEvent,
  startEvents,
  onResolveEvents,
} from "promise-with-events";

const promiseExample1 = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000, "example1");
  });
};

createWatchEvent(promiseExample1, "key1");

startEvents(["key1"]);

onResolveEvents(
  (error, resolve1) => {
    console.log(resolve1); //output = "example1"
  },
  ["key1"]
);
```

</details>

### Multi Promises

<details><summary><strong>Example</strong></summary>

```ts
import {
  createWatchEvent,
  startEvents,
  onResolveEvents,
} from "promise-with-events";

const promiseExample1 = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000, "example1");
  });
};

const promiseExample2 = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000, "example2");
  });
};

createWatchEvent([promiseExample1, promiseExample2], "key1");

startEvents(["key1"]);

onResolveEvents(
  (error, resolve1) => {
    console.log(resolve1); //output = ["example1", "example2"]
  },
  ["key1"]
);
```

</details>

### Multi Events

<details><summary><strong>Example</strong></summary>

```ts
import {
  createWatchEvent,
  startEvents,
  onResolveEvents,
} from "promise-with-events";

const promiseExample1 = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000, "example1");
  });
};

const promiseExample2 = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000, "example2");
  });
};

const promiseExample3 = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000, "example3");
  });
};

const promiseExample4 = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000, "example4");
  });
};

createWatchEvent([promiseExample1, promiseExample2], "key1");

createWatchEvent([promiseExample3, promiseExample4], "key2");

startEvents(["key1", "key2"]);

onResolveEvents(
  (error, resolve1, resolve2) => {
    console.log(resolve1); //output = ["example1", "example2"]
    console.log(resolve2); //output = ["example3", "example4"]
  },
  ["key1", "key2"]
);
```

</details>

### Auto Start

**Note**: `startEvents` doesn't works with `autoStart` active
**Possible values**: `true` | `false` (**default value** = `true`)

<details><summary><strong>Example</strong></summary>

```ts
import { createWatchEvent, onResolveEvents } from "promise-with-events";

const promiseExample1 = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000, "example1");
  });
};

const promiseExample2 = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000, "example2");
  });
};

createWatchEvent([promiseExample1, promiseExample2], {
  eventName: "key1",
  autoStart: true,
});

onResolveEvents(
  (error, resolve1) => {
    console.log(resolve1); //output = ["example1", "example2"]
  },
  ["key1"]
);
```

</details>

### Promise Method

**Note**: `promiseMethod` doesn't works with `single promise`
**Possible values**: `all` | `allSettled` | `any` | `race` (**default value** = `all`)

<details><summary><strong>Example</strong></summary>

```ts
import { createWatchEvent, onResolveEvents } from "promise-with-events";

const promiseExample1 = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000, "example1");
  });
};

const promiseExample2 = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000, "example2");
  });
};

createWatchEvent([promiseExample1, promiseExample2], {
  eventName: "key1",
  autoStart: true,
  promiseMethod: "any",
});

onResolveEvents(
  (error, resolve1) => {
    console.log(resolve1); //output = "example1"
  },
  ["key1"]
);
```

</details>

## Start Events

**Note**: Doesn't works with `autoStart: true`

<details><summary><strong>Example</strong></summary>

```ts
import { startEvents } from "promise-with-events";

startEvents(["key1"]);

startEvents(["key1", "key2"]);
```

</details>

## Events

All `events` receive 2 params:

1. `callback`: returns error, ...responses `(response for each key)`
2. `keys`: string[]

**Note**: `error` on callback its about code errors

### onStartEvents

Calls `callback` param when all promises are resolved

**Note**: Doesn't works with `autoStart: true`

<details><summary><strong>Quick Examples</strong></summary>

```ts
...
onStartEvents((error) => {
  console.log('ok')
}, ["key1"])
```

```ts
...
onStartEvents((error) => {
  console.log('ok')
}, ["key1", "key2"])
```

</details>

### onResolveEvents

Calls `callback` param when all promises are resolved

<details><summary><strong>Quick Examples</strong></summary>

```ts
...
onResolveEvents((error, resolve1) => {
  console.log(resolve1)
}, ["key1"])
```

```ts
...
onResolveEvents((error, resolve1, resolve2) => {
  console.log(resolve1)
  console.log(resolve2)
}, ["key1", "key2"])
```

</details>

### onRejectEvents

Calls `callback` param when all promises are rejected

<details><summary><strong>Quick Examples</strong></summary>

```ts
...
onRejectEvents((error, reject1) => {
  console.log(reject1)
}, ["key1"])
```

```ts
...
onResolveEvents((error, reject1, reject2) => {
  console.log(reject1)
  console.log(reject2)
}, ["key1", "key2"])
```

</details>

### onFinallyEvents

Calls `callback` param when all promises are finished

<details><summary><strong>Quick Examples</strong></summary>

```ts
...
onFinallyEvents((error, finally1) => {
  console.log(finally1.response) //could be undefined, according promise result
  console.log(finally1.error) //could be undefined, according promise result
}, ["key1"])
```

```ts
...
onFinallyEvents((error, finally1, finally2) => {
  console.log(finally1.response)
  console.log(finally1.error)
  console.log(finally2.response)
  console.log(finally2.rerror)
}, ["key1", "key2"])
```

</details>

## Advanced

### Reuse Watched Events

<details><summary><strong>Example</strong></summary>

```ts
import { createWatchEvent, onResolveEvents } from "promise-with-events";

const promiseExample1 = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000, "example1");
  });
};

const promiseExample2 = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000, "example2");
  });
};

const promiseExample3 = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000, "example3");
  });
};

const watchedPromise1 = createWatchEvent([promiseExample1, promiseExample2], {
  eventName: "key1",
  autoStart: true,
  promiseMethod: "any",
});

const watchedPromise2 = createWatchEvent([watchedPromise1, promiseExample3], {
  eventName: "key2",
  autoStart: true,
});

createWatchEvent([watchedPromise1, watchedPromise2], {
  eventName: "key3",
  autoStart: true,
  promiseMethod: "all",
});

onResolveEvents(
  (error, resolve1) => {
    console.log(resolve1); //output = "example1"
  },
  ["key1"]
);

onResolveEvents(
  (error, resolve2) => {
    console.log(resolve2); //output = ["example1", "example3"]
  },
  ["key2"]
);

onResolveEvents(
  (error, resolve3) => {
    console.log(resolve3); //output = ["example1", ["example1", "example3"]]
  },
  ["key3"]
);
```

</details>

# How to contribute

To contribute, make sure to follow the steps bellow:

1. Create a new branch:

   ```shell
    git checkout -b feat/your-new-feature
   ```

2. Make your changes, add unit tests (with `jest`) and test with `npm link`

   On promise-with-events project:

   ```shell
    npm link
   ```

   On your app/project:

   ```shell
    npm link promise-with-events
   ```

   This will create a symlink into your `node_modules` app, and you can test iteratively. You can check more about npm-link [here](https://docs.npmjs.com/cli/v9/commands/npm-link)

3. Before to push your changes to origin, open your pull request and fill all required fields.
   1. Make sure to fill the **Release** section with what your pull request changes. **This section is required to merge pull request.**
4. Set a _required_ `semver` label according to your change:
   1. `semver:patch`: used when you submit a fix to a bug, enhance performance, etc;
   2. `semver:minor`: used when you submit a new component, new feature, etc;
   3. `semver:major`: used when you submit some breaking change, etc;
   4. `semver:prerelease`: used when you submit a prerelease (ex: `1.0.0-beta.1`);
   5. `semver:bypass`: used to update docs, or something that doesn’t affect the build.

> Info: Once you have merged your pull request, with all required fields, GitHub Actions will be responsible to create a new build and publish.

# License

MIT License
