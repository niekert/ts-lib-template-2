workflow "Build, Test, and Publish" {
  on = "push"
  resolves = ["Publish"]
}

action "Dep" {
  uses = "borales/actions-yarn@master"
  args = "install"
}

action "Test" {
  needs = "Dep"
  uses = "borales/actions-yarn@master"
  args = "test"
}

action "Build" {
  needs = "Test"
  uses = "borales/actions-yarn@master"
  args = "build"
}

action "Types" {
  needs = "Build"
  uses = "borales/actions-yarn@master"
  args = "build"
}
