import{c as r}from"./overlay.js";import"./index.js";browser.runtime.onMessage.addListener(e=>{e.action==="showOverlay"&&r("This is a Svelte component overlay!")});
