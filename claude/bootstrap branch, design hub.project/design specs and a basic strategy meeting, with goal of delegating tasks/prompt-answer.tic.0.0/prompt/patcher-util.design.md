This is the utility that is a functional mirror to aggregator-util
Or rather its executive power

- aggregator creates a patch
- patcher installs it in a different folder
- and thats all it does
- both utils follow the same patch syntax, whatever generally accepted
- they both resolve the same way based on fast-globe patterns and resolving relative paths
  from sta root, uptree, if no --root option is given
- --root -package means root off the nearest package.json
  --root relativePath will be resolved fro sta root
  --root -package ./src/** means root at packageRoot/src and extend deep structure
  --root ./packages/utils/patcher means replace itself entirely, do not extend
- it will create its own custom errorin a file patcher-error.tx