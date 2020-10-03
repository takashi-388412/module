@echo off

set CDS=%~dp0
set /a SIZE=256
set /a N=-1
set /a NS=0
set /a NE=0

:loop
set /a N+=1
call set STR=%%CDS:~%N%,1%%
if "%STR%"=="\" (
  set /a NS=NE
  set /a NE=N
)
if %N%==%SIZE% goto break
goto loop
:break

set /a NS=NS+1
set /a NE=NE-NS
call set CDN=%%CDS:~%NS%,%NE%%%

cd /d %~dp0


set path=%PATH%;C:\node; && set NODE_PATH=C:\node\node_modules

npx gulp --file %CDN%

echo;
echo Press any key to exit.
pause > NUL
