### Vite setup:

- add mode==='content' flag to get imports inside content.js file to work properly, needed to use inlineDynamicImports flag in output section to stop vite from chunking out the file and thus adding in import statements

- run both build steps at once with run statement: `vite build && vite build --mode content` 
- assetFileNames is necessary in content build to give static name to content's css file so it can be referenced in overlay/index.ts

### manifest.json

- pretty self explanatory?

### overlay/index.ts

- must add in link section with link to content/index.css from the dist folder to get tailwind styles to work in content.js