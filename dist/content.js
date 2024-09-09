import{c as o}from"./overlay.js";import"./index.js";browser.runtime.onMessage.addListener(e=>{console.log("message received",e),e.action==="showOverlay"&&o("This is a Svelte component overlay!")});
