## Mapping tree structure, let alone graph, to 3d spaces is not trivial

* and trees are not easily mapped onto dimentional spaces,
* for
  they grow exponentially with size, and spaces do not,
* so trees have to be pruned in degrees of freedom to fit
  in that tight suite.

So, all my beuatiful

## structure of spicetime universe, is still VALID

* However, semver is not the vehicle to do the victory lap in.
* Semver is for npm.

we will let it be and we will use it exactly like its designed for, honoring their intent.

* However, like evryone else sensible, we will be locked solid to specific versions of every package we use

The traditional pain point here is migrations to new versions.
Given the size of spicetime to be, its not a concern, but a

* fatal bottleneck,
  if not planned for and implemented in time,
  before folks jump the ship

## WE WILL NOT GO DONN AS ANY FRAMEWORK BEFORE

For

* we are building a universe, not a framework
* Universes dont go down, if built right

## Projecting the explosive growth,

once the seed is complete and planted, the solution has to be part of the seed, and a major part of it

## whats the problem

Migration to a new version of third party, or even internal package, that is widely used thru spicetime ecosystem

- solution must be systemic - Being of distributed nature, with high value of privacy and agency for each node, solution
  must be systemic, accepted at getgo, as part of structure and, most of all, culture
- For, only cultural restraints will keep it from being bred out of future lineages

## Heres first try at solution

- spm is a distributed component,it is part of core at each node that runs spicetime-react-app
- it actively solicits, monitors and does all it can to discover new versions of every package used by local jsx string
- it also monitors for third party tools sliding to new versions of their deps, without publishing new versions, silent
  drift

for this is not entirely innocent., and a coause of rare, but potentially intractable bugs

- for silent drift cases,
    1. builds test environment in docker container
    2. automatically, in the background, reruns all tests of internally used packages that declare the drifter as a dep,
    3. reports problems to higher scope, thru messaging system,or react error bounds

- for new version releases
    1. builds dev environment in docker container
    2. installs new versions of packages, but does one package at a time,
    3. it cycles thru the process, one potential update each cycle
    4. runs all the tests in any packages affected by change
    5. testing only dependant packages is a priority, but perhaps all packages need to be tested in background on low
       priority schedule, for checking the drift
    6. again, all problems are reported upscope

## Additional specs for SPM

- managers package releases and their versioning as described before in previous depricated ticks
- idea of virtual packages is still valid
- as a child package updates to higher major version, all parent packages will announce release of new major version
- same for minor and patch version - parents update, virtually, to higher patch or minor number, but not necessarily
  same as the updating child
- each package versioning is independant, but driven by children, as well as its own releases
- inside each package, there is a record of all versions, and what children versions each containes
- well, not necesarily ina file in a repo, but somewhere in the graph db, along with indexes of all files for each
  version of all the children and itself, and actual code in gh as commits and branches
- according to org policies, and possibly backed in mongo db
- smp is a distrubeted gql service - it takes queries for packages to be sent out, just like npm does
  but it does not dispence small change of individual local packages. They are broken outside of their local STA cage.
- it responds to requests for stand alone packages only, within its domain, which includes its local STA, which includes
  STReactApp inside as a child
- all child packages inside are local and allowed to declare only downscope/children packages as internal deps
- virtual package existence and virtual versioning is still a valid concept as before, and still is hauntingly similar
  to phase rotation or virtual particle fuzziness in qm
- but, highest visibility to major releases, and minor and mineerer to minor and patch releases
- theres nothing that is not breaking change, wether it is or it is not, no one can guarantee, not even AI or some high
  commetee. That concept is profoundly rejected by us
- but there degrees of confidance, and it will be reflected by a score, and visibility will be adjusted accordingly
- its more like resolution, then visibility, with a notion of perspective.
  from a distant perspective, only highly visible/scoring versions are visible, as one gets closer, the fuzziness comes
  into focus

## AND THATS UNIVERSAL PATTERN in spicetime, a pattern of treating any score assign to a node or a link





