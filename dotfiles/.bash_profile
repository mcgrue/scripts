export EDITOR="vim"

#######
## 
## find in files.  courtesy Nick Bartos
##

fif ()
{
    DIR="$1"
    FTYPES="$2"
    EXPRESSION="$3"

    if [ -z "$DIR" -o -z "$FTYPES" -o -z "$EXPRESSION" ]
    then
        echo "Usage: $0 directory filetype[,...] expression"
        return 1
    fi

    FIND_ARGS=
    for FTYPE in $(echo "$FTYPES" | sed -e 's|,| |g')
    do
        if [ -z "$FIND_ARGS" ]
        then
            FIND_ARGS="-iname *.$FTYPE"
        else
            FIND_ARGS="$FIND_ARGS -o -iname *.$FTYPE"
        fi
    done

    # Disable filename expansion (globbing), so *.filetype gets passed directly
    # to find.
    set -f
        find "$DIR" '(' $FIND_ARGS ')' -exec grep --color -i -H -n -e "$EXPRESSION" '{}' '+'
}

##
## end find in files
##
#########


########
##
## Start magical show-git-branch-in-path
## courtesy Chris MacGown @0x44

bold=$( tput bold)
reset=$(tput sgr0)
black_text=$( tput setaf 0)
red_text=$(   tput setaf 1)
green_text=$( tput setaf 2)
yellow_text=$(tput setaf 3)
blue_text=$(  tput setaf 4)
purple_text=$(tput setaf 5)
cyan_text=$(  tput setaf 6)
white_text=$( tput setaf 7)

function git_rev_head
{
    local rev_prompt_token=" » " rev=1 sym=0 colors=() branches=()

    branches[$rev]=$(git name-rev --name-only HEAD 2> /dev/null)
    branches[$sym]=$(git symbolic-ref -q HEAD 2> /dev/null)
    branches[$sym]=${branches[$sym]##refs/heads/}

    if [[ ${#branches} -gt 0 ]]; then
        for branch in $sym $rev; do
            case "${branches[$branch]}" in
                production*|master*) 
                         colors[$branch]=${bold}${red_text} ;;
                merge_*) colors[$branch]=${cyan_text} ;;
                *)       colors[$branch]=${green_text}
            esac
        done

        sym_prompt="${colors[$sym]}${branches[$sym]}${reset}"
        rev_prompt="${colors[$rev]}${branches[$rev]}${reset}${rev_prompt_token}"
        
        if [ "${branches[$sym]}" = "${branches[$rev]}" ]; then rev_prompt=""; fi
        git_output="(${rev_prompt}${sym_prompt})"
    fi
}

function set_prompt
{
    local prompt_char="$"
    local separator=" "

    if [[ $uid -eq 0 ]]; then
        prompt_char="#"
    fi

    while [[ $# -gt 0 ]]; do
        token=$1; shift

        case "$token" in
            --trace) 
                export ps4='+[$bash_source] : ${lineno} : ${funcname[0]}:+${funcname[0]}() $ }'
                set -o xtrace
                ;;
            --prompt)
                prompt_char=$1
                ;;
            --separator)
                separator=$1
                ;;
        esac
    done

    export PS1="\u@\h:$blue_text\]\$PWD$reset\] ${separator}\$git_output\n${prompt_char} "
}

PROMPT_COMMAND="git_rev_head; $PROMPT_COMMAND";
set_prompt --prompt ∵


##
## end git branch thing.
##
#####################
