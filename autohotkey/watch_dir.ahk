^p:: 

WinGet, activePath, ProcessPath, % "ahk_id" winActive("A")	; activePath is the output variable and can be named anything you like, ProcessPath is a fixed parameter, specifying the action of the winget command.

ExplorerGetPath() {
        if !(window := Explorer_GetWindow(hwnd))
                return ErrorLevel := "ERROR"
        if (window="desktop")
                return A_Desktop
        path := window.LocationURL
        path := RegExReplace(path, "ftp://.*@","ftp://")
        StringReplace, path, path, file:///
        StringReplace, path, path, /, \, All
        Loop
                If RegExMatch(path, "i)(?<=%)[\da-f]{1,2}", hex)
                        StringReplace, path, path, `%%hex%, % Chr("0x" . hex), All
                Else Break
        return path
}

Explorer_GetWindow(hwnd="")
{
    WinGet, process, processName, % "ahk_id" hwnd := hwnd? hwnd:WinExist("A")
    WinGetClass class, ahk_id %hwnd%
    
    if (process!="explorer.exe")
        return
    if (class ~= "(Cabinet|Explore)WClass")
    {
        for window in ComObjCreate("Shell.Application").Windows
            if (window.hwnd==hwnd)
                return window
    }
    else if (class ~= "Progman|WorkerW")
        return "desktop"
}

Sleep, 1
param := % ExplorerGetPath()
Sleep, 1

Run "watch_dir.bat" "%param%", "D:\dev\bin\autohotkey_scripts"

return
