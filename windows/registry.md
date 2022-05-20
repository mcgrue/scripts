# Registry Settings I Always Want To Change

## gpedit.msc

* Computer Configuration > Administrative Templates > Windows Components > Search 
  - "Don’t search the web or display web results in Search" -> Enabled
* Computer\HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced    
  - Edit or create "DisallowShaking" as a  DWORD (32-bit) Value
  - value: 1
