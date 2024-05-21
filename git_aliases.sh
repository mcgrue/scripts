git config --global init.defaultBranch main

git config --global alias.unadd "reset HEAD"
git config --global alias.uncommit "reset --soft HEAD^"
git config --global alias.list-local-branches "for-each-ref --sort='-committerdate' --format='%(committerdate:short) %(refname:short)' refs/heads/"
git config --global alias.list-upstream-branches "for-each-ref --sort='-committerdate' --format='%(committerdate:short) %(refname:short)' refs/remotes/"


alias branchtime='for k in $(git branch | perl -pe s/^..//); do echo -e $(git show --pretty=format:"%Cgreen%ci %Cblue%cr%Creset" $k -- | head -n 1)\\t$k; done | sort -r'
