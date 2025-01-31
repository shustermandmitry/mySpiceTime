Heres what im after

- DEAD BEAT SIMPLE
- and intuitive, so even dead beat stoners can do it while still sucking that hookah

------------

- this thing will be pointed at a template scaffold structure, and be told to replicate it
  somewhere else, like the folder where its invoked, or whatever given as an option
- it will depend on two other cli utils, aggregator and patcher
- it will use patcher to install a patch of structure into the folder its pointed to
- it will use aggregator to create the patch
- aggregator is run from template root and given a fast-globe pattern to match all the files of interest in all the
  folders of interest
  and it will aggregate them into a syntactically correct patch, to be installed relative to any folder
- how does it know what folders are relevant?
  thats in the sta-package.config.js file
- sta-package.config.js spits out a meta representationof structure of the package
  this structure has all the info necessary to clone new packages from the template
  the funny part, that it has a template structure around it, and that might seem redundant and weird, but
  it saves placing all the ducks in one file.
  theres an option of splitting info on the structure between this config file, and the template structure itself
  normally, sizable scripts will be put into surrounding structure, but small index files might be placed in config as
  content meta prop
  if content is present in config file and template file is specified in path prop, and it exists, its content
  concatenated
  to the bottom of content prop, thus a title or description can be effected in config file, and itll maych the file,
  and lessen the confusion
  example

````js
{
    //...
    structure:{
        //this is the file we are in
        //but it has to be specifioed, to be cloned into packages to be created bu this template
        "sta-package.config.js"
    :
        "sta-package.config.js",
            "package.json"
    :
        "package.json",//resolved from template root
            'tsconfig.js'
    :
        {
            content:'//ts config file'
            description:'typesdript config file. inherits from parent domain'
            path:'tsconfig.js'
        }
    ,
        //'src' becomes  an alias '@src':'./src' in config 
        //alternatively, list of children if folder can be an arraythat syntax is used when no aliasing is needed, with folders as objects
        //
        'src'
    :
        {
            description:'thats where source files are'
            'index.ts'
        :
            'src/index.ts'

        }
    }
}
````