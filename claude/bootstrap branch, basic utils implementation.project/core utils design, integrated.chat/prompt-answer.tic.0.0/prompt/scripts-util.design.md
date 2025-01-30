this is where all scripts are
they primarily used in package.json files thruout the repo
well start with a humble beginning but eventually this will evolve into something similar to createReactApp,
only itll allow to dynamically maintain and mutate the spicetimeReactApp
the drive here is that each user will create his own spicetimeReactApp, running his own jsx string represention his
perspective

- its category in typedoc is utils/scripts
  then each script has its own subcat of its own name
- each script will be in a separate ts file, with its types and test and module file
- it will create its own custom error STAScriptsError in a file of same name - i dont have any extra info to add to
  defaults,
  but that might change
- heres the list of scripts it will have, for now

1. getSTARoot
   returns absolute path of STA repo root
   It searches up the tree for package.json files and looks for custom prop repoRoot:true
   it throws error when root of file system is reached
2. getPackageInfo
   searches up folder tree to find closest package.json and reads special prop packageInfo
   that object is defined thru sta-package-builder as will be described in the design doc
   base packageInfo is extended by each package
   its type is exported by packageBuilder.config.types.ts file
   base is

````js
{
    domain:string
    name:string
    description:string
}
````

getPackageInfo adds additional info in shape

````js
{
    pathFromStaRoot:string,
        version
:
    string
}
````

-sta-cli
thats cli that wraps all the scripts in that util into one comprehensive cli tool that allows to manage sta repo from
command line
ieach one of scripts exposes its cli, as a subdomain under some prop name like sta-cli --getSTARoot
So, simply, each script is a cli of its own, and sta-cli combines them all, each as an option with props
However, they all expose a api that can be used at run time

