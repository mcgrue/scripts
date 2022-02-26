killport() {
    if [ $# -eq 0 ]
    then
        echo "Missing port argument"
        return
    fi;

    output=$(lsof -t -i :$1)

    echo "found the following processes on port $1 : $output"

    for i in $output
    do
        echo "attempting to kill $i"
        kill $i
    done

    echo "done murdering ports"
}
