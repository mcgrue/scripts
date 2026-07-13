git config --global init.defaultBranch main

git config --global alias.unadd "reset HEAD"
git config --global alias.uncommit "reset --soft HEAD^"
git config --global alias.list-local-branches "for-each-ref --sort='-committerdate' --format='%(committerdate:short) %(refname:short)' refs/heads/"
git config --global alias.list-upstream-branches "for-each-ref --sort='-committerdate' --format='%(committerdate:short) %(refname:short)' refs/remotes/"
git config --global alias.recent "for-each-ref --sort=-committerdate refs/heads/ --format='%(refname:short) %(committerdate:relative)' --count=5"
git config --global alias.co checkout
git config --global alias.b 'branch -v'
git config --global alias.s status
git config --global alias.d 'branch -D'
git config --global alias.p 'pull --quiet --no-stat'
git config --global alias.nb 'nb = "!f() { DATE=$(date +%Y-%m-%d); NAME=$(git config user.name | tr -d \" \" | tr A-Z a-z); git checkout -b $NAME/$DATE/$1; }; f"'

alias branchtime='for k in $(git branch | perl -pe s/^..//); do echo -e $(git show --pretty=format:"%Cgreen%ci %Cblue%cr%Creset" $k -- | head -n 1)\\t$k; done | sort -r'
