git config --global init.defaultBranch main

git config --global alias.unadd "reset HEAD"
git config --global alias.uncommit "reset --soft HEAD^"
git config --global alias.list-local-branches "for-each-ref --sort='-committerdate' --format='%(committerdate:short) %(refname:short)' refs/heads/"
git config --global alias.list-upstream-branches "for-each-ref --sort='-committerdate' --format='%(committerdate:short) %(refname:short)' refs/remotes/"
git config --global alias.recent "for-each-ref --sort=-committerdate refs/heads/ --format='%(refname:short) %(committerdate:relative)' --count=5"
alias co='git checkout'
alias b='git branch -v'
alias s='git status'
alias d='git branch -D'
alias p='git pull --quiet --no-stat'

alias branchtime='for k in $(git branch | perl -pe s/^..//); do echo -e $(git show --pretty=format:"%Cgreen%ci %Cblue%cr%Creset" $k -- | head -n 1)\\t$k; done | sort -r'
