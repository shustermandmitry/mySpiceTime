

first sta-error
it exposes STAError constructor that takes message as prop
it generates error object of shape

```js
{
    message:string
    info:{
        errorType:'STAError'
        extInfo:string | Error
        pathFromPackageRoot:string -resolved from pnmp run getPackageRoot
        packageDomain:string
        packageName:string
        pathFromSTARoot:string - resolved from pnpm run getSTARoot
    }
}
```

STAError class has a static func - createCustomErrorType
it takes errorType:string and extention object that extends info on generated error
both info and STAError are done by Object.create

For future 