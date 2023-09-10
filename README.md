# simple-express-ts-todo-api

initialize project with default options

```

npm init -y 

npm install --save-dev typescript

nano tsconfig.json

```

add to compiler configuration

```

{
  "compilerOptions": {
    "module": "commonjs",
    "esModuleInterop": true,
    "target": "es6",
    "moduleResolution": "node",
    "sourceMap": true,
    "outDir": "dist"
  },
  "lib": ["es2015"]
}

```

module: Specifies the module code generation method. Node uses commonjs.
target: Specifies the output language level.
moduleResolution: This helps the compiler figure out what an import refers to. The value node mimics the Node module resolution mechanism.
outDir: This is the location to output .js files after transpilation. In this tutorial you will save it as dist.


npm install --save express@latest
npm install -save-dev @types/express@latest

mkdir src

nano src/app.ts

npx src/app.ts

tsc

node dist/app.js