foo = 1 ' in case you want to set a breakpoint
	
' context is set completely differently for mobile devices, vs desktop browsers
' I strongly recommend that you have ALL browsers closed before running this test
' Otherwise -browsers are often not unique, then Smart ID significantly slows replay

if datatable.value("device_ostype", dtGlobalSheet) <> "Browser" then
	Set oDevice=Device("Class Name:=Device","ostype:=" & datatable.value("device_ostype") ,"id:=" & datatable.value("device_id"))
	Set oApp=oDevice.App("Class Name:=App","identifier:=" & datatable.value("app_identifier") ,"instrumented:=True")		
	Set	LaunchEnvironment=oDevice
	'oApp.Launch Install, Restart ' first time to install
	oApp.Launch DoNotInstall, Restart ' other times to install 
	
	AIUtil.SetContext oDevice
	AIUtil("hamburger_menu").Click
else
	AIUtil.SetContext Browser("Advantage Shopping")
	Browser("Advantage Shopping").Navigate "http://advantageonlineshopping.com"
	Browser("Advantage Shopping").Sync
End If

'Browser("Advantage Shopping").Highlight
AIUtil("profile").Highlight
AIUtil("profile").Click
AIUtil("input", "USER NAME").Highlight
AIUtil("input", "USER NAME").Type "Mercury"
AIUtil("input", "PASSWORD").Type "Mercury"
AIUtil("button", "LOGIN").Click
'
' some mobile devices, sometimes have a prompt to allow access
if AIUtil.FindTextBlock("NO").Exist (5) then
	AIUtil.FindTextBlock("NO").Click
	
End If


' Logout is a case where the GUI interface looks completely different
Select case datatable.value("device_ostype")
Case "iOS", "ANDROID"
	AIUtil("hamburger_menu").Click
	' add your script here
        
	
	oDevice.CloseViewer
Case "Browser"
	' add your script here 
end Select



