lets get names straight

* st-error - name of folder of st-error-util package
* all errors are descendants of STError class

now, for package json of utils package
theres no main or any entrance point

```json
{
  "name": "@sta/utils",
  "version": "0.0.0",
  "private": "true",
  "info": {
    "domains": {
      "fs": {
        "parent": "sta"
      },
      "sta-cli": {
        "parent": "",
        //its root of sta-cli hierarchy
        "isRoot": "true"
        //redundant, but another way to express root of domain hierarchy
      },
      "utils": {
        "isRoot": "true"
      }
    }
  }
}
```

let me explain

* each package has info object in package.json
  i dont know exact shape of it yet, but this is ir so far
* each package can be part of multiple hierarchial domains
  not all of them alligned with folder structure, but one is for sure, its fs domain
* we will develop domain-builder util later where i present the spec
* but as a teaser,

1. @ designates a keyword,
2. @sta is root of sta repo
3. presence of a fixed parent folder means package location is fixed as a child of that folder
4. another possibility is parent:"@package"
   that means its fixed as a child of any package
5. parent:"@package --of --"
