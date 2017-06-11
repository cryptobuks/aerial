[![Build Status](https://secure.travis-ci.org/crcn/aerial.png)](https://secure.travis-ci.org/crcn/aerial) [![Coverage Status](https://coveralls.io/repos/crcn/aerial/badge.svg)](https://coveralls.io/r/crcn/aerial) [![Join the chat at https://gitter.im/crcn/aerial](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/crcn/aerial?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Aerial provides a virtual environment for testing, debugging, and developing _all_ web applications (JavaScript, React, PHP, CSS). 

#### Motivation

Aerial was originally created for [Tandem](http://tandemcode.com) to aid in the realtime development of web applications. With Tandem, users can write code, and immediately see visual elements appear in an editable interface. Users also have the ability to use Sketch-like UI tools for editing visual elements that produces code in any language that supports source maps (HTML, CSS, SASS, SCSS, React). All of this is powered by Aerial. 

![ezgif-2-7c518ea713](https://user-images.githubusercontent.com/757408/26987589-215d52ca-4d1a-11e7-828e-6db361086a83.gif)


The library takes inspiration from many ideas, more notabily Bret Victor's presentation on [the future of programming](https://vimeo.com/36579366). Aerial is an attempt to provide
the APIs necessary for creating realtime visual programming environments (like Sketch + coding). 

#### How does Aerial work?

Aerial runs your application code in a sandboxed environment that emulates native JavaScript APIs -- currently just browser APIs (DOM, navigator, history). All native APIs can be inspected so you can test how your application is interacting with them. You can also define environment parameters such as browser type, network information (offline, throttled), and even the rendering engine. 

The browser VM supports _native_ rendering, meaning that the HTML & CSS that your application produces can be rendered out to the actual DOM. Native DOM APIs such as `element.getBoundingClientRect`, and `window.getComputedStyle(element)` work the same. The rendering engine is interchangable, and will eventually support _remote_ browsers so that you can run your application code in one local environment (Node for instance), and have its HTML & CSS rendered out to as many native browsers as you want via [Browsertap](browsertap.com). 

Many of the emulated APIs are enhanced. The DOM & CSSOM for instance both support diffing & patching (just like React). This means that as your application produces new HTML & CSS, only that parts that have changed get updated in the synthetic DOM / CSSOM objects. This hot-swapping was originally introduced to you to visually edit your application, regardless of the technical stack that you use (Ruby, Java, PHP, Angular, anything that produces HTML & CSS).

Aerial can also defer application execution to remote processes using the `RemoteBrowser` object, paired with the diffing & patching algorithms. This enables you to offload some of the heavy work - possibly to a NodeJS thread, or even remotely (AWS, lamda), to allow for a smooth user experience if you're building a visual editor. 

#### Who is Aerial for?

This library was designed for developers that want to create tooling for catching visual bugs in web applications. Here are some examples of what you can do with Aeiral:

- Programatically test for visual CSS issues in unit tests. In the future, you will be able to target any browser you want for this via [Browsertap](http://browsertap.com).
- Visually QA test every state of your application. Ability to manipulate file resources and see how those changes manifest across all visual states.
- Hook Aerial up to a code editor & build applications visually in realtime (basically Tandem).

#### App examples

- [Tandem](http://tandemcode.com) - visually create web applications. 

#### Code example

```typescript
import { SyntheticBrowser, DOMRenderer } from 'aerial';
const renderer = new DOMRenderer(); 

document.body.appendChild(renderer.element);
const browser = new SyntheticBrowser(renderer);
await browser.window.open('http://google.com');

// TODO - edit DOM
```