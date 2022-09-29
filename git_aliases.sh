
git config --global alias.unadd "reset HEAD"
git config --global alias.uncommit "reset --soft HEAD^"

alias branchtime='for k in $(git branch | perl -pe s/^..//); do echo -e $(git show --pretty=format:"%Cgreen%ci %Cblue%cr%Creset" $k -- | head -n 1)\\t$k; done | sort -r'
